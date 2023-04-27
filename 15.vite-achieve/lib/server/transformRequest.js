const fs = require('fs-extra')

async function transformRequest(url, server) {
  // resolveId
  const { pluginContainer } = server
  const { id } = await pluginContainer.resolveId(url)
  // console.log('id', id)
  // load
  const loadResult = await pluginContainer.load(id)
  if(loadResult) {
    code = loadResult.code
  } else {
    code = fs.readFileSync(id, 'utf8')
  }
  // transform
  const result = pluginContainer.transform(code, id)
  return result
}

module.exports = transformRequest