function createLoaderObject(loaderAbsPath) {
  const normal = require(loaderAbsPath)
  const pitch = normal.pitch
  const raw = normal.raw // 如果设置normal.raw 为true
  return {
    path: loaderAbsPath,
    normal,
    pitch,
    raw,
    data: {}, // loader 自己的自定义对象
    pitchExecuted: false,
    normalExecuted: false
  }
}

/**
 * 转换参数
 * @param {*} args 参数 
 * @param {*} raw 布尔值，表示loader想要字符串还是buffer
 */
function convertArgs(args, raw) {
  if(raw && !Buffer.isBuffer(args[0])) {
    args[0] = Buffer.from(args[0])
  } else if(!raw && Buffer.isBuffer(args[0])) {
    args[0] = args[0].toString()
  }
}
function runSyncOrAsync(fn, loaderContext, args, runCallback) {
  let isSync = true
  let isDone = false
  loaderContext.callback = (err, ...args) => {
    if (isDone) {
      throw new Error('callback(): The callback was already called.')
    }
    isDone = true
    runCallback(err, args)
  }
  loaderContext.async = () => { // 异步逻辑
    isSync = false
    return loaderContext.callback
  }
  let result = fn.apply(loaderContext, args)
  if(isSync) {
    isDone = true
    runCallback(null, result)
  }
}
function iterateNormalLoaders(processOptions, loaderContext, args, pitchingCallback) {
  if (loaderContext.loaderIndex < 0) {
    return pitchingCallback(null, args)
  }
  let currentLoader = loaderContext.loaders[loaderContext.loaderIndex]
  if(currentLoader.normalExecuted) {
    loaderContext.loaderIndex--
    return iterateNormalLoaders(processOptions, loaderContext, args, pitchingCallback)
  }
  let fn = currentLoader.normal
  currentLoader.normalExecuted = true
  convertArgs(args, currentLoader.raw)
  // 同步或异步执行normal
  runSyncOrAsync(fn, loaderContext, args, (err, ...returnArgs) => {
    if(err) pitchingCallback(err)
    return iterateNormalLoaders(
      processOptions,
      loaderContext,
      args,
      pitchingCallback
    )
  })
}
function processResource (processOptions, loaderContext, pitchingCallback) {
  processOptions.readResource(loaderContext.resource, (err, resourceBuffer) => {
    processOptions.resourceBuffer = resourceBuffer
    loaderContext.loaderIndex--
    iterateNormalLoaders(
      processOptions,
      loaderContext,
      [resourceBuffer],
      pitchingCallback
    )
  })
}
function iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback) {
  if(loaderContext.loaderIndex >= loaderContext.loaders.length) {
    return processResource(processOptions, loaderContext, pitchingCallback)
  }
  let currentLoader = loaderContext.loaders[loaderContext.loaderIndex]
  if(currentLoader.pitchExecuted) {
    loaderContext.loaderIndex++
    return iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback)
  }
  let fn = currentLoader.pitch
  currentLoader.pitchExecuted = true
  if (!fn) {
    return iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback)
  }
  runSyncOrAsync(fn, loaderContext, [
    loaderContext.remainingRequest,
    loaderContext.previousRequest,
    loaderContext.data
  ], (err, ...returnArgs) => {
    if(returnArgs.length > 0 && returnArgs.some(item => item)) {
      loaderContext.loaderIndex--
      iterateNormalLoaders(processOptions, loaderContext, args, pitchingCallback)
    } else {
      return iteratePitchingLoaders(processOptions, loaderContext, pitchingCallback)
    }
  })
}

function runLoaders (options, finalCallback) {
  const { resource, loaders = [], context = {}, readResource } = options
  const loaderObjects = loaders.map(createLoaderObject)
  const loaderContext = context
  loaderContext.resource = resource
  loaderContext.readResource = readResource
  loaderContext.loaders = loaderObjects
  loaderContext.loaderIndex = 0
  loaderContext.callback = null
  loaderContext.async = null // 把同步改成异步

  Object.defineProperty(loaderContext, 'request', {
    get() {
      return loaderContext.loaders
        .map(loader => loader.path)
        .concat(loaderContext.resource)
        .join('!')
    }
  })
  Object.defineProperty(loaderContext, 'remainingRequest', {
    get() {
      return loaderContext.loaders
        .slice(loaderContext.loaderIndex + 1)
        .map(loader => loader.path)
        .concat(loaderContext.resource)
        .join('!')
    }
  })
  Object.defineProperty(loaderContext, 'currentRequest', {
    get() {
      return loaderContext.loaders
        .slice(loaderContext.loaderIndex)
        .map(loader => loader.path)
        .concat(loaderContext.resource)
        .join('!')
    }
  })
  Object.defineProperty(loaderContext, 'previousRequest', {
    get() {
      return loaderContext.loaders
        .slice(0, loaderContext.loaderIndex)
        .map(loader => loader.path)
        .join('!')
    }
  })
  Object.defineProperty(loaderContext, 'data', {
    get() {
      return loaderContext.loaders[loaderContext.loaderIndex].data
    }
  })
// console.log(loaderContext.request)
  const processOptions = {
    readResource,
    resourceBuffer: null
  }
  iteratePitchingLoaders(
    processOptions,
    loaderContext,
    (err, result) => {
      finalCallback(err, {
        result, // 最终的结果，就是最左侧loader返回的值
        resourceBuffer: processOptions.resourceBuffer
      })
    }
  )
}

exports.runLoaders = runLoaders