const connect = require('connect')

async function createServer() {
  const app = connect()
  const server ={
    async listen(port, callback) {
      require('http')
        .createServer(app)
        .listen(port, callback)
    }
  }
  return server
}

exports.createServer = createServer