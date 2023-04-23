class Scope {
  constructor(options) {
    this.name = options.name
    this.parent = options.parent
    this.names = options.names || []
  }
  add(name) {
    this.names.push(name)
  }
  findDefiningScope(name) {
    if(this.names.includes(name)) {
      return this
    } else if(this.parent) {
      return this.parent.findDefiningScope(name)
    }
  }
}