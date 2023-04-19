const path = require('path')
const DonePlugin = require('./plugins/done-plugin')
const ArchivePlugin = require('./plugins/archive-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: false,
  plugins: [
    new DonePlugin(),
    new ArchivePlugin()
  ]
}