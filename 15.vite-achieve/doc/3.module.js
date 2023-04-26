const { init, parse } = require('es-module-lexer');

(async () => {
  const source = `import _ from 'lodash';\nexport var age = 15;`
  await init
  const result = parse(source)
  console.log(result)
})()