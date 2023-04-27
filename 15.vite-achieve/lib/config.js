const path = require('path')
const { normalizePath } = require('./utils')
const { resolvePlugins } = require('./plugins')
const fs = require('fs-extra')

async function resolveConfig() {
  const root = normalizePath(process.cwd())
  const cacheDir = normalizePath(path.resolve(`node_modules/.self`))
  let config = {
    root,
    cacheDir
  }

  config.plugins = await resolvePlugins(config)
  // 读取用户自己设置的插件
  const configFile = path.resolve(root, 'vite.config.js')
  const exists = await fs.pathExists(configFile)
  let userPlugins = []
  if(exists) {
    const userConfig = require(configFile)
    userPlugins = userConfig.plugins || []
    delete userConfig.plugins
    config = { ...config, ...userConfig }
  }
  for(let plugin of userPlugins) {
    if(plugin.config) {
      let res = await plugin.config()
      if(res) {
        config = { ...config, ...res }
      }
    }
  }
  config.plugins = await resolvePlugins(config, userPlugins)
  return config
}

module.exports = resolveConfig