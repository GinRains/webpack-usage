const HtmlWebpackPlugin = require("html-webpack-plugin")
const { ExternalModule } = require("webpack")

class AutoExternalPlugin {
  constructor(options) {
    this.options = options
    this.externalModules = Object.keys(options)
    this.importedModules = new Set()
  }
  apply(compile) {
    compile.hooks.normalModuleFactory.tap('AutoExternalPlugin', (normalModuleFactory) => {
      normalModuleFactory.hooks.parser.for('javascript/auto').tap('AutoExternalPlugin', (parser) => {
        parser.hooks.import.tap('AutoExternalPlugin', (statement, source) => {
          if(this.externalModules.includes(source))
            this.importedModules.add(source)
        })
        parser.hooks.call.for('require').tap('AutoExternalPlugin', (expression) => {
          const source = expression.arguments[0].value
          if(this.externalModules.includes(source))
            this.importedModules.add(source)
        })
      })
      normalModuleFactory.hooks.factorize.tapAsync('AutoExternalPlugin', (resolveData, callback) => {
        const { request } = resolveData
        if(this.externalModules.includes(request)) {
          let { variable } = this.options[request]
          callback(null, new ExternalModule(variable, 'window', request))
        } else {
          callback(null)
        }
      })
    })
    // 3. 向产出的HTML中插入CDN脚本
    Compiler.hooks.compilation.tap('AutoExternalPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags
    })
  }
}
 
module.exports = AutoExternalPlugin