(() => {
  var webpackModules = {
    "./loaders/less-loader.js!./src/index.less": module => {
      module.exports = "#root {\n  color: red;\n}\n";
    },
    "./src/index.less": (unusedWebpackModule, unusedWebpackExports, webpackRequire) => {
      let styleCSS = webpackRequire("./loaders/less-loader.js!./src/index.less");
      let style = document.createElement('style');
      style.innerHTML = styleCSS;
      document.head.appendChild(style);
    }
  };
  var webpackModuleCache = {};
  function webpackRequire(moduleId) {
    var cachedModule = webpackModuleCache[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = webpackModuleCache[moduleId] = {
      exports: {}
    };
    webpackModules[moduleId](module, module.exports, webpackRequire);
    return module.exports;
  }
  var webpackExports = {};
  (() => {
    "use strict";
    webpackRequire("./src/index.less");
  })();
})();