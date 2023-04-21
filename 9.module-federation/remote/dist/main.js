(() => {
  var webpackModules = {
    "./src/index.js": (
      unusedWebpackModule,
      unusedWebpackExports,
      webpackRequire
    ) => {
      Promise.all([
        webpackRequire.e("webpack_sharing_consume_default_react_react"),
        webpackRequire.e("src_bootstrap_js"),
      ]).then(webpackRequire.bind(webpackRequire, "./src/bootstrap.js"));
    },
    "webpack/container/reference/host": (
      module,
      unusedWebpackExports,
      webpackRequire
    ) => {
      "use strict";
      var webpackError = new Error();
      module.exports = new Promise((resolve, reject) => {
        if (typeof host !== "undefined") return resolve();
        webpackRequire.l(
          "http://localhost:8000/remoteEntry.js",
          (event) => {
            if (typeof host !== "undefined") return resolve();
            var errorType =
              event && (event.type === "load" ? "missing" : event.type);
            var realSrc = event && event.target && event.target.src;
            webpackError.message =
              "Loading script failed.\n(" + errorType + ": " + realSrc + ")";
            webpackError.name = "ScriptExternalLoadError";
            webpackError.type = errorType;
            webpackError.request = realSrc;
            reject(webpackError);
          },
          "host"
        );
      }).then(() => host);
    },
  };
  var webpackModuleCache = {};
  function webpackRequire(moduleId) {
    var cachedModule = webpackModuleCache[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = (webpackModuleCache[moduleId] = {
      id: moduleId,
      loaded: false,
      exports: {},
    });
    webpackModules[moduleId](module, module.exports, webpackRequire);
    module.loaded = true;
    return module.exports;
  }
  webpackRequire.m = webpackModules;
  webpackRequire.c = webpackModuleCache;
  (() => {
    webpackRequire.n = (module) => {
      var getter =
        module && module.esmodule ? () => module["default"] : () => module;
      webpackRequire.d(getter, {
        a: getter,
      });
      return getter;
    };
  })();
  (() => {
    var getProto = Object.getPrototypeOf
      ? (obj) => Object.getPrototypeOf(obj)
      : (obj) => obj.proto;
    var leafPrototypes;
    webpackRequire.t = function (value, mode) {
      if (mode & 1) value = this(value);
      if (mode & 8) return value;
      if (typeof value === "object" && value) {
        if (mode & 4 && value.esmodule) return value;
        if (mode & 16 && typeof value.then === "function") return value;
      }
      var ns = Object.create(null);
      webpackRequire.r(ns);
      var def = {};
      leafPrototypes = leafPrototypes || [
        null,
        getProto({}),
        getProto([]),
        getProto(getProto),
      ];
      for (
        var current = mode & 2 && value;
        typeof current == "object" && !~leafPrototypes.indexOf(current);
        current = getProto(current)
      ) {
        Object.getOwnPropertyNames(current).forEach(
          (key) => (def[key] = () => value[key])
        );
      }
      def["default"] = () => value;
      webpackRequire.d(ns, def);
      return ns;
    };
  })();
  (() => {
    webpackRequire.d = (exports, definition) => {
      for (var key in definition) {
        if (
          webpackRequire.o(definition, key) &&
          !webpackRequire.o(exports, key)
        ) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
        }
      }
    };
  })();
  (() => {
    webpackRequire.f = {};
    webpackRequire.e = (chunkId) => {
      return Promise.all(
        Object.keys(webpackRequire.f).reduce((promises, key) => {
          webpackRequire.f[key](chunkId, promises);
          return promises;
        }, [])
      );
    };
  })();
  (() => {
    webpackRequire.u = (chunkId) => {
      return "" + chunkId + ".js";
    };
  })();
  (() => {
    webpackRequire.g = (function () {
      if (typeof globalThis === "object") return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if (typeof window === "object") return window;
      }
    })();
  })();
  (() => {
    webpackRequire.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
  })();
  (() => {
    var inProgress = {};
    var dataWebpackPrefix = "remote:";
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
          if (
            s.getAttribute("src") == url ||
            s.getAttribute("data-webpack") == dataWebpackPrefix + key
          ) {
            script = s;
            break;
          }
        }
      }
      if (!script) {
        needAttach = true;
        script = document.createElement("script");
        script.charset = "utf-8";
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
        doneFns && doneFns.forEach((fn) => fn(event));
        if (prev) return prev(event);
      };
      var timeout = setTimeout(
        onScriptComplete.bind(null, undefined, {
          type: "timeout",
          target: script,
        }),
        120000
      );
      script.onerror = onScriptComplete.bind(null, script.onerror);
      script.onload = onScriptComplete.bind(null, script.onload);
      needAttach && document.head.appendChild(script);
    };
  })();
  (() => {
    webpackRequire.r = (exports) => {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
      }
      Object.defineProperty(exports, "esmodule", {
        value: true,
      });
    };
  })();
  (() => {
    webpackRequire.nmd = (module) => {
      module.paths = [];
      if (!module.children) module.children = [];
      return module;
    };
  })();
  (() => {
    var chunkMapping = {
      webpack_container_remote_host_Sliders: [
        "webpack/container/remote/host/Sliders",
      ],
    };
    var idToExternalAndNameMapping = {
      "webpack/container/remote/host/Sliders": [
        "default",
        "./Sliders",
        "webpack/container/reference/host",
      ],
    };
    webpackRequire.f.remotes = (chunkId, promises) => {
      if (webpackRequire.o(chunkMapping, chunkId)) {
        chunkMapping[chunkId].forEach((id) => {
          var getScope = webpackRequire.R;
          if (!getScope) getScope = [];
          var data = idToExternalAndNameMapping[id];
          if (getScope.indexOf(data) >= 0) return;
          getScope.push(data);
          if (data.p) return promises.push(data.p);
          var onError = (error) => {
            if (!error) error = new Error("Container missing");
            if (typeof error.message === "string")
              error.message +=
                '\nwhile loading "' + data[1] + '" from ' + data[2];
            webpackRequire.m[id] = () => {
              throw error;
            };
            data.p = 0;
          };
          var handleFunction = (fn, arg1, arg2, d, next, first) => {
            try {
              var promise = fn(arg1, arg2);
              if (promise && promise.then) {
                var p = promise.then((result) => next(result, d), onError);
                if (first) promises.push((data.p = p));
                else return p;
              } else {
                return next(promise, d, first);
              }
            } catch (error) {
              onError(error);
            }
          };
          var onExternal = (external, _, first) =>
            external
              ? handleFunction(
                  webpackRequire.I,
                  data[0],
                  0,
                  external,
                  onInitialized,
                  first
                )
              : onError();
          var onInitialized = (_, external, first) =>
            handleFunction(
              external.get,
              data[1],
              getScope,
              0,
              onFactory,
              first
            );
          var onFactory = (factory) => {
            data.p = 1;
            webpackRequire.m[id] = (module) => {
              module.exports = factory();
            };
          };
          handleFunction(webpackRequire, data[2], 0, 0, onExternal, 1);
        });
      }
    };
  })();
  (() => {
    webpackRequire.S = {};
    var initPromises = {};
    var initTokens = {};
    webpackRequire.I = (name, initScope) => {
      if (!initScope) initScope = [];
      var initToken = initTokens[name];
      if (!initToken) initToken = initTokens[name] = {};
      if (initScope.indexOf(initToken) >= 0) return;
      initScope.push(initToken);
      if (initPromises[name]) return initPromises[name];
      if (!webpackRequire.o(webpackRequire.S, name))
        webpackRequire.S[name] = {};
      var scope = webpackRequire.S[name];
      var warn = (msg) =>
        typeof console !== "undefined" && console.warn && console.warn(msg);
      var uniqueName = "remote";
      var register = (name, version, factory, eager) => {
        var versions = (scope[name] = scope[name] || {});
        var activeVersion = versions[version];
        if (
          !activeVersion ||
          (!activeVersion.loaded &&
            (!eager != !activeVersion.eager
              ? eager
              : uniqueName > activeVersion.from))
        )
          versions[version] = {
            get: factory,
            from: uniqueName,
            eager: !!eager,
          };
      };
      var initExternal = (id) => {
        var handleError = (err) =>
          warn("Initialization of sharing external failed: " + err);
        try {
          var module = webpackRequire(id);
          if (!module) return;
          var initFn = (module) =>
            module &&
            module.init &&
            module.init(webpackRequire.S[name], initScope);
          if (module.then)
            return promises.push(module.then(initFn, handleError));
          var initResult = initFn(module);
          if (initResult && initResult.then)
            return promises.push(initResult["catch"](handleError));
        } catch (err) {
          handleError(err);
        }
      };
      var promises = [];
      switch (name) {
        case "default":
          {
            register("react-dom", "18.2.0", () =>
              Promise.all([
                webpackRequire.e("vendors-node_modules_react-dom_index_js"),
                webpackRequire.e("webpack_sharing_consume_default_react_react"),
              ]).then(
                () => () => webpackRequire("../node_modules/react-dom/index.js")
              )
            );
            register("react", "18.2.0", () =>
              webpackRequire
                .e("vendors-node_modules_react_index_js")
                .then(
                  () => () => webpackRequire("../node_modules/react/index.js")
                )
            );
            initExternal("webpack/container/reference/host");
          }
          break;
      }
      if (!promises.length) return (initPromises[name] = 1);
      return (initPromises[name] = Promise.all(promises).then(
        () => (initPromises[name] = 1)
      ));
    };
  })();
  (() => {
    var scriptUrl;
    if (webpackRequire.g.importScripts)
      scriptUrl = webpackRequire.g.location + "";
    var document = webpackRequire.g.document;
    if (!scriptUrl && document) {
      if (document.currentScript) scriptUrl = document.currentScript.src;
      if (!scriptUrl) {
        var scripts = document.getElementsByTagName("script");
        if (scripts.length) scriptUrl = scripts[scripts.length - 1].src;
      }
    }
    if (!scriptUrl)
      throw new Error("Automatic publicPath is not supported in this browser");
    scriptUrl = scriptUrl
      .replace(/#.*$/, "")
      .replace(/\?.*$/, "")
      .replace(/\/[^\/]+$/, "/");
    webpackRequire.p = scriptUrl;
  })();
  (() => {
    var parseVersion = (str) => {
      var p = (p) => {
          return p.split(".").map((p) => {
            return +p == p ? +p : p;
          });
        },
        n = /^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(str),
        r = n[1] ? p(n[1]) : [];
      return (
        n[2] && (r.length++, r.push.apply(r, p(n[2]))),
        n[3] && (r.push([]), r.push.apply(r, p(n[3]))),
        r
      );
    };
    var versionLt = (a, b) => {
      (a = parseVersion(a)), (b = parseVersion(b));
      for (var r = 0; ; ) {
        if (r >= a.length) return r < b.length && "u" != (typeof b[r])[0];
        var e = a[r],
          n = (typeof e)[0];
        if (r >= b.length) return "u" == n;
        var t = b[r],
          f = (typeof t)[0];
        if (n != f) return ("o" == n && "n" == f) || "s" == f || "u" == n;
        if ("o" != n && "u" != n && e != t) return e < t;
        r++;
      }
    };
    var rangeToString = (range) => {
      var r = range[0],
        n = "";
      if (1 === range.length) return "*";
      if (r + 0.5) {
        n +=
          0 == r
            ? ">="
            : -1 == r
            ? "<"
            : 1 == r
            ? "^"
            : 2 == r
            ? "~"
            : r > 0
            ? "="
            : "!=";
        for (var e = 1, a = 1; a < range.length; a++) {
          e--,
            (n +=
              "u" == (typeof (t = range[a]))[0]
                ? "-"
                : (e > 0 ? "." : "") + ((e = 2), t));
        }
        return n;
      }
      var g = [];
      for (a = 1; a < range.length; a++) {
        var t = range[a];
        g.push(
          0 === t
            ? "not(" + o() + ")"
            : 1 === t
            ? "(" + o() + " || " + o() + ")"
            : 2 === t
            ? g.pop() + " " + g.pop()
            : rangeToString(t)
        );
      }
      return o();
      function o() {
        return g.pop().replace(/^\((.+)\)$/, "$1");
      }
    };
    var satisfy = (range, version) => {
      if (0 in range) {
        version = parseVersion(version);
        var e = range[0],
          r = e < 0;
        r && (e = -e - 1);
        for (var n = 0, i = 1, a = !0; ; i++, n++) {
          var f,
            s,
            g = i < range.length ? (typeof range[i])[0] : "";
          if (n >= version.length || "o" == (s = (typeof (f = version[n]))[0]))
            return !a || ("u" == g ? i > e && !r : ("" == g) != r);
          if ("u" == s) {
            if (!a || "u" != g) return !1;
          } else if (a) {
            if (g == s) {
              if (i <= e) {
                if (f != range[i]) return !1;
              } else {
                if (r ? f > range[i] : f < range[i]) return !1;
                f != range[i] && (a = !1);
              }
            } else if ("s" != g && "n" != g) {
              if (r || i <= e) return !1;
              (a = !1), i--;
            } else {
              if (i <= e || s < g != r) return !1;
              a = !1;
            }
          } else "s" != g && "n" != g && ((a = !1), i--);
        }
      }
      var t = [],
        o = t.pop.bind(t);
      for (n = 1; n < range.length; n++) {
        var u = range[n];
        t.push(
          1 == u
            ? o() | o()
            : 2 == u
            ? o() & o()
            : u
            ? satisfy(u, version)
            : !o()
        );
      }
      return !!o();
    };
    var ensureExistence = (scopeName, key) => {
      var scope = webpackRequire.S[scopeName];
      if (!scope || !webpackRequire.o(scope, key))
        throw new Error(
          "Shared module " + key + " doesn't exist in shared scope " + scopeName
        );
      return scope;
    };
    var findVersion = (scope, key) => {
      var versions = scope[key];
      var key = Object.keys(versions).reduce((a, b) => {
        return !a || versionLt(a, b) ? b : a;
      }, 0);
      return key && versions[key];
    };
    var findSingletonVersionKey = (scope, key) => {
      var versions = scope[key];
      return Object.keys(versions).reduce((a, b) => {
        return !a || (!versions[a].loaded && versionLt(a, b)) ? b : a;
      }, 0);
    };
    var getInvalidSingletonVersionMessage = (
      scope,
      key,
      version,
      requiredVersion
    ) => {
      return (
        "Unsatisfied version " +
        version +
        " from " +
        (version && scope[key][version].from) +
        " of shared singleton module " +
        key +
        " (required " +
        rangeToString(requiredVersion) +
        ")"
      );
    };
    var getSingleton = (scope, scopeName, key, requiredVersion) => {
      var version = findSingletonVersionKey(scope, key);
      return get(scope[key][version]);
    };
    var getSingletonVersion = (scope, scopeName, key, requiredVersion) => {
      var version = findSingletonVersionKey(scope, key);
      if (!satisfy(requiredVersion, version))
        typeof console !== "undefined" &&
          console.warn &&
          console.warn(
            getInvalidSingletonVersionMessage(
              scope,
              key,
              version,
              requiredVersion
            )
          );
      return get(scope[key][version]);
    };
    var getStrictSingletonVersion = (
      scope,
      scopeName,
      key,
      requiredVersion
    ) => {
      var version = findSingletonVersionKey(scope, key);
      if (!satisfy(requiredVersion, version))
        throw new Error(
          getInvalidSingletonVersionMessage(
            scope,
            key,
            version,
            requiredVersion
          )
        );
      return get(scope[key][version]);
    };
    var findValidVersion = (scope, key, requiredVersion) => {
      var versions = scope[key];
      var key = Object.keys(versions).reduce((a, b) => {
        if (!satisfy(requiredVersion, b)) return a;
        return !a || versionLt(a, b) ? b : a;
      }, 0);
      return key && versions[key];
    };
    var getInvalidVersionMessage = (scope, scopeName, key, requiredVersion) => {
      var versions = scope[key];
      return (
        "No satisfying version (" +
        rangeToString(requiredVersion) +
        ") of shared module " +
        key +
        " found in shared scope " +
        scopeName +
        ".\n" +
        "Available versions: " +
        Object.keys(versions)
          .map((key) => {
            return key + " from " + versions[key].from;
          })
          .join(", ")
      );
    };
    var getValidVersion = (scope, scopeName, key, requiredVersion) => {
      var entry = findValidVersion(scope, key, requiredVersion);
      if (entry) return get(entry);
      throw new Error(
        getInvalidVersionMessage(scope, scopeName, key, requiredVersion)
      );
    };
    var warnInvalidVersion = (scope, scopeName, key, requiredVersion) => {
      typeof console !== "undefined" &&
        console.warn &&
        console.warn(
          getInvalidVersionMessage(scope, scopeName, key, requiredVersion)
        );
    };
    var get = (entry) => {
      entry.loaded = 1;
      return entry.get();
    };
    var init = (fn) =>
      function (scopeName, a, b, c) {
        var promise = webpackRequire.I(scopeName);
        if (promise && promise.then)
          return promise.then(
            fn.bind(fn, scopeName, webpackRequire.S[scopeName], a, b, c)
          );
        return fn(scopeName, webpackRequire.S[scopeName], a, b, c);
      };
    var load = init((scopeName, scope, key) => {
      ensureExistence(scopeName, key);
      return get(findVersion(scope, key));
    });
    var loadFallback = init((scopeName, scope, key, fallback) => {
      return scope && webpackRequire.o(scope, key)
        ? get(findVersion(scope, key))
        : fallback();
    });
    var loadVersionCheck = init((scopeName, scope, key, version) => {
      ensureExistence(scopeName, key);
      return get(
        findValidVersion(scope, key, version) ||
          warnInvalidVersion(scope, scopeName, key, version) ||
          findVersion(scope, key)
      );
    });
    var loadSingleton = init((scopeName, scope, key) => {
      ensureExistence(scopeName, key);
      return getSingleton(scope, scopeName, key);
    });
    var loadSingletonVersionCheck = init((scopeName, scope, key, version) => {
      ensureExistence(scopeName, key);
      return getSingletonVersion(scope, scopeName, key, version);
    });
    var loadStrictVersionCheck = init((scopeName, scope, key, version) => {
      ensureExistence(scopeName, key);
      return getValidVersion(scope, scopeName, key, version);
    });
    var loadStrictSingletonVersionCheck = init(
      (scopeName, scope, key, version) => {
        ensureExistence(scopeName, key);
        return getStrictSingletonVersion(scope, scopeName, key, version);
      }
    );
    var loadVersionCheckFallback = init(
      (scopeName, scope, key, version, fallback) => {
        if (!scope || !webpackRequire.o(scope, key)) return fallback();
        return get(
          findValidVersion(scope, key, version) ||
            warnInvalidVersion(scope, scopeName, key, version) ||
            findVersion(scope, key)
        );
      }
    );
    var loadSingletonFallback = init((scopeName, scope, key, fallback) => {
      if (!scope || !webpackRequire.o(scope, key)) return fallback();
      return getSingleton(scope, scopeName, key);
    });
    var loadSingletonVersionCheckFallback = init(
      (scopeName, scope, key, version, fallback) => {
        if (!scope || !webpackRequire.o(scope, key)) return fallback();
        return getSingletonVersion(scope, scopeName, key, version);
      }
    );
    var loadStrictVersionCheckFallback = init(
      (scopeName, scope, key, version, fallback) => {
        var entry =
          scope &&
          webpackRequire.o(scope, key) &&
          findValidVersion(scope, key, version);
        return entry ? get(entry) : fallback();
      }
    );
    var loadStrictSingletonVersionCheckFallback = init(
      (scopeName, scope, key, version, fallback) => {
        if (!scope || !webpackRequire.o(scope, key)) return fallback();
        return getStrictSingletonVersion(scope, scopeName, key, version);
      }
    );
    var installedModules = {};
    var moduleToHandlerMapping = {
      "webpack/sharing/consume/default/react/react": () =>
        loadSingletonVersionCheckFallback(
          "default",
          "react",
          [1, 18, 2, 0],
          () =>
            webpackRequire
              .e("vendors-node_modules_react_index_js")
              .then(
                () => () => webpackRequire("../node_modules/react/index.js")
              )
        ),
      "webpack/sharing/consume/default/react-dom/react-dom": () =>
        loadSingletonFallback("default", "react-dom", () =>
          webpackRequire
            .e("vendors-node_modules_react-dom_index_js")
            .then(
              () => () => webpackRequire("../node_modules/react-dom/index.js")
            )
        ),
    };
    var chunkMapping = {
      webpack_sharing_consume_default_react_react: [
        "webpack/sharing/consume/default/react/react",
      ],
      src_bootstrap_js: ["webpack/sharing/consume/default/react-dom/react-dom"],
    };
    webpackRequire.f.consumes = (chunkId, promises) => {
      if (webpackRequire.o(chunkMapping, chunkId)) {
        chunkMapping[chunkId].forEach((id) => {
          if (webpackRequire.o(installedModules, id))
            return promises.push(installedModules[id]);
          var onFactory = (factory) => {
            installedModules[id] = 0;
            webpackRequire.m[id] = (module) => {
              delete webpackRequire.c[id];
              module.exports = factory();
            };
          };
          var onError = (error) => {
            delete installedModules[id];
            webpackRequire.m[id] = (module) => {
              delete webpackRequire.c[id];
              throw error;
            };
          };
          try {
            var promise = moduleToHandlerMapping[id]();
            if (promise.then) {
              promises.push(
                (installedModules[id] = promise
                  .then(onFactory)
                  ["catch"](onError))
              );
            } else onFactory(promise);
          } catch (e) {
            onError(e);
          }
        });
      }
    };
  })();
  (() => {
    var installedChunks = {
      main: 0,
    };
    webpackRequire.f.j = (chunkId, promises) => {
      var installedChunkData = webpackRequire.o(installedChunks, chunkId)
        ? installedChunks[chunkId]
        : undefined;
      if (installedChunkData !== 0) {
        if (installedChunkData) {
          promises.push(installedChunkData[2]);
        } else {
          if (
            /^(vendors\-node_modules_react(|\-dom)_index_js|main|src_bootstrap_js)$/.test(
              chunkId
            )
          ) {
            var promise = new Promise(
              (resolve, reject) =>
                (installedChunkData = installedChunks[chunkId] =
                  [resolve, reject])
            );
            promises.push((installedChunkData[2] = promise));
            var url = webpackRequire.p + webpackRequire.u(chunkId);
            var error = new Error();
            var loadingEnded = (event) => {
              if (webpackRequire.o(installedChunks, chunkId)) {
                installedChunkData = installedChunks[chunkId];
                if (installedChunkData !== 0)
                  installedChunks[chunkId] = undefined;
                if (installedChunkData) {
                  var errorType =
                    event && (event.type === "load" ? "missing" : event.type);
                  var realSrc = event && event.target && event.target.src;
                  error.message =
                    "Loading chunk " +
                    chunkId +
                    " failed.\n(" +
                    errorType +
                    ": " +
                    realSrc +
                    ")";
                  error.name = "ChunkLoadError";
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
    var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      var [chunkIds, moreModules, runtime] = data;
      var moduleId,
        chunkId,
        i = 0;
      if (chunkIds.some((id) => installedChunks[id] !== 0)) {
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
        if (
          webpackRequire.o(installedChunks, chunkId) &&
          installedChunks[chunkId]
        ) {
          installedChunks[chunkId][0]();
        }
        installedChunks[chunkId] = 0;
      }
    };
    var chunkLoadingGlobal = (self["webpackChunkremote"] =
      self["webpackChunkremote"] || []);
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(
      null,
      chunkLoadingGlobal.push.bind(chunkLoadingGlobal)
    );
  })();
  var webpackExports = webpackRequire("./src/index.js");
})();
