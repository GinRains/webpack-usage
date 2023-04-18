/**
 * loader 分类
 * post(后置) + inline(行内) + normal(正常) + pre(前置)
 */

const { runLoaders } = require('./loader-runner')
const path = require('path')
const fs = require('fs')

const entryFile = path.resolve(__dirname, 'src/less.js')
let request = `inline-loader1!inline-loader2!${entryFile}`
let rules = [
  {
    test: /\.js$/,
    use: ['normal-loader1', 'normal-loader2']
  },
  {
    test: /\.js$/,
    enforce: 'post',
    use: ['post-loader1', 'post-loader2']
  },
  {
    test: /\.js$/,
    enforce: 'pre',
    use: ['pre-loader1', 'pre-loader2']
  }
]

let parts = request.replace(/^-?!+/, "").split('!')
let resource = parts.pop()
let inlineLoaders = parts
let preLoaders = [],
  postLoaders = [],
  normalLoaders = []

for(let i = 0; i < rules.length; i++) {
  let rule = rules[i]
  if(rule.test.test(resource)) {
    if(rule.enforce === 'pre') {
      preLoaders.push(...rule.use)
    } else if(rule.enforce === 'post') {
      postLoaders.push(...rule.use)
    } else {
      normalLoaders.push(...rule.use)
    }
  }
}
let loaders = [
  ...postLoaders,
  ...inlineLoaders,
  ...normalLoaders,
  ...preLoaders
]

loaders = loaders.map(loader => path.resolve(__dirname, 'loader-chain', loader))
runLoaders({
  resource,
  loaders,
  context: { age: 18 },
  readResource: fs.readFile
}, (err, result) => {
  console.log(err)
  console.log(result.result[0].toString())
  console.log(result.resourceBuffer ? result.resourceBuffer.toString() : null)
})