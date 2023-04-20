class DonePlugin {
  apply(compile) {
    compile.hooks.done.tap('DonePlugin', (stats) => {
      console.log('DonePlugin.tap')
    })
    compile.hooks.done.tapAsync('DonePlugin', (stats, callback) => {
      console.log('DonePlugin.tapAsync')
      callback(null)
    })
  }
}

module.exports = DonePlugin