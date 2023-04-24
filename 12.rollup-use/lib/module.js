const MagicString = require('magic-string')
const { parse } = require('acorn')
const analyse = require('./analyse')
const { hasOwnProperty } = require('./utils')

class Module {
  constructor({ code, path, bundle }) {
    this.code = new MagicString(code)
    this.path = path
    this.bundle = bundle
    this.definitions = {} // 存放本模块定义的顶级变量的定义语句
    this.ast = parse(code, {
      ecmaVersion: 8,
      sourceType: 'module'
    })
    this.imports = {} // 模块导入了哪些变量
    this.exports = {} // 模块导出了哪些变量
    this.modifications = {}
    analyse(this.ast, this.code, this) // 分析语法树
    // console.log(this.definitions, this.imports, this.exports)
  }
  expandAllStatements() {
    let allStatements = []
    this.ast.body.forEach(statement => {
      if(statement.type === 'ImportDeclaration') return
      if(statement.type === 'VariableDeclaration') return
      let statements = this.expandAllStatement(statement)
      allStatements.push(...statements)
    })

    return allStatements
  }
  expandAllStatement(statement) {
    statement._included = true
    let result = []
    // 找到此语句使用到的变量，把这些变量定义的语句取出来，放到result
    // var name = '张三'
    const _dependsOn = Object.keys(statement._dependsOn)
    _dependsOn.forEach(name => {
      let definitions = this.define(name)
      result.push(...definitions)
    })
    // console.log(name)
    result.push(statement)
    // 把此变量对应的修改语句包含进来
    // name+='jiagou' name+=3
    const defines = Object.keys(statement._defines)
    defines.forEach(name => {
      // 找到此变量的修改语句
      const modifications = hasOwnProperty(this.modifications, name) && this.modifications[name]
      if(modifications) {
        modifications.forEach(modification => {
          if(!modification._included) {
            let statements = this.expandAllStatement(modification)
            result.push(...statements)
          }
        })
      }
    })

    return result
  }
  define(name) {
    if(hasOwnProperty(this.imports, name)) {
      const { source, importName } = this.imports[name]
      const importModule = this.bundle.fetchModule(source, this.path)
      const { localName } = importModule.exports[importName]
      return importModule.define(localName)
    } else {
      // 如果非导入模块，是本地模块的话，获取此变量的变量定义语句
      let statement = this.definitions[name]
      if(statement && !statement._included) {
        return this.expandAllStatement(statement)
      } else {
        return []
      }
    }
  }
}

module.exports = Module