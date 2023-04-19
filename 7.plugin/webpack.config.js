const path = require('path')
const DonePlugin = require('./plugins/done-plugin')
const ArchivePlugin = require('./plugins/archive-plugin')
const AutoExternalPlugin = require('./plugins/auto-external-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true
  },
  // externals: {
  //   'jquery': '$', // 当引入jquery的时候，不要去node_modules去找，去找window.$
  //   'lodash': '_'
  // },
  plugins: [
    // new DonePlugin(),
    // new ArchivePlugin()
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    new AutoExternalPlugin({
      jquery: {
        variable: '$',
        url: 'https://cdn.bootcss.com/jquery/3.1.0/jquery.js'
      },
      lodash: {
        variable: '_',
        url: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js'
      }
    })
  ]
}