// import './polyfill'

// console.log('main')

// let sum = (a, b) => a + b

// console.log(sum(3, 5))

// let a = 234
// console.log(a)

// import('./polyfill').then((res) => res)

// function dynamicImportPolyfill(filename, url) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.type = "module";
//     script.onload = () => {
//       resolve(window.mod);
//     };
//     const absURL = new URL(filename, url).href;
//     console.log(absURL);
//     const blob = new Blob([
//       `import * as mod from "${absURL}";`,
//       ` window.mod = mod;`], { type: "text/javascript" });
//     script.src = URL.createObjectURL(blob);
//     document.head.appendChild(script);
//   });
// }

import logger from 'logger'
console.log(logger, import.meta)