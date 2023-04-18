const core = require("@babel/core")
const types = require("@babel/types")
const pathLib = require('path')
// const arrowFunctionPlugin = require("babel-plugin-transform-es2015-arrow-functions")

const arrowFunctionPlugin = {
  visitor: {
    CallExpression(path, state) {
      const { node } = path
      if(types.isMemberExpression(node.callee)) {
        if (node.callee.object.name === 'console') {
          if(['log', 'info', 'error', 'warn', 'debug'].includes(node.callee.property.name)) {
            // 获取这个console.log节点所在的行、列
            const { line, column } = node.loc.start
            const filename = pathLib.relative(__dirname, state.file.opts.filename)
            node.arguments.unshift(types.stringLiteral(`${filename} ${line}:${column}`))
          }
        }
      }
    }
  }
}

// 实现日志插件
const sourceCode = `
console.log('hello')
`
const result = core.transform(sourceCode, {
  filename: 'hello.js',
  plugins: [arrowFunctionPlugin]
})

console.log(result.code)