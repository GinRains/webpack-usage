const { init, parse } = require('es-module-lexer')
const MagicString = require('magic-string')

function importAnalysis({ root }) {
  return {
    name: 'importAnalysis',
    // 找到源文件第三方模块，进行转换
    async transform(source, importer) {
      await init
      let imports = parse(source)[0]
      if(!imports.length) {
        return source
      }
      const ms = new MagicString(source)
      const normalizeUrl = async (url) => {
        debugger
        const resolved = await this.resolve(url, importer)
        if(resolved && resolved.id.startsWith(root)) {
          url = resolved.id.slice(root.length)
        }
        return url
        // if(url === 'vue') {
        //   return '/node_modules/.self/deps/vue.js'
        // } else {
        //   return url
        // }
      }
      for(let index = 0; index < imports.length; index++) {
        const { s: start, e: end, n: specifier } = imports[index]
        if(specifier) {
          const normalizedUrl = await normalizeUrl(specifier)
          if(specifier !== normalizedUrl) {
            ms.overwrite(start, end, normalizedUrl)
          }
        }
      }
      return ms.toString()
    }
  }
}

module.exports = importAnalysis