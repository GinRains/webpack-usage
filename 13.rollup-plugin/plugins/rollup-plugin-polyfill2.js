function polyfill() {
  return {
    name: 'polyfill2',
    async transform(code, id) {
      return `
        console.log('polyfill2')
        ${code}
      `
      console.log(code, id)
    }
  }
}

export default polyfill