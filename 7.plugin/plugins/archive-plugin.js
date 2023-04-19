/**
 * 打包dist目录下所有文件
 */
const jszip = require('jszip')
const { RawSource } = require('webpack-sources')
class ArchivePlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('ArchivePlugin', (compilation) => {
      compilation.hooks.processAssets.tapPromise({name: 'ArchivePlugin'}, (assets) => {
        console.log('ArchivePlugin', assets)
        const zpi = new jszip()
        for(const pathname in assets) {
          const sourceObj = assets[pathname]
          const sourceCode = sourceObj.source() // 返回源代码字符串
          zpi.file(pathname, sourceCode)
        }
        return zpi.generateAsync({ type: 'nodebuffer' }).then(content => {
          assets[`${Date.now()}.zip`] = new RawSource(content)
          // assets[`${Date.now()}.zip`] = {
          //   source() {
          //     return content
          //   }
          // }
        })
      })
    })
  }
}

module.exports = ArchivePlugin