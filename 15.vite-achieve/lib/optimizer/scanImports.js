const { build } = require('esbuild')
const path = require('path')
const esBuildScanPlugin = require('./esBuildScanPlugin')

/**
 * 扫描项目中第三方模块
 * @param {*} config 
 */
async function scanImports(config) {
  const depsImports = {}
  const scanPlugin = await esBuildScanPlugin(config, depsImports)
  await build({
    absWorkingDir: config.root,
    entryPoints: [path.resolve('./index.html')],
    bundle: true,
    format: 'esm',
    outfile: './dist/bundle.js',
    write: false, // 在真实代码中write=false
    plugins: [scanPlugin]
  })

  return depsImports
}

exports.scanImports = scanImports