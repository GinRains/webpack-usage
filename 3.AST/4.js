const core = require("@babel/core")
const types = require("@babel/types")
const pathLib = require('path')
const autoTrackerPlugin = require('./auto-tracker-plugin')
// 埋点

const sourceCode = `
import xxx from 'logger'
function sum(a, b) {
  return a+b
}
const multiply = function(a, b) {
  return a * b
}

const minus = (a, b) => a + b
class Calculator {
  divide(a, b) {
    return a / b
  }
}
`
const result = core.transform(sourceCode, {
  plugins: [autoTrackerPlugin({ name: 'logger', whiteLists: ['sum'] })]
})

console.log(result.code)