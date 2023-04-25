function build() {
  return {
    name: 'build',
    async options(source) { // 此钩子一般不使用
      console.log('options')
    },
    async buildStart(inputOptions) {
      console.log('buildStart', inputOptions)
    },
    async resolveId(source, importer) {
      console.log('resolveId', source, importer)
    },
    async load(id) {
      console.log('load', id)
    },
    async shouldTransformCachedModule({code, id}) {
      console.log('shouldTransformCachedModule', code, id)
    },
    async transform(code, id) {
      console.log('transform', code, id)
    },
    async moduleParsed(moduleInfo) {
      console.log('moduleParsed', moduleInfo)
    },
    async resolveDynamicImport(specifier, importer) {
      console.log('resolveDynamicImport', specifier, importer)
    },
    async buildEnd() {
      console.log('buildEnd')
    }
  }
}

export default build