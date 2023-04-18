const babel = require('@babel/core')
const path = require('path')

function loader(source, ast, inputSourceMap) {
  let options = this.getOptions()
  const callback = this.async() // 把loader的执行从同步变成异步
  let babelOptions = {
    ...options,
    ast: true,
    sourceMaps: true,
    inputSourceMap // 上一份的sourceMap
  }
  babel.transformAsync(source, babelOptions).then(({ code }) => {
    // 在loader执行完成后才让调用callback，表示本loader已经完成了，才能继续走下一个loader或者后续的编译逻辑
    callback(null, code)
  })
}

module.exports = loader


// 同步转换
// function loader(source) {
//   let options = this.getOptions()
//   const { code } = babel.transformSync(source, options)
//   return code
// }

/**
 * 异步
 * function loader(source) {
  let options = this.getOptions()
  const callback = this.async() // 把loader的执行从同步变成异步
  babel.transformAsync(source, options).then(({ code }) => {
    // 在loader执行完成后才让调用callback，表示本loader已经完成了，才能继续走下一个loader或者后续的编译逻辑
    callback(null, code)
  })
}
 */