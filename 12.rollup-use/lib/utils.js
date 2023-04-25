const walk = require('./walk')

function hasOwnProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

function replaceIdentifier(statement, source, replacements) {
  walk(statement, {
    enter(node) {
      if(node.type === 'Identifier') {
        if(node.name && replacements[node.name])
          source.overwrite(node.start, node.end, replacements[node.name])
      }
    }
  })
}

exports.hasOwnProperty = hasOwnProperty
exports.replaceIdentifier = replaceIdentifier