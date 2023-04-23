const HtmlWebpackPlugin = require('html-webpack-plugin')

class PreloadWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('PreLoadWebpackPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tap('PreloadWebpackPlugin', (htmlData) => {
        // console.log(htmlData)
        const { chunks } = compilation
        // 筛选异步导入的模块
        const files = chunks.filter(chunk => !chunk.canBeInitial()).reduce((files, chunk) => {
          return files.add(...chunk.files)
        }, new Set())

        console.log(files)
        files.forEach(file => htmlData.assetTags.styles.push({
          tagName: 'link',
          attributes: {
            rel: 'preload',
            href: file,
            as: 'script'
          }
        }))
      })
    })
  }
}

module.exports = PreloadWebpackPlugin