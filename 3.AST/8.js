const core = require("@babel/core")
const types = require("@babel/types")
const pathLib = require('path')
const uglifyPlugin = require('./uglifyPlugin')

const sourceCode = `
var age = 1
console.log(age)
var name = 2
`

const { code } = core.transformSync(sourceCode, {
  plugins: [uglifyPlugin()]
})

console.log(code)