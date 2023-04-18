const core = require("@babel/core")
const types = require("@babel/types")
// const arrowFunctionPlugin = require("babel-plugin-transform-es2015-arrow-functions")

const arrowFunctionPlugin = {
  visitor: {
    ArrowFunctionExpression(path) {
      const { node } = path
      const body = node.body
      hoistFunctionEnvironment(path)
      node.type = 'FunctionExpression'
      if(!types.isBlockStatement(node.body)) {
        node.body = types.blockStatement([types.returnStatement(body)])
      }
    }
  }
}

function hoistFunctionEnvironment(path) {
  const thisPaths = getThisPaths(path)
  if(thisPaths.length) {
    const thisEnv = path.findParent(parent => {
      return (parent.isFunction() && !parent.isArrowFunctionExpress()) || parent.isProgram()
    })
    let thisBindings = '_this'
    if(!thisEnv.scope.hasBinding(thisBindings)) {
      const thisIdentifier = types.identifier(thisBindings)
      // var _this = this
      thisEnv.scope.push({
        id: thisIdentifier,
        init: types.thisExpression()
      })
      thisPaths.forEach(thisPath => {
        // this => _this
        thisPath.replaceWith(thisIdentifier)
      })
    }
  }
}
function getThisPaths(path) {
  let thisPaths = []
  path.traverse({
    ThisExpression(path) {
      thisPaths.push(path)
    }
  })
  return thisPaths
}

// const sum = (a, b) => {
//   return a + b;
// }

// const sum = (a, b) => a + b

const sourceCode = `
  const sum = (a,b)=>{
    console.log(this);
    return a+b;
  }
`
const result = core.transform(sourceCode, {
  plugins: [arrowFunctionPlugin]
})

console.log(result.code)