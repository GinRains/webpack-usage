import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import serve from 'rollup-plugin-serve'

export default {
  // input: 'src/main.js',
  input: 'src/main.ts',
  output: {
    file: 'dist/bundle.cjs.js',
    format: 'cjs', // amd/es/iife/umd/cjs
    name: 'bundleName', // 当format格式为iife或umd时必须提供变量名
    globals: {
      lodash: '_',
      jquery: '$'
    }
  },
  external: ['lodash', 'jquery'],
  plugins: [
    babel({
      exclude: /node_modules/
    }),
    nodeResolve(), // 可以解析node_modules里的模块
    commonjs(), // 解析commonjs语法
    typescript(),
    // terser(), // 压缩js
    postcss(),
    serve({
      open: true,
      port: 8080,
      contentBase: './dist'
    })
  ]
}