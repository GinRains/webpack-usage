import babel from '@babel/core'
import { createFilter } from 'rollup-pluginutils'

function babelPlugin(options) {
  const { include, exclude, extensions = ['.js'] } = options
  // (js|jsx|ts)$
  const extensionsRegExp = new RegExp(`${extensions.join('|')}$`)
  const userDefinedFilter = createFilter(include, exclude)
  const filter = id => extensionsRegExp.test(id) && userDefinedFilter(id)

  return {
    name: 'babel',
    async transform(code, id) {
      if(!filter(id)) return null
      return await babel.transformAsync(code, options.babel)
    }
  }
}

export default babelPlugin