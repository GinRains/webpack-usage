// const webpack = require('webpack')
const webpack = require('./webpack')
const webpackConfig = require('./webpack.config')

const compiler = webpack(webpackConfig)
// 4. 执行对象的 run 方法开始执行编译
compiler.run((err, stats) => {
  if(err) {
    console.log(err)
  } else {
    // console.log(stats.toJson({
    //   assets: true, // 打包后生成的文件
    //   chunks: true,
    //   modules: true
    // }))
  }
})