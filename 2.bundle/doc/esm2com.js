var webpackModules = {
  "./src/title.js": function (
    unusedWebpackModule,
    webpackExports,
    webpackRequire
  ) {
    "use strict";
    webpackRequire.r(webpackExports);
    webpackRequire.d(webpackExports, {
      age: function () {
        return age;
      },
    });
    webpackExports["default"] = "title_name";
    const age = "title_age";
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
webpackRequire.d = function (exports, definition) {
  for (var key in definition) {
    if (webpackRequire.o(definition, key) && !webpackRequire.o(exports, key)) {
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: definition[key],
      });
    }
  }
};
webpackRequire.o = function (obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
webpackRequire.r = function (exports) {
  if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
    Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module",
    });
  }
  Object.defineProperty(exports, "esmodule", {
    value: true,
  });
};
var webpackExports = {};
const title = webpackRequire("./src/title.js");
console.log(title.default);
console.log(title.age);
