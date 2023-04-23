var MagicString = require('magic-string')
var sourceCode = `export var name = "hello world"`
var ms = new MagicString(sourceCode)

console.log(ms)
console.log(ms.snip(0, 6).toString())
console.log(ms.remove(0, 7).toString())

// 还可以用来拼接字符串
let bundle = new MagicString.Bundle()
bundle.addSource({
  content: 'var a = 1',
  separator: '\n'
})
bundle.addSource({
  content: 'var b = 2',
  separator: '\n'
})

console.log(bundle.toString())