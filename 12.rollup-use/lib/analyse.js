const walk = require('./walk')
const Scope = require('./scope')
const { hasOwnProperty } = require('./utils')

function analyse(ast, code, module) {
  // 开始第1轮循环，找出本模块导入导出了哪些变量
  ast.body.forEach(statement => {
    Object.defineProperties(statement, {
      _included: { value: false, writable: true }, // 这条语句默认不包括在输出结果里
      _module: { value: module },
      _source: { value: code.snip(statement.start, statement.end)},
      _dependsOn: { value: {} },
      _defines: { value: {} },
      _modifies: { value: {} }, // 存放本语句修改了哪些变量
    })
    if(statement.type === 'ImportDeclaration') {
      let source = statement.source.value
      statement.specifiers.forEach(specifier => {
        let importName = specifier.imported.name
        let localName = specifier.local.name
        module.imports[localName] = { source, importName }
      })
    } else if(statement.type === 'ExportNamedDeclaration') {
      const declaration = statement.declaration
      if(declaration && declaration.type === 'VariableDeclaration') {
        const declarations = declaration.declarations
        declarations.forEach(variableDeclarator => {
          const localName = variableDeclarator.id.name
          const exportName = localName
          module.exports[exportName] = { localName }
        })
      }
    }
  })
  // 开始第2轮循环，创建作用域链
  let currentScope = new Scope({ name: '模块内顶级作用域' })
  function addToScope(name, statement, isBlockDeclaration) {
    currentScope.add(name, isBlockDeclaration)
    if(!currentScope.parent ||
      // 如果当前作用域是块级作用域，且变量声明不是块级声明，是var
      (currentScope.isBlock && !isBlockDeclaration)) {
      statement._defines[name] = true
      module.definitions[name] = statement
    }
  }
  function checkForReads(node, statement) {
    if(node.type === 'Identifier') {
      statement._dependsOn[node.name] = true // 表示当前模块用到了node.name变量
    }
  }
  function checkForWrites(node, statement) {
    function addNode(node) {
      const { name } = node
      statement._modifies[name] = true
      if(!hasOwnProperty(module.modifications, name)) {
        module.modifications[name] = []
      }
      module.modifications[name].push(statement)
    }
    if(node.type === 'AssignmentExpression') {
      addNode(node.left)
    } else if (node.type === 'UpdateExpression') {
      addNode(node.argument)
    }
  }
  ast.body.forEach(statement => {
    walk(statement, {
      enter(node) {
        checkForReads(node, statement)
        checkForWrites(node, statement)
        let newScope
        switch (node.type) {
          case 'FunctionDeclaration':
          case 'ArrowFunctionExpression':
            addToScope(node.id.name, statement)
            const names = node.params.map(param => param.name)
            newScope = new Scope({
              name: node.id.name,
              parent: currentScope,
              names,
              isBlock: false
            })
            break;
          case 'VariableDeclaration':
            node.declarations.forEach(declaration => {
              if(node.kind === 'let' || node.kind === 'const') {
                addToScope(declaration.id.name, statement, true)
              } else {
                addToScope(declaration.id.name, statement)
              }
            })
            break;
          case 'BlockStatement':
            newScope = new Scope({ parent: currentScope, isBlock: true })
            break;
        
          default:
            break;
        }
        if(newScope) {
          Object.defineProperty(node, '_scope', { value: { newScope } })
          currentScope = newScope
        }
      },
      leave(node) {
        if(Object.hasOwnProperty(node, '_scope')) {
          currentScope = currentScope.parent // 回退到父级作用域
        }
      }
    })
  })
  // ast.body.forEach(statement => {
  //   console.log(statement._defines)
  // })
}

module.exports = analyse