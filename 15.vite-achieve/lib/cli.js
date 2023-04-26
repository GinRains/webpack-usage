const { createServer } = require('./server')

;(async function() {
  const server = await createServer()
  server.listen(8801, () => console.log('server is started on 8801'))
})()