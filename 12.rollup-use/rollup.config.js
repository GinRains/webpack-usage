export default {
  entry: './src/main.js',
  output: {
    file: 'dist/bundle.cjs.js',
    format: 'es', // amd/es/iife/umd/cjs
    name: 'bundleName', // 当format格式为iife或umd时必须提供变量名
  },
}