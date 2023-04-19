class Hook {
  constructor(args) {
    this.args = Array.isArray(args) ? args : [] // 存储形参
    this.taps = [] // 存储回调
    this.call = CALL_DELEGATE // 代理CALL方法
    this.callAsync = CALL_ASYNC_DELEGATE
    this.promise = PROMISE_DELEGATE
    this.interceptors = []
    this._x = null
  }
  tap(options, fn) {
    this._tap('sync', options, fn)
  }
  tapAsync(options, fn) {
    this._tap('async', options, fn)
  }
  tapPromise(options, fn) {
    this._tap('promise', options, fn)
  }
  _tap(type, options, fn) {
    if(typeof options === 'string') {
      options = { name: options }
    }
    const tapInfo = { ...options, type, fn }
    this.runRegisterInterceptors(tapInfo)
    this._insert(tapInfo)
  }
  runRegisterInterceptors(tapInfo) {
    for(const interceptor of this.interceptors) {
      if(interceptor.register) {
        interceptor.register(tapInfo)
      }
    }
  }
  _insert(tapInfo) {
    this.resetCompilation()
    let before
    if(typeof tapInfo.before === 'string') {
      before = new Set([tapInfo.before])
    } else {
      before = new Set(tapInfo.before)
    }
    // 排序
    let stage = 0
    if(typeof tapInfo.stage === 'number') {
      stage = tapInfo.stage
    }
    let i = this.taps.length
    while(i > 0) {
      i--
      const x = this.taps[i]
      this.taps[i + 1] = x
      if (before) {
        if (before.has(x.name)) {
          before.delete(x.name)
          continue
        }
        if (before.size > 0) {
          continue
        }
      }
      const xStage = x.stage || 0
      if (xStage > stage) {
        continue
      }
      i++
      break;
    }
    this.taps[i] = tapInfo
  }
  intercept(interceptor) {
    this.interceptors.push(interceptor)
  }
  resetCompilation() {
    this.call = CALL_DELEGATE // 代理CALL方法
    this.callAsync = CALL_ASYNC_DELEGATE
  }
  _createCall(type) {
    return this.compile({
      taps: this.taps,
      args: this.args,
      interceptors: this.interceptors,
      type
    })
  }
}

const CALL_DELEGATE = function (...args) {
  this.call = this._createCall('sync')
  return this.call(...args)
}
const CALL_ASYNC_DELEGATE = function (...args) {
  this.callAsync = this._createCall('async')
  return this.callAsync(...args) 
}
const PROMISE_DELEGATE = function (...args) {
  this.promise = this._createCall('promise')
  return this.promise(...args)
}

module.exports = Hook