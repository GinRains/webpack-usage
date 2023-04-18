const core = require("@babel/core")
const types = require("@babel/types")
const pathLib = require('path')

const babelPlugin = () => {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const { node } = path
        const { 
          libraryName,
          libraryDirectory
        } = state.opts
        
        // 如果此节点导入的包名和配置的按需加载包名一样，且不是默认导入
        if(libraryName === node.source.value && !types.isImportDefaultSpecifier(specifiers[0])) {
          const { specifiers } = node
          const importDeclaration = specifiers.map(specifier => {
            return types.importDeclaration([
              types.importDefaultSpecifier(types.identifier(specifier.local)) // node.local.value
            ], types.stringLiteral(libraryDirectory !== undefined ? `${libraryName}/${specifier.imported.name}` : `${libraryName}/lib/${specifier.imported.name}`))
          })
          path.replaceWithMultiple(importDeclaration)
        }
      }
    }
  }
}

module.exports = babelPlugin