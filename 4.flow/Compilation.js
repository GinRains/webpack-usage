const path = require('path')
const fs = require('fs')
const parser = require('@babel/parser')
const types = require('@babel/types')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const baseDir = normalizePath(process.cwd())

function normalizePath(path) {
  return path.replace(/\\/g, '/')
}
class Compilation {
  constructor(options, compiler) {
    this.options = options
    this.compiler = compiler
    this.modules = []
    this.chunks = []
    this.assets = {}
    this.files = []
    this.fileDependencies = new Set() // 依赖的文件
  }
  build(callback) {
    // 5, 根据配置中的entry找出入口文件
    let entry = {}
    if(typeof this.options.entry === 'string') {
      entry.main = this.options.entry
    } else {
      entry = this.options.entry
    }
    for(let entryName in entry) {
      let entryFilePath = path.posix.join(baseDir, entry[entryName])
      this.fileDependencies.add(entryFilePath)
      // 6. 从入口文件出发,调用所有配置的Loader对模块进行编译
      let entryModule = this.buildModule(entryName, entryFilePath)
      // this.modules.push(entryModule)
      // 8. 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk
      let chunk = {
        name: entryName,
        entryModule,
        modules: this.modules.filter(module => module.names.includes(entryName))
      }
      this.chunks.push(chunk)
    }
    // 9. 再把每个 Chunk 转换成一个单独的文件加入到输出列表
    this.chunks.forEach(chunk => {
      const filename = this.options.output.filename.replace('[name]', chunk.name)
      this.files.push(filename)
      this.assets[filename] = getSource(chunk)
    })
    // console.dir(this.modules, null, 2)
    // console.log(this.fileDependencies)

    callback(null, {
      modules: this.modules,
      chunks: this.chunks,
      assets: this.assets,
      files: this.files
    }, this.fileDependencies)
  }
  /**
   * 编译模块
   * @param {*} name 模块所属的代码块(chunk)名字
   * @param {*} modulePath 模块的绝对路径
   */
  buildModule(name, modulePath) {
    let sourceCode = fs.readFileSync(modulePath, 'utf8')
    let { rules } = this.options.module
    let loaders = []
    rules.forEach(rule => {
      if(modulePath.match(rule.test)) {
        loaders.push(...rule.use)
      }
    })
    sourceCode = loaders.reduceRight((sourceCode, loader) => {
      return require(loader)(sourceCode)
    }, sourceCode)

    // 7. 再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
    let moduleId = './' + path.posix.relative(baseDir, modulePath)
    // console.log(moduleId, modulePath)
    // name 是模块所属的代码块名称
    let module = { id: moduleId, dependencies: [], names: [name] }
    let ast = parser.parse(sourceCode, { sourceType: 'module' })
    traverse(ast, {
      CallExpression: ({ node }) => {
        if(node.callee.name === 'require') {
          let depModuleName = node.arguments[0].value
          let depModulePath
          if(depModuleName.startsWith('.')) {
            const currentDir = path.posix.dirname(modulePath)
            // 需要找当前模块所有在的目录下面的绝对路径
            depModulePath = path.posix.join(currentDir, depModuleName)
            // 添加后缀
            const extensions = this.options.resolve
            depModulePath = tryExtensions(depModulePath, extensions)
          } else {
            depModulePath = require.resolve(depModuleName)
          }
          this.fileDependencies.add(depModulePath)
          // 获取依赖的模块Id，修改语法树，把依赖模块名称换成模块ID
          let depModuleId = './' + path.posix.relative(baseDir, depModulePath)
          node.arguments = [types.stringLiteral(depModuleId)]
          // 把依赖的模块ID和模块路径放置到当前模块的依赖数组中
          module.dependencies.push({
            depModuleId,
            depModulePath
          })
        }
      }
    })
    // 使用改造后的ast语法重新生成源代码
    let { code } = generator(ast)
    module._source = code
    // console.log(module)
    module.dependencies.forEach(({depModuleId, depModulePath}) => {
      const existModule = this.modules.find(module => module.id === depModuleId)
      if(existModule) {
        existModule.names.push(name)
        return
      }
      let depModule = this.buildModule(name, depModulePath)
      this.modules.push(depModule)
    })
    return module
  }
}

function tryExtensions(modulePath, extensions) {
  if(fs.existsSync(modulePath)) {
    return modulePath
  }
  for(let i = 0; i < extensions.length; i++) {
    let filePath = modulePath + extensions[i]
    if(fs.existsSync(filePath)) {
      return filePath
    }
  }
  
  throw new Error(`not Found ${modulePath}`)
}

function getSource(chunk) {
  return `
  (() => {
    var webpackModules = {
      ${chunk.modules.map(module => `
        "${module.id}": module => {
          ${module._source}
        }
      `).join(',')}
    };
    var webpackModuleCache = {};
    function webpackRequire(moduleId) {
      var cachedModule = webpackModuleCache[moduleId];
      if (cachedModule !== undefined) {
        return cachedModule.exports;
      }
      var module = (webpackModuleCache[moduleId] = {
        exports: {},
      });
      webpackModules[moduleId](module, module.exports, webpackRequire);
      return module.exports;
    }
    var webpackExports = {};
    (() => {
      ${chunk.entryModule._source}
    })();
  })();
  `
}
module.exports = Compilation