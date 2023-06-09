const esprima = require('esprima') // 吧js源代码转成抽象语法树
const estraverse = require('estraverse') // 遍历抽象语法树
const escodegen = require('escodegen') // 吧语法树重新生成源代码

const sourceCode = `function ast(){}`
const AST = esprima.parse(sourceCode)

estraverse.traverse(AST, {
  enter(node) {
    console.log('进入', node.type)
    if (node.type === 'FunctionDeclaration') {
      node.id.name = 'newAST'
    }
  },
  leave(node) {
    console.log('离开', node.type)
  }
})

const newSourceCode = escodegen.generate(AST)
console.log(newSourceCode)