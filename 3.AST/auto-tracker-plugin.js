const core = require("@babel/core")
const types = require("@babel/types")
const template = require("@babel/template")
const importModule = require('@babel/helper-module-imports')

const autoTrackerPlugin = (options) => {
  return {
    visitor: {
      Program: {
        enter(path, state) {
          let loggerId
          path.traverse({
            ImportDeclaration(path) {
              const importedModuleName = path.get('source').node.value
              if(importedModuleName === options.name) {
                const specifierPath = path.get('specifiers.0')
                if(specifierPath.isImportDefaultSpecifier()
                || specifierPath.isImportSpecifier()
                || specifierPath.ImportNamespaceSpecifier()) {
                  loggerId = specifierPath.node.local.name
                }
                path.stop()
              }
            }
          })
          if(!loggerId) {
            loggerId = importModule.addDefault(path, options.name, {
              nameHint: path.scope.generateUid(options.name)
            })
          }
          state.loggerNode = template.statement(`LOGGER();`)({
            LOGGER: loggerId
          })
        }
      },
      "FunctionDeclaration|FunctionExpression|ArrowFunctionExpression|ClassMethod"(path, state) {
        const { node } = path
        console.log(path)
        if(node.id && options.whiteLists.includes(node.id.name)) {
          if(types.isBlockStatement(node.body)) {
            node.body.body.unshift(state.loggerNode)
          } else {
            const newNode = types.blockStatement([
              state.loggerNode,
              types.expressionStatement(node.body)
            ])
            path.get('body').replaceWith(newNode)
          }
        }
      }
    }
  }
}

module.exports = autoTrackerPlugin