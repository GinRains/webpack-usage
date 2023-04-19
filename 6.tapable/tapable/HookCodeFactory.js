class HookCodeFactory {
  setup(hookInstance, options) {
    hookInstance._x = options.taps.map(tapInfo => tapInfo.fn)
  }
  init(options) {
    this.options = options
  }
  args(config= {}) {
    const { before, after } = config
    let allArgs = this.options.args
    if(before) {
      allArgs = [before, ...allArgs]
    }
    if(after) {
      allArgs = [...allArgs, after]
    }

    return allArgs.join(',')
  }
  header() {
    let code = ``
    code += `var _x = this._x;\n`
    const interceptors = this.options.interceptors
    if(interceptors.length) {
      code += `var _taps = this.taps;\n`
      code += `var _interceptors = this.interceptors;\n`
      interceptors.forEach((interceptor, idx) => {
        if(interceptor.call) {
          code += `_interceptors[${idx}].call(${this.args()});\n`
        }
      })
    }
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
      case 'async':
        fn = new Function(
          this.args({ after: '_callback' }),
          this.header() + this.content({ onDone: () => '_callback();\n'})
        )
        break;
      case 'promise':
        let tapsContent = this.content({ onDone: () => '_resolve();\n'})
        let content = `
          return new Promise(function (_resolve, _reject) {
            var _sync = true;\n
            ${tapsContent}
            _sync = false;\n
          })
        `
        fn = new Function(
          this.args(),
          this.header() + content
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
  callTap(tapIndex, options = {}) {
    const { onDone } = options
    let code = ``
    const interceptors = this.options.interceptors
    if(interceptors.length) {
      code += `var _tap${tapIndex} = _taps[${tapIndex}];\n`
      interceptors.forEach((interceptor, idx) => {
        if(interceptor.tap) {
          code += `_interceptors[${idx}].tap(_tap${idx});\n`
        }
      })
    }
    code += `var _fn${tapIndex} = _x[${tapIndex}];\n`
    let tapInfo = this.options.taps[tapIndex]
    switch(tapInfo.type) {
      case 'sync':
        code += `_fn${tapIndex}(${this.args()})\n`
        if (onDone) code += onDone()
        break;
      case 'async':
        code += `
          _fn${tapIndex}(${this.args()}, function (_err${tapIndex}) {
            if (--_counter === 0) _done();
          });`
        break;
      case 'promise':
        code += `
          var _fn${tapIndex} = _x[${tapIndex}];
          var _promise${tapIndex} = _fn${tapIndex}(${this.args()});
          _promise${tapIndex}.then(
            function () {
              if (--_counter === 0) _done();
            }
          );
        `
    }
    return code
  }
  callTapsParallel({ onDone }) {
    const taps = this.options.taps
    let code = ``
    code += `var _counter = ${taps.length};\n`
    code += `
      var _done = function () {
        ${onDone()};
      };\n`

    for(let i = 0; i < taps.length; i++) {
      const tapContent = this.callTap(i, { onDone: () => `if (--_counter === 0) _done();`})
      code += tapContent
    }

    return code
  }
}

module.exports = HookCodeFactory