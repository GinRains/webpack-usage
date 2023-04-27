const connect = require('connect')
const serveStaticMiddleware = require('./middlewares/static')
const { createOptimizeDepsRun } = require('../optimizer')
const resolveConfig = require('../config')
const transformMiddleware = require('./middlewares/transform')
const { createPluginContainer } = require('./pluginContainer')

async function createServer() {
  const config = await resolveConfig()
  const app = connect()
  const pluginContainer = await createPluginContainer(config)
  const server = {
    pluginContainer,
    async listen(port, callback) {
      // 项目启动前进行依赖的收集
      // 1，找到项目中依赖的第三方模块
      await runOptimize(config, server)
      require('http')
      .createServer(app)
      .listen(port, callback)
    }
  }
  for(const plugin of config.plugins) {
    if(plugin.configureServer) {
      plugin.configureServer(server)
    }
  }
  app.use(transformMiddleware(server))
  app.use(serveStaticMiddleware(config))
  return server
}

async function runOptimize(config, server) {
  const optimizeDeps = await createOptimizeDepsRun(config)
  server._optimizeDepsMetadata = optimizeDeps.metadata
}

exports.createServer = createServer