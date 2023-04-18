const core = require("@babel/core")
const types = require("@babel/types")
const pathLib = require('path')
const eslintPlugin = require('./eslintPlugin')

const sourceCode = `
var a = 1
console.log(a)
var b = 2
`

const { code } = core.transformSync(sourceCode, {
  plugins: [eslintPlugin({ fix: true })]
})

console.log(code)