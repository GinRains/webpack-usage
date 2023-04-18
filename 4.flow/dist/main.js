(() => {
  var webpackModules = {
    "./src/xx.baxx": (module) => {
      module.exports = "baxx//loader1//loader2";
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
  (() => {
    const title = webpackRequire("./src/xx.baxx");
    console.log("index", title);
  })();
})();
