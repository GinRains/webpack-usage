var webpackModules = {
  "./src/title.js": function (unusedWebpackModule, exports) {
    exports.name = "title_name";
    exports.age = "title_age";
  },
};
var webpackModuleCache = {};
function webpackRequire(moduleId) {
  var cachedModule = webpackModuleCache[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  var module = (webpackModuleCache[moduleId] = {
    exports: {},
  });
  webpackModules[moduleId](module, module.exports, webpackRequire);
  return module.exports;
}
var webpackExports = {};
const title = webpackRequire("./src/title.js");
console.log(title);
