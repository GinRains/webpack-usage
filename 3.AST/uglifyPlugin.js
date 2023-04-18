const types = require("@babel/types")

const uglifyPlugin = () => {
  return {
    visitor: {
      Scopable(path, state) {
        Object.entries(path.scope.bindings).forEach(([key, binding]) => {
          console.log(key, binding)
          const newName = path.scope.generateUid()
          binding.path.scope.rename(key, newName)
        })
      }
    }
  }
}

module.exports = uglifyPlugin