const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口点分割，在设置entry的时候可以指定多个入口，每个入口文件和它以来的模块都会成为一个代码块
  // 缺点 不够灵活 相同依赖会打包多分
  // entry: {
    // page1: './src/page1.js',
    // page2: './src/page2.js'
  // },
  entry: './src/index.js',
  output: {
    clean: true
  },
  devtool: false,
  mode: 'development',
  // module: {

  // },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
}