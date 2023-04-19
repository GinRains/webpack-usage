class HookMap {
  constructor(factory) {
    this.factory = factory
    this.map = new Map()
  }
  get(key) {
    return this.map.get(key)
  }
  for(key) {
    const hook = this.get(key)
    if(hook) return hook
    let newHook = this.factory()
    this.map.set(key, newHook)
    return newHook
  }
}

module.exports = HookMap