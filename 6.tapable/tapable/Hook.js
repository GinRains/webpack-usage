class Hook {
  constructor(args) {
    this.args = Array.isArray(args) ? args : [] // 存储形参
    this.taps = [] // 存储回调
    this.call = CALL_DELEGATE // 代理CALL方法
    this._x = null
  }
  tap(options, fn) {
    this._tap('sync', options, fn)
  }
  _tap(type, options, fn) {
    if(typeof options === 'string') {
      options = { name: options }
    }
    const tapInfo = { ...options, type, fn }
    this._insert(tapInfo)
  }
  _insert(tapInfo) {
    this.taps.push(tapInfo)
  }
  _createCall(type) {
    return this.compile({
      taps: this.taps,
      args: this.args,
      type
    })
  }
}

const CALL_DELEGATE = function (...args) {
  this.call = this._createCall('sync')
  return this.call(...args)
}

module.exports = Hook