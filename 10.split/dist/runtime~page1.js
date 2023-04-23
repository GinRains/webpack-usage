(() => {
  "use strict";
  var webpackModules = {};
  var webpackModuleCache = {};
  function webpackRequire(moduleId) {
    var cachedModule = webpackModuleCache[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = webpackModuleCache[moduleId] = {
      id: moduleId,
      loaded: false,
      exports: {}
    };
    webpackModules[moduleId].call(module.exports, module, module.exports, webpackRequire);
    module.loaded = true;
    return module.exports;
  }
  webpackRequire.m = webpackModules;
  (() => {
    var deferred = [];
    webpackRequire.O = (result, chunkIds, fn, priority) => {
      if (chunkIds) {
        priority = priority || 0;
        for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
        deferred[i] = [chunkIds, fn, priority];
        return;
      }
      var notFulfilled = Infinity;
      for (var i = 0; i < deferred.length; i++) {
        var [chunkIds, fn, priority] = deferred[i];
        var fulfilled = true;
        for (var j = 0; j < chunkIds.length; j++) {
          if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(webpackRequire.O).every(key => webpackRequire.O[key](chunkIds[j]))) {
            chunkIds.splice(j--, 1);
          } else {
            fulfilled = false;
            if (priority < notFulfilled) notFulfilled = priority;
          }
        }
        if (fulfilled) {
          deferred.splice(i--, 1);
          var r = fn();
          if (r !== undefined) result = r;
        }
      }
      return result;
    };
  })();
  (() => {
    webpackRequire.n = module => {
      var getter = module && module.esmodule ? () => module['default'] : () => module;
      webpackRequire.d(getter, {
        a: getter
      });
      return getter;
    };
  })();
  (() => {
    webpackRequire.d = (exports, definition) => {
      for (var key in definition) {
        if (webpackRequire.o(definition, key) && !webpackRequire.o(exports, key)) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key]
          });
        }
      }
    };
  })();
  (() => {
    webpackRequire.f = {};
    webpackRequire.e = chunkId => {
      return Promise.all(Object.keys(webpackRequire.f).reduce((promises, key) => {
        webpackRequire.f[key](chunkId, promises);
        return promises;
      }, []));
    };
  })();
  (() => {
    webpackRequire.u = chunkId => {
      return "" + chunkId + ".js";
    };
  })();
  (() => {
    webpackRequire.g = function () {
      if (typeof globalThis === 'object') return globalThis;
      try {
        return this || new Function('return this')();
      } catch (e) {
        if (typeof window === 'object') return window;
      }
    }();
  })();
  (() => {
    webpackRequire.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
  })();
  (() => {
    var inProgress = {};
    var dataWebpackPrefix = "10.split:";
    webpackRequire.l = (url, done, key, chunkId) => {
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
      var onScriptComplete = (prev, event) => {
        script.onerror = script.onload = null;
        clearTimeout(timeout);
        var doneFns = inProgress[url];
        delete inProgress[url];
        script.parentNode && script.parentNode.removeChild(script);
        doneFns && doneFns.forEach(fn => fn(event));
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
  })();
  (() => {
    webpackRequire.r = exports => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
      }
      Object.defineProperty(exports, 'esmodule', {
        value: true
      });
    };
  })();
  (() => {
    webpackRequire.nmd = module => {
      module.paths = [];
      if (!module.children) module.children = [];
      return module;
    };
  })();
  (() => {
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
  })();
  (() => {
    var installedChunks = {
      "runtime~page1": 0
    };
    webpackRequire.f.j = (chunkId, promises) => {
      var installedChunkData = webpackRequire.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
      if (installedChunkData !== 0) {
        if (installedChunkData) {
          promises.push(installedChunkData[2]);
        } else {
          if ("runtime~page1" != chunkId) {
            var promise = new Promise((resolve, reject) => installedChunkData = installedChunks[chunkId] = [resolve, reject]);
            promises.push(installedChunkData[2] = promise);
            var url = webpackRequire.p + webpackRequire.u(chunkId);
            var error = new Error();
            var loadingEnded = event => {
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
    webpackRequire.O.j = chunkId => installedChunks[chunkId] === 0;
    var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      var [chunkIds, moreModules, runtime] = data;
      var moduleId,
          chunkId,
          i = 0;
      if (chunkIds.some(id => installedChunks[id] !== 0)) {
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
      return webpackRequire.O(result);
    };
    var chunkLoadingGlobal = self["webpackChunk_10_split"] = self["webpackChunk_10_split"] || [];
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
  })();
})();