/*
  按需加载原理
  import flatten from 'lodash/flatten'
  import concat from 'lodash/concat'
*/

import { flatten, concat } from 'lodash'

console.log(flatten([1, [2, 3]]))
console.log(concat([1,2,3]))