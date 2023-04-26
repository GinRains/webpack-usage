function build() {
  return {
    name: 'build',
    async options(source) { // 此钩子一般不使用
      console.log('options')
    },
    async buildStart(inputOptions) {
      console.log('buildStart')
      return {...inputOptions}
    },
    async resolveId(source, importer) {
      console.log('resolveId')
    },
    async load(id) {
      console.log('load')
    },
    async shouldTransformCachedModule({code, id}) {
      console.log('shouldTransformCachedModule', id)
      return false
    },
    async transform(code, id) {
      console.log('transform')
    },
    async moduleParsed(moduleInfo) {
      console.log('moduleParsed')
    },
    async resolveDynamicImport(specifier, importer) {
      console.log('resolveDynamicImport')
    },
    async buildEnd() {
      console.log('buildEnd')
    }
  }
}

export default build