// tapAsync
function anonymous(name, age, _callback) {
  var _context;
  var _x = this._x;
  var _counter = 3;
  var _done = function () {
    _callback();
  };
  var _fn0 = _x[0];
  _fn0(name, age, function (_err0) {
    if (--_counter === 0) _done();
  });
  var _fn1 = _x[1];
  _fn1(name, age, function (_err1) {
    if (--_counter === 0) _done();
  });
  var _fn2 = _x[2];
  _fn2(name, age, function (_err2) {
    if (--_counter === 0) _done();
  });
}

// tapPromise
function anonymous(name, age) {
  var _x = this._x;
  return new Promise(function (_resolve, _reject) {
    var _sync = true;
    var _counter = 3;
    var _done = function () {
      _resolve();
    };
    var _fn0 = _x[0];
    var _promise0 = _fn0(name, age);
    _promise0.then(function (_result0) {
      if (--_counter === 0) _done();
    });
    var _fn1 = _x[1];
    var _hasResult1 = false;
    var _promise1 = _fn1(name, age);
    if (!_promise1 || !_promise1.then)
      throw new Error(
        "Tap function (tapPromise) did not return promise (returned " +
          _promise1 +
          ")"
      );
    _promise1.then(
      function (_result1) {
        _hasResult1 = true;
        if (--_counter === 0) _done();
      },
      function (_err1) {
        if (_hasResult1) throw _err1;
        if (_counter > 0) {
          _error(_err1);
          _counter = 0;
        }
      }
    );
    var _fn2 = _x[2];
    var _hasResult2 = false;
    var _promise2 = _fn2(name, age);
    if (!_promise2 || !_promise2.then)
      throw new Error(
        "Tap function (tapPromise) did not return promise (returned " +
          _promise2 +
          ")"
      );
    _promise2.then(
      function (_result2) {
        _hasResult2 = true;
        if (--_counter === 0) _done();
      },
      function (_err2) {
        if (_hasResult2) throw _err2;
        if (_counter > 0) {
          _error(_err2);
          _counter = 0;
        }
      }
    );
    _sync = false;
  });
}

// 混用
function anonymous(name, age, _callback) {
  var _x = this._x;
  var _counter = 3;
  var _done = function () {
    _callback();
  };
  var _fn0 = _x[0];
  _fn0(name, age);

  var _fn1 = _x[1];
  _fn1(name, age, function (_err1) {
    if (--_counter === 0) _done();
  });

  var _fn2 = _x[2];
  var _promise2 = _fn2(name, age);
  _promise2.then(function (_result2) {
    if (--_counter === 0) _done();
  });
}
