const glob = require('fast-glob')

;(async function () {
  const entries = await glob(["**/*.js"])
  console.log(entries)
})()