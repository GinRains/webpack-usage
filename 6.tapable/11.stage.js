const { SyncHook } = require('tapable')
const syncHook = new SyncHook(['name', 'age'])

syncHook.tap({ name: 'tap1', stage: 1 }, () => {
  console.log('tap1')
})
syncHook.tap({ name: 'tap3', stage: 3 }, () => {
  console.log('tap3')
})
syncHook.tap({ name: 'tap5', stage: 5 }, () => {
  console.log('tap5')
})
syncHook.tap({ name: 'tap2', stage: 2 }, () => {
  console.log('tap2')
})

syncHook.call('as', 18)