const { AsyncSeriesBailHook } = require('tapable')
const facorize = new AsyncSeriesBailHook(['resolveData'])

facorize.tapAsync('externalFactory', (resolveData, callback) => {
  if(resolveData === 'jquery') {
    callback(null, {
      externalModule: {
        id: resolveData,
        type: '外部模块',
        source: 'window.$'
      }
    })
  } else {
    callback(null)
  }
})
facorize.tapAsync('normalModuleFactory', (resolveData, callback) => {
  let normalModule = {
    id: resolveData,
    type: '正常模块',
    source: '正常内容'
  }
  callback(null, normalModule)
})

facorize.callAsync('jquery', (err, module) => {
  console.log(module)
})
facorize.callAsync('lodash', (err, module) => {
  console.log(module)
})