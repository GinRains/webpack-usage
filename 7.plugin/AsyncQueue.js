// AsyncQueue 可以实现异步并行执行任务
// const AsyncQueue = require('webpack/lib/util/AsyncQueue')
const AsyncQueue = require('./AsyncQueue/index')

const getKey = (module) => module.key
const processor = (module, callback) => {
  setTimeout(() => {
    console.log('process', module)
    callback(null, module)
  }, 3000)
}
let queue = new AsyncQueue({
  name: '创建模块队列',
  processor,
  getKey,
  parallelism: 3
})

const start = Date.now()
queue.add({ key: 'module1' }, (err, result) => {
  console.log(err, result)
  console.log((Date.now() - start) / 1000)
})
queue.add({ key: 'module2' }, (err, result) => {
  console.log(err, result)
  console.log((Date.now() - start) / 1000)
})
queue.add({ key: 'module3' }, (err, result) => {
  console.log(err, result)
  console.log((Date.now() - start) / 1000)
})
queue.add({ key: 'module1' }, (err, result) => {
  console.log(err, result)
  console.log((Date.now() - start) / 1000)
})
queue.add({ key: 'module4' }, (err, result) => {
  console.log(err, result)
  console.log((Date.now() - start) / 1000)
})
queue.add({ key: 'module5' }, (err, result) => {
  console.log(err, result)
  console.log((Date.now() - start) / 1000)
})