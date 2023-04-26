const fs = require('fs-extra')
const { normalizePath } = require('../utils')
const { createPluginContainer } = require('../server/pluginContainer')
const resolvePlugin = require('../plugins/resolve')

const htmlTypesRE = /\.html$/
const scriptModuleRE = /<script\s+src="(.+?)"\s+type="module">/
/**
 * 获取esbuild扫描插件的工厂方法
 * @param {*} config 
 * @param {*} depImports 
 */
async function esBuildScanPlugin(config, depImports) {
  const container = await createPluginContainer({
    plugins: [resolvePlugin(config)],
    root: config.root
  })
  const resolve = async function(path, importer) {
    return await container.resolveId(path, importer)
  }
  return {
    name: 'scan',
    setup(build) {
      build.onResolve({ filter: htmlTypesRE }, async ({ path, importer }) => {
        const resolved = await resolve(path, importer)
        if(resolved) {
          return {
            path: resolved.id || resolved,
            namespace: 'html'
          }
        }
      })
      build.onResolve({ filter: /\.*/ }, async ({ path, importer }) => {
        const resolved = await resolve(path, importer)
        if(resolved) {
          const id = resolved.id || resolved
          if(id.includes('node_modules')) {
            depImports[path] = normalizePath(id)
            return {
              path: id,
              external: true
            }
          }
          return {
            path: id
          }
        }
      })
      build.onLoad({ filter: htmlTypesRE, namespace: 'html' }, async ({ path }) => {
        const html = fs.readFileSync(path, 'utf8')
        let [_, src] = html.match(scriptModuleRE)
        let jsContent = `import ${JSON.stringify(src)}`

        return {
          contents: jsContent,
          loader: 'js'
        }
      })
    }
  }
}

module.exports = esBuildScanPlugin
