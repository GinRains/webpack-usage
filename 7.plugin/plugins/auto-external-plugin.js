const HtmlWebpackPlugin = require("html-webpack-plugin")
const { ExternalModule } = require("webpack")

class AutoExternalPlugin {
  constructor(options) {
    this.options = options
    this.externalModules = Object.keys(options)
    this.importedModules = new Set()
  }
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('AutoExternalPlugin', (normalModuleFactory) => {
      /* 这一步是否可以不做？
      // 找出源码中，那些地方引入了jquery/lodash，并放入this.importModules中
      // 普通的JS文件对应的勾子就是 javascript/auto
      normalModuleFactory.hooks.parser.for('javascript/auto').tap('AutoExternalPlugin', (parser) => {
        parser.hooks.import.tap('AutoExternalPlugin', (statement, source) => {
          // console.log(statement, source)
          if(this.externalModules.includes(source))
            this.importedModules.add(source)
        })
        parser.hooks.call.for('require').tap('AutoExternalPlugin', (expression) => {
          const source = expression.arguments[0].value
          if(this.externalModules.includes(source))
            this.importedModules.add(source)
        })
      }) */
      // 2. 改造模块的生产过程，拦截生成过程，判断如果是外部模块的话，生产一个外部模块并返回
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
    compiler.hooks.compilation.tap('AutoExternalPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync('AutoExternalPlugin', (data, callback) => {
        const { assetTags } = data
        for(let key of this.externalModules) {
          assetTags.scripts.unshift({
            tagName: 'script',
            voidTag: false,
            attributes: {
              defer: false,
              src: this.options[key].url
            }
          })
        }
        console.log(data.assetTags)
        callback(null, data)
      })
    })
  }
}
 
module.exports = AutoExternalPlugin