class DonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('DonePlugin', (stats) => {
      console.log('DonePlugin.tap')
    })
    compiler.hooks.done.tapAsync('DonePlugin', (stats, callback) => {
      console.log('DonePlugin.tapAsync')
      callback(null)
    })
  }
}

module.exports = DonePlugin