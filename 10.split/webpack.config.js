const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')
const PreloadWebpackPlugin = require('./plugins/preload-webpack-plugin')
const AssetWebpackPlugin = require('./plugins/asset-webpack-plugin')

module.exports = {
  // 入口点分割，在设置entry的时候可以指定多个入口，每个入口文件和它以来的模块都会成为一个代码块
  // 缺点 不够灵活 相同依赖会打包多分
  entry: {
    page1: './src/page1.js',
    page2: './src/page2.js',
    page3: './src/page3.js'
  },
  // entry: './src/index.js',
  output: {
    clean: true
  },
  devtool: false,
  mode: 'development',
  optimization: {
    // 指定代码块的分割方式  表示选择哪些代码块进行分割，async  initial  all
    splitChunks: {
      chunks: 'all',
      minSize: 0, // 最小体积
      // maxSize: 0,
      // 加载入口文件时，并行请求的最大数量，默认为5
      maxInitialRequests: 3, // 一个模块最多拆成3个包
      // 按需加载文件时，并行请求的最大数量，默认为3
      maxAsyncRequests: 3,
      // minChunks: 2, // 表示一个模块被多少个入口引入才会进行提取

      cacheGroups: {
        defaultVendors: {
          test: /node_modules/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20
        },
        // xxx: {
        //   test: /module3/
        // }
      }
    },
    runtimeChunk: true // 运行时代码是一个工具代码，跟业务无关，它始终不变
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'page1.html',
      chunks: ['page1']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'page2.html',
      chunks: ['page2']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'page3.html',
      chunks: ['page3']
    }),
    // new PreloadWebpackPlugin()
    new AssetWebpackPlugin()
  ]
}