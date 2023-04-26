const { build } = require('esbuild')
const path = require('path')
const fs = require('fs')
const { scanImports } = require('./scanImports')
const { normalizePath } = require('../utils')

/**
 * 分析项目依赖的第三方模块
 * @param {*} config 
 */
async function createOptimizeDepsRun(config) {
  const deps = await scanImports(config)
  console.log(deps)
  const { cacheDir } = config
  const depsCacheDir = path.resolve(cacheDir, 'deps')
  const metaDataPath = path.join(depsCacheDir, '_metadata.json')
  const metadata = {
    optimized: {}
  }
  for(const id in deps) {
    const entry = deps[id]
    const outfile = path.resolve(depsCacheDir, id + '.js')
    metadata.optimized[id] = {
      src: entry,
      file: outfile
    }
    await build({ // 预编译
      absWorkingDir: process.cwd(),
      entryPoints: [deps[id]],
      outfile,
      bundle: true,
      write: true,
      format: 'esm'
    })
  }
  fs.writeFileSync(metaDataPath, JSON.stringify(metadata, (key, value) => {
    if (key === 'file' || key === 'src') {
      return normalizePath(path.relative(depsCacheDir, value))
    }
    return value
  }))

  return { metadata }
}

exports.createOptimizeDepsRun = createOptimizeDepsRun