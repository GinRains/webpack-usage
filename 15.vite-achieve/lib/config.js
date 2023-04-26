const path = require('path')
const { normalizePath } = require('./utils')

async function resolveConfig() {
  const root = normalizePath(process.cwd())
  const cacheDir = normalizePath(path.resolve(`node_modules/.self`))
  const config = {
    root,
    cacheDir
  }

  return config
}

module.exports = resolveConfig