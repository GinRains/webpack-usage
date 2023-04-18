var webpackModules = {
  "./src/title.js": function (module) {
    module.exports = {
      title: "title",
      age: "age",
    };
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
webpackRequire.n = function (module) {
  var getter =
    module && module.esmodule
      ? function () {
          return module["default"];
        }
      : function () {
          return module;
        };
  webpackRequire.d(getter, {
    a: getter,
  });
  return getter;
};
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
("use strict");
webpackRequire.r(webpackExports);
var _titlewebpackImportedModule0 = webpackRequire("./src/title.js");
var _titlewebpackImportedModule0_Default = webpackRequire.n(
  _titlewebpackImportedModule0
);
console.log(_titlewebpackImportedModule0.title);
console.log(_titlewebpackImportedModule0.age);
console.log(_titlewebpackImportedModule0_Default());
