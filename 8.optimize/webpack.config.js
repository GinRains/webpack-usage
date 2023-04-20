const path = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const bootstrap = path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const smw = new SpeedMeasureWebpackPlugin()
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 压缩插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const HashPlugin = require('./plugins/hash-plugin.js')

module.exports = {
  mode: 'development', // 如果是production，会自动启用压缩插件，如果为none，表示不启用压缩插件
  devtool: false,
  entry: {
    main: './src/index.js',
    // vendor: ['lodash'] // 把第三方模块单独打包，我们希望长期缓存
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[contenthash:8].js',
    // library: 'calculator',
    // libraryTarget: 'umd',
    clean: true
  },
  resolve: { // 配置如何查找源代码中引入的模块
    extensions: ['.js'],
    alias: {
      // bootstrap
    },
    modules: ['my_modules', 'node_modules'],
    mainFields: ['style', 'main'], // 更改 package.json 的入口, 先找 style 入口，如果没有的话，再找main入口
    mainFiles: ['style.js', 'index.js']
  },
  resolveLoader: { // 配置如何查找loader，配置跟resolve一样
    extensions: ['.js'],
    alias: {
      // bootstrap
    },
    modules: ['my_modules', 'node_modules'],
    // mainFields: ['style', 'main'], // 更改 package.json 的入口, 先找 style 入口，如果没有的话，再找main入口
    // mainFiles: ['style.js', 'index.js']
  },
  module: {
    // 不解析这些模块
    noParse: /jquery|lodash/,
    noParse: (content) => /jquery|lodash/.test(content),
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader, // 提取css文件
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|bmp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[contenthash:8][ext]'
        }
      }
    ]
  },
  optimization: {
    // moduleIds: 'natural',
    // chunkIds: 'natural',
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
  },
  // optimization: {
  //   minimize: true, // 启用压缩
  //   minimizer: [new TerserPlugin()] // 压缩js代码
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // minify: { // 压缩html
      //   removeComments: true,
      //   collapseWhitespace: true
      // }
    }),
    new Webpack.IgnorePlugin({ // 不打包 moment 包下面的 locale 目录，如果在项目中引入了 locale 下中文包，他只会打包locale下的中文文件，不打包除中文以外的文件
      contextRegExp: /moment$/,
      resourceRegExp: /locale/,
    }),
    // new BundleAnalyzerPlugin()
    new MiniCssExtractPlugin({ // 提取css文件
      filename: 'style/[name].[contenthash:8].css'
    }),
    // new OptimizeCssAssetsWebpackPlugin(), // 压缩css
    // new HashPlugin()
  ]
}