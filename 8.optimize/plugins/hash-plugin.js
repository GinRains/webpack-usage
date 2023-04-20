class HashPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('HashPlugin', (compilation) => {
      compilation.hooks.afterHash.tap('HashPlugin', () => {
        console.log('hash', compilation.hash)
        compilation.hash = 'hash'
        for(let chunk of compilation.chunks) {
          console.log('renderedHash', chunk.renderedHash)
          console.log('contentHash', chunk.contentHash)
          chunk.renderedHash = 'rchunkhash'
          chunk.contentHash = {
            'css/mini-extract': 'csshash',
            javascript: 'jshash'
          }
        }
      })
    })
  }
}

module.exports = HashPlugin