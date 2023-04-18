const { SyncWaterfallHook } = require('tapable')
const hook = new SyncWaterfallHook(['name', 'age'])

hook.tap('1', (name, age) => {
  console.log(1, name, age)
  return 'result1'
})
hook.tap('2', (name, age) => {
  console.log(2, name, age)
  return 'result2'
})
hook.tap('3', (name, age) => {
  console.log(3, name, age)
})
hook.tap('4', (name, age) => {
  console.log(3, name, age)
})

hook.call('zf', 18)