/**
 * 编译完成后，打包dist目录下所有文件
 */

const Jszip = require('jszip')
const { RawSource } = require('webpack-sources')
class ArchivePlugin {
  apply(compile) {
    compile.hooks.compilation.tap('ArchivePlugin', (compilation) => {
      compilation.hooks.processAssets.tapPromise({ name: 'ArchivePlugin' }, (assets) => {
        const zip = new Jszip()
        for(const pathname in assets) {
          const source = assets[pathname]
          const sourceCode = source.source() // 返回源代码字符串
          zip.file(pathname, sourceCode)
        }
        return zip.generateAsync({ type: 'nodebuffer' }).then(content => {
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