class SyncHook {
  taps = []
  tap(name, fn) {
    this.taps.push(fn)
  }
  call() {
    this.taps.forEach(tap => tap())
  }
}
let runHook = new SyncHook()

class RunPlugin {
  apply() {
    runHook.tap('1', () => {
      console.log('1')
    })
  }
}

let runPlugin = new RunPlugin()
runPlugin.apply()
runHook.call()