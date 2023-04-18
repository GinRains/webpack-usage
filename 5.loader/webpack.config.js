const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * 配置自定义的loader有以下几种
 * 1，配置绝对路径
 * 2，配置resolveLoader中的alias
 * 3，如果loader很多，配置resolveLoader中的modules
 */
module.exports = {
  // entry: './src/index.js',
  entry: './src/less.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  devtool: false,
  mode: 'development',
  resolveLoader: {
    // alias: {
    //   'babel-loader': path.resolve(__dirname, 'loaders/babel-loader.js') // 第二种
    // }
    modules: [path.resolve('loaders'), 'node_modules'] // 第三种 先找根目录loaders文件夹下的loader,如果找不到再找node_modules下的loader
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "less-loader"
        ]
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // loader: path.resolve(__dirname, 'loaders/babel-loader.js'), // 第一种
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}