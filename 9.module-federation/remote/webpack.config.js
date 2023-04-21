const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/index.js',
  output: {
    // publicPath: 'http://localhost:3000'
  },
  devServer: {
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new ModuleFederationPlugin({
      filename: 'remoteEntry.js', // 向主机提供服务的文件名
      name: 'remote', // 输出的模块名
      exposes: {
        './NewsList': './src/NewsList.js', // 被远程引用时可暴露的资源路径及别名
        './Banner': './src/Banner.js',
      },
      remotes: {
        host: 'host@http://localhost:8000/remoteEntry.js'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true }
      }
    })
  ]
}