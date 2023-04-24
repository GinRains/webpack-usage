const path = require('path')
const fs = require('fs')
const MagicString = require('magic-string')
const Module = require('./module')

class Bundle {
  constructor(options) {
    this.entryPath = path.resolve(options.entry.replace(/.js$/, '') + '.js')
    this.modules = new Set()
  }
  build(output) {
    const entryModule = this.fetchModule(this.entryPath)
    // console.log(entryModule)
    this.statements = entryModule.expandAllStatements()
    // console.log(this.statements)
    const { code } = this.generate()
    fs.writeFileSync(output, code)
  }
  generate() {
    let bundle = new MagicString.Bundle()
    this.statements.forEach(statement => {
      const source = statement._source.clone()
      if(statement.type === 'ExportNamedDeclaration') {
        source.remove(statement.start, statement.declaration.start)
      }
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