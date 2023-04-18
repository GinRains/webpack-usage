// import value, { title, age } from './title'

// console.log(title)
// console.log(age)
// console.log(value)

// const age = require('./age')

// setTimeout(() => {
//   console.log(age.value)
// }, 3000)

// 异步加载
import('./hello.js').then(res => {
  console.log(res.default)
})