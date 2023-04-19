const { SyncHook } = require('./tapable')
const syncHook = new SyncHook(['name', 'age'])

syncHook.tap({ name: 'tap1' }, () => {
  console.log('tap1')
})
syncHook.tap({ name: 'tap3' }, () => {
  console.log('tap3')
})
syncHook.tap({ name: 'tap5' }, () => {
  console.log('tap5')
})
syncHook.tap({ name: 'tap2', before: ['tap3', 'tap5'] }, () => {
  console.log('tap2')
})

syncHook.call('fe', 18)