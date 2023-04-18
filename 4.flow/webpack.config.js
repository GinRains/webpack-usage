const path = require('path')
const RunPlugin = require('./plugins/run-plugin')
const DonePlugin = require('./plugins/done-plugin')

module.exports = {
  entry: {
    entry1: './src/entry1.js',
    entry2: './src/entry2.js',
  },
  devtool: false,
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  resolve: ['.js', '.jsx', '.ts', '.tsx'],
  module: {
    rules: [
      {
        test: /\.baxx$/,
        use: [
          // 最左侧的loader需要返回合法的js代码
          path.resolve(__dirname, 'loaders/loader2.js'),
          // 最右侧的loader拿到的是源代码
          path.resolve(__dirname, 'loaders/loader1.js')
        ]
      }
    ]
  },
  plugins: [
    new DonePlugin(),
    new RunPlugin(),
  ]
}