const types = require("@babel/types")


const eslintPlugin = (options) => {
  return {
    pre(file) {
      file.set('errors', [])
    },
    visitor: {
      CallExpression(path, state) {
        const { node } = path
        const errors = state.file.get('errors')
        if(types.isMemberExpression(node.callee)) {
          if(node.callee.object.name === 'console') {
            if(['log', 'warn', 'info', 'error', 'debug'].includes(node.callee.property.name)) {
              Error.stackTraceLimit = 0 // 清空栈深度
              errors.push(path.buildCodeFrameError(`代码中不能出现console语句`), Error)
              if(options.fix) {
                path.parentPath.remove()
              }
            }
          }
        }
      }
    },
    post(file) {
      console.log(file.get('errors'))
    }
  }
}

module.exports = eslintPlugin