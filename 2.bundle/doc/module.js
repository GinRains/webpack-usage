var modules = {
  './src/title.js': (module, exports, require) => {
    module.exports = 'title';
  }
};
function require(moduleId) {
  var module = {
    exports: {}
  };
  modules[moduleId](module, module.exports, require);
  return module.exports;
}
const title = require('./src/title.js');
console.log(title);