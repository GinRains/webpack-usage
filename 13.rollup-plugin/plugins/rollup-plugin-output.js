function output() {
  return {
    name: 'output',
    outputOptions(outputOptions) {
    },
    async renderStart(outputOptions) {
      // console.log(outputOptions)
      outputOptions.dir = 'dist2'
    },
    async banner() {
      return '//banner'
    },
    async footer() {
      return '//footer'
    },
    async intro() {
      return '//intro'
    },
    async outro() {
      return '//outro'
    },
    // renderDynamicImport() { // 唯一不多的同步钩子， 解析动态导入，如果有浏览器不支持import('./xxx.js')，可以在这里兼容
    //   return {
    //     left: "import(",
    //     right: ")"
    //   }
    // },
    renderDynamicImport() { // 唯一不多的同步钩子， 解析动态导入，如果有浏览器不支持import('./xxx.js')，可以在这里兼容
      return {
        left: "importPolyfill(",
        right: ", import.meta.url)"
      }
    },
    augmentChunkHash(chunkInfo) {
      // console.log('chunkInfo', chunkInfo)
    },
    resolveId(source) {
      if(source === 'logger') {
        return source
      }
    },
    load(importee) {
      if(importee === 'logger') {
        const referenceId = this.emitFile({
          type: 'asset',
          source: 'console.log("logger")',
          fileName: 'logger.js'
        })
        return `export default import.meta.ROLLUP_FILE_URL_${referenceId}`
      }
    },
    resolveFileUrl({ chunkId, fileName, format, moduleId, referenceId, relativePath}) {
      // console.log(chunkId,fileName, format, moduleId, referenceId, relativePath)
      if(moduleId === 'logger')
        return `new URL('${fileName}', document.baseURI).href`
    },
    resolveImportMeta(property) {
      return JSON.stringify({...import.meta, age: 23 })
    },
    renderChunk(code, chunk, options) {
      // console.log('code', code)
    },
    generateBundle(options, bundle, isWrite) {
      // 向输出目录里写入一个html插件
      let entryNames = []
      for(let filename in bundle) {
        let assetOrChunkInfo = bundle[filename]
        if(assetOrChunkInfo.isEntry) {
          entryNames.push(filename)
        }
      }
      this.emitFile({
        type: 'asset',
        fileName: 'main.html',
        source: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  ${entryNames.map(entryName =>
    `<script src="${entryName}" type="module"></script>`
  )}
</body>
</html>`
      })
    },
    writeBundle() {
      console.log('writeBundle')
    },
    renderError() {
      console.log('renderError')
    },
    closeBundle() {
      console.log('closeBundle')
    }
  }
}

export default output