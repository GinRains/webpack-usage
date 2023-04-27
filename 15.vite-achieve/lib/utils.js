function normalizePath(path) {
  return path.replace(/\\/g, '/')
}

const knowJsSrcRE = /\.(js|vue)($|\?)/
function isJSRequest(url) {
  return knowJsSrcRE.test(url)
}

exports.normalizePath = normalizePath
exports.isJSRequest = isJSRequest