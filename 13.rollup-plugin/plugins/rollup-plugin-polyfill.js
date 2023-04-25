const POLYFILL_ID = '\0polyfill';
const PROXY_SUFFIX = '?inject-polyfill'
function polyfill() {
  return {
    name: 'inject-polyfill',
    async resolveId(source, importer, options) {
      // console.log(source, importer)
      if(source === POLYFILL_ID) {
        return { id: POLYFILL_ID, moduleSideEffects: true }
      }
      if(options.isEntry) { // 判断是否是入口
        const resolution = await this.resolve(source, importer, { skipSelf: true, ...options })
        // console.log(resolution)
        if(!resolution || resolution.external) {
          return resolution
        }
        const moduleInfo = await this.load(resolution)
        console.log(moduleInfo)
        moduleInfo.moduleSideEffects = true
        // D:\\StudySpace\\webpack-usage\\13.rollup-plugin\\src\\index.js?inject-polyfill
        return `${resolution.id}${PROXY_SUFFIX}`
      }
      return null
    },
    async load(id) {
      if(id === POLYFILL_ID) {
        return "console.log('腻子代码')"
      }
      if(id.endsWith(PROXY_SUFFIX)) {
        // D:\\StudySpace\\webpack-usage\\13.rollup-plugin\\src\\index.js
        const entryId = id.slice(0, -PROXY_SUFFIX.length)
        let code = `
          import ${JSON.stringify(POLYFILL_ID)};
          export * from ${JSON.stringify(entryId)}
        `
        return code
      }
      return null
    }
  }
}

export default polyfill

/**
 * {
 *  assertions: {},
 *  external: false,
 *  id: 'D:\\StudySpace\\webpack-usage\\13.rollup-plugin\\src\\index.js',
 *  meta: {},
 *  moduleSideEffects: true,
 *  resolvedBy: 'rollup',
 *  syntheticNamedExports: false // export {}
 * }
 */