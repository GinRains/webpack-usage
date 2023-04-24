const Bundle = require('./bundle')

/**
 * 打包入口文件，把结果输出到output目录
 * @param {*} entry 
 * @param {*} output 
 */
function rollup(entry, output) {
  const bundle = new Bundle({ entry })
  bundle.build(output)
}

module.exports = rollup