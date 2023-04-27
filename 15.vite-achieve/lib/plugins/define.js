function definePlugin(config) {
  return {
    name: 'define',
    async transform(code, id) {
      const replacements = config.define || {}
      for(let key in replacements) {
        code = code.replace(new RegExp(key, 'g'), replacements[key])
      }
      return code
    }
  }
}

module.exports = definePlugin