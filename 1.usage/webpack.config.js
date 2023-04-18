const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(process.env.NODE_ENV);

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true
  },
  devServer: {
    port: 8088,
    open: true,
    static: path.resolve(__dirname, 'public'),
    // 当你有一个后台接口API
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {
    //       '^/api': '',
    //       '^/home/api': '/home'
    //     }
    //   }
    // },
    // 没有后台接口，走mock功能
    onBeforeSetupMiddleware(devServer) {
      devServer.app.get('/users', (req, res) => {
        res.json({
          id: 1,
          name: 'hashiqi'
        })
      })
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: { fix: true },
        enforce: 'pre'
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }], // 装饰器
              ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
              ["@babel/plugin-proposal-private-methods", { "loose": true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {
          filename: 'png/[hash][ext]'
        }
      },
      {
        test: /\.ico$/, // ico变成base64返回
        type: 'asset/inline'
      },
      {
        test: /\.txt$/, // ico变成base64返回
        type: 'asset/source'
      },
      {
        test: /\.jpg$/, // ico变成base64返回
        type: 'asset', // 表示可以根据实际情况选择使用 asset/resource 还是 asset/inline
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 小于 4k 走inline
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html'}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV2': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
