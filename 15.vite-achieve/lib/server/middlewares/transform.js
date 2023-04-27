const { parse } = require('url')
const { isJSRequest } = require('../../utils')
const send = require('../send')
const transformRequest = require('../transformRequest')

function transformMiddleware(server) {
  return async function(req, res, next) {
    if(req.method !== 'GET') return next()
    debugger
    let pathname = parse(req.url).pathname
    // 如果请求的资源是JS的话，重写第三方模块路径
    if(isJSRequest(pathname)) {
      const result = await transformRequest(req.url, server)
      if(result) {
        return send(req, res, result.code, 'js')
      } else {
        return next()
      }
    } else {
      return next()
    }
  }
}

module.exports = transformMiddleware