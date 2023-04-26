const connect = require('connect')
const static = require('serve-static')
const http = require('http')

const app = connect()
// app.use((req, res, next) => {
//   console.log('中间件1')
//   next()
// })
// app.use((req, res, next) => {
//   console.log('中间件2')
//   next()
// })
// app.use((req, res, next) => {
//   res.end('end')
// })
app.use(static(__dirname)) // 把当前目录作为根目录

http.createServer(app).listen(3000, () => console.log('3000'))