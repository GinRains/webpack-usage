const path = require('path')

function loader (source) {
}

loader.pitch = function (remainingRequest) {
  console.log(remainingRequest) // D:\StudySapce\webpack-usage\5.loader\loaders\less-loader.js!D:\StudySapce\webpack-usage\5.loader\src\index.less
  const request = '!!' + remainingRequest.split('!').map(
    requestPath => this.utils.contextify(this.context, requestPath)
    // requestPath => './' + path.posix.relative(normalizePath(this.context), normalizePath(requestPath)).replace(/\\/g, '/')
  ).join('!')
  console.log(request)
  let script = `
    let styleCSS = require(${JSON.stringify(request)})
    let style = document.createElement('style');
    style.innerHTML = styleCSS;
    document.head.appendChild(style)
  `
  return script
}
function normalizePath(path) {
  return path.replace(/\\/g, '/')
}

module.exports = loader