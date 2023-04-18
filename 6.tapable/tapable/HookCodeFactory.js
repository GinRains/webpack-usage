class HookCodeFactory {
  setup(hookInstance, options) {
    hookInstance._x = options.taps.map(tapInfo => tapInfo.fn)
  }
  init(options) {
    this.options = options
  }
  args() {
    return this.options.args.join(',')
  }
  header() {
    let code = ``
    code += `var _x = this._x;\n`
    return code
  }
  create(options) {
    this.init(options)
    let fn
    switch(options.type) {
      case 'sync':
        fn = new Function(
          this.args(),
          this.header() + this.content()
        )
        break;
    }
    this.deinit()
    return fn
  }
  deinit() {
    this.options = null
  }
  callTapsSeries() {
    let code = ''
    for(let j = 0; j < this.options.taps.length; j++) {
      const tapContent = this.callTap(j)
      code += tapContent
    }
    return code
  }
  callTap(tapIndex) {
    let code = ``
    code += `var _fn${tapIndex} = _x[${tapIndex}];\n`
    let tapInfo = this.options.taps[tapIndex]
    switch(tapInfo.type) {
      case 'sync':
        code += `_fn${tapIndex}(${this.args()})\n`
        break;
    }
    return code
  }
}

module.exports = HookCodeFactory