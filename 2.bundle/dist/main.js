(function () {
  var webpackModules = {};
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
  webpackRequire.m = webpackModules;
  !function () {
    webpackRequire.f = {};
    webpackRequire.e = function (chunkId) {
      return Promise.all(Object.keys(webpackRequire.f).reduce(function (promises, key) {
        webpackRequire.f[key](chunkId, promises);
        return promises;
      }, []));
    };
  }();
  !function () {
    webpackRequire.u = function (chunkId) {
      return "" + chunkId + ".main.js";
    };
  }();
  !function () {
    webpackRequire.g = function () {
      if (typeof globalThis === 'object') return globalThis;
      try {
        return this || new Function('return this')();
      } catch (e) {
        if (typeof window === 'object') return window;
      }
    }();
  }();
  !function () {
    webpackRequire.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
  }();
  !function () {
    var inProgress = {};
    var dataWebpackPrefix = "1.usage:";
    webpackRequire.l = function (url, done, key, chunkId) {
      if (inProgress[url]) {
        inProgress[url].push(done);
        return;
      }
      var script, needAttach;
      if (key !== undefined) {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
          var s = scripts[i];
          if (s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) {
            script = s;
            break;
          }
        }
      }
      if (!script) {
        needAttach = true;
        script = document.createElement('script');
        script.charset = 'utf-8';
        script.timeout = 120;
        if (webpackRequire.nc) {
          script.setAttribute("nonce", webpackRequire.nc);
        }
        script.setAttribute("data-webpack", dataWebpackPrefix + key);
        script.src = url;
      }
      inProgress[url] = [done];
      var onScriptComplete = function (prev, event) {
        script.onerror = script.onload = null;
        clearTimeout(timeout);
        var doneFns = inProgress[url];
        delete inProgress[url];
        script.parentNode && script.parentNode.removeChild(script);
        doneFns && doneFns.forEach(function (fn) {
          return fn(event);
        });
        if (prev) return prev(event);
      };
      var timeout = setTimeout(onScriptComplete.bind(null, undefined, {
        type: 'timeout',
        target: script
      }), 120000);
      script.onerror = onScriptComplete.bind(null, script.onerror);
      script.onload = onScriptComplete.bind(null, script.onload);
      needAttach && document.head.appendChild(script);
    };
  }();
  !function () {
    webpackRequire.r = function (exports) {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
      }
      Object.defineProperty(exports, 'esmodule', {
        value: true
      });
    };
  }();
  !function () {
    var scriptUrl;
    if (webpackRequire.g.importScripts) scriptUrl = webpackRequire.g.location + "";
    var document = webpackRequire.g.document;
    if (!scriptUrl && document) {
      if (document.currentScript) scriptUrl = document.currentScript.src;
      if (!scriptUrl) {
        var scripts = document.getElementsByTagName("script");
        if (scripts.length) scriptUrl = scripts[scripts.length - 1].src;
      }
    }
    if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
    scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
    webpackRequire.p = scriptUrl;
  }();
  !function () {
    var installedChunks = {
      "main": 0
    };
    webpackRequire.f.j = function (chunkId, promises) {
      var installedChunkData = webpackRequire.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
      if (installedChunkData !== 0) {
        if (installedChunkData) {
          promises.push(installedChunkData[2]);
        } else {
          if (true) {
            var promise = new Promise(function (resolve, reject) {
              installedChunkData = installedChunks[chunkId] = [resolve, reject];
            });
            promises.push(installedChunkData[2] = promise);
            var url = webpackRequire.p + webpackRequire.u(chunkId);
            var error = new Error();
            var loadingEnded = function (event) {
              if (webpackRequire.o(installedChunks, chunkId)) {
                installedChunkData = installedChunks[chunkId];
                if (installedChunkData !== 0) installedChunks[chunkId] = undefined;
                if (installedChunkData) {
                  var errorType = event && (event.type === 'load' ? 'missing' : event.type);
                  var realSrc = event && event.target && event.target.src;
                  error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
                  error.name = 'ChunkLoadError';
                  error.type = errorType;
                  error.request = realSrc;
                  installedChunkData[1](error);
                }
              }
            };
            webpackRequire.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
          } else installedChunks[chunkId] = 0;
        }
      }
    };
    var webpackJsonpCallback = function (parentChunkLoadingFunction, data) {
      var chunkIds = data[0];
      var moreModules = data[1];
      var runtime = data[2];
      var moduleId,
          chunkId,
          i = 0;
      if (chunkIds.some(function (id) {
        return installedChunks[id] !== 0;
      })) {
        for (moduleId in moreModules) {
          if (webpackRequire.o(moreModules, moduleId)) {
            webpackRequire.m[moduleId] = moreModules[moduleId];
          }
        }
        if (runtime) var result = runtime(webpackRequire);
      }
      if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if (webpackRequire.o(installedChunks, chunkId) && installedChunks[chunkId]) {
          installedChunks[chunkId][0]();
        }
        installedChunks[chunkId] = 0;
      }
    };
    var chunkLoadingGlobal = self["webpackChunk_1_usage"] = self["webpackChunk_1_usage"] || [];
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
  }();
  var webpackExports = {};
  webpackRequire.e("src_hello_js").then(webpackRequire.bind(webpackRequire, "./src/hello.js")).then(res => {
    console.log(res.default);
  });
})();