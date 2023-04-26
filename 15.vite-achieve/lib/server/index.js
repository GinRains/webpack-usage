const connect = require('connect')
const serveStaticMiddleware = require('./middlewares/static')
const { createOptimizeDepsRun } = require('../optimizer')
const resolveConfig = require('../config')

async function createServer() {
  const config = await resolveConfig()
  const app = connect()
  app.use(serveStaticMiddleware(config))
  const server = {
    async listen(port, callback) {
      // 项目启动前进行依赖的收集
      // 1，找到项目中依赖的第三方模块
      debugger
      await runOptimize(config, server)
      require('http')
        .createServer(app)
        .listen(port, callback)
    }
  }
  return server
}

async function runOptimize(config, server) {
  const optimizeDeps = await createOptimizeDepsRun(config)
  server._optimizeDepsMetadata = optimizeDeps.metadata
}

exports.createServer = createServer