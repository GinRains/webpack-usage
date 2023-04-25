const path = require('path')
const fs = require('fs')
const MagicString = require('magic-string')
const Module = require('./module')
const { hasOwnProperty, replaceIdentifier } = require('./utils')

class Bundle {
  constructor(options) {
    this.entryPath = path.resolve(options.entry.replace(/.js$/, '') + '.js')
    this.modules = new Set()
  }
  build(output) {
    const entryModule = this.fetchModule(this.entryPath)
    // console.log(entryModule)
    this.statements = entryModule.expandAllStatements()
    this.deConflict()
    // console.log(this.statements)
    const { code } = this.generate()
    fs.writeFileSync(output, code)
  }
  deConflict() {
    const defines = {} // 定义的变量
    const conflicts = {} // 变量名冲突的变量
    this.statements.forEach(statement => {
      Object.keys(statement._defines).forEach(name => {
        if (hasOwnProperty(defines, name)) {
          conflicts[name] = true
        } else {
          defines[name] = []
        }
        defines[name].push(statement._module)
      })
    })
    Object.keys(conflicts).forEach(name => {
      const modules = defines[name]
      modules.pop() // 最后一个不需要重命名
      modules.forEach((module, index) => {
        let replacement = `${name}$${modules.length - index}`
        module.rename(name, replacement)
      })
    })
  }
  generate() {
    let bundle = new MagicString.Bundle()
    this.statements.forEach(statement => {
      let replacements = {}
      // 获取依赖的变量和定义的变量
      Object.keys(statement._dependsOn)
        .concat(Object.keys(statement._defines))
        .forEach(name => {
          const canonicalName = statement._module.getCanonicalName(name)
          if(name !== canonicalName) {
            replacements[name] = canonicalName
          }
        })
      const source = statement._source.clone()
      if(statement.type === 'ExportNamedDeclaration') {
        source.remove(statement.start, statement.declaration.start)
      }
      replaceIdentifier(statement, source, replacements)
      bundle.addSource({
        content: source,
        separator: '\n'
      })
    })

    return { code: bundle.toString() }
  }
  fetchModule(importee, importer) {
    let route
    if(!importer) {
      route = importee
    } else {
      if(path.isAbsolute(importee)) {
        route = importee
      } else {
        route = path.resolve(path.dirname(importer), importee.replace(/.js$/, '') + '.js')
      }
    }
    if(route) {
      const code = fs.readFileSync(route, 'utf8')
      const module = new Module({
        code,
        path: route,
        bundle: this
      })

      this.modules.add(module)
      return module
    }
  }
}

module.exports = Bundle