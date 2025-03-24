'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var reactNative = require('react-native');

function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}

var GROUPLISTENER = 'groupListener';
var HARDWAREUPGRADELISTENER = 'hardwareUpgradeListener';
var DEVLISTENER = 'devListener';
var SUBDEVLISTENER = 'subDevListener';
var HOMESTATUS = 'homeStatus';
var HOMECHANGE = 'homeChange';
var SINGLETRANSFER = 'SingleTransfer';
var eventEmitter = /*#__PURE__*/new reactNative.NativeEventEmitter(reactNative.NativeModules.TuyaRNEventEmitter);
function addEvent(eventName, callback) {
  return eventEmitter.addListener(eventName, callback);
}
var bridge = function bridge(key, id) {
  return key + "//" + id;
};
/*
 * On iOS home devices list has differences in structure, soo need to make it same as on android
 * */
var prepareDeviceBean = function prepareDeviceBean(device) {
  var schema = JSON.parse(device.schema);
  var schemaMap = {};
  var dpCodeSchemaMap = {};
  schema.forEach(function (item) {
    schemaMap[item.id] = item;
    dpCodeSchemaMap[item.code] = item;
  });
  return _extends({}, device, {
    schemaMap: schemaMap,
    productBean: {
      schemaInfo: {
        dpCodeSchemaMap: dpCodeSchemaMap
      }
    }
  });
};

var tuya = reactNative.NativeModules.TuyaActivatorModule;
var tuyaBLEActivator = reactNative.NativeModules.TuyaBLEActivatorModule;
var tuyaBLEScanner = reactNative.NativeModules.TuyaBLEScannerModule;
function openNetworkSettings() {
  return tuya.openNetworkSettings({});
}
(function (TuyaActivationType) {
  TuyaActivationType["EZ"] = "TY_EZ";
  TuyaActivationType["AP"] = "TY_AP";
  TuyaActivationType["QR"] = "TY_QR";
})(exports.TuyaActivationType || (exports.TuyaActivationType = {}));
function initActivator(_x) {
  return _initActivator.apply(this, arguments);
}
function _initActivator() {
  _initActivator = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
    var device;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(reactNative.Platform.OS === 'ios')) {
            _context.next = 5;
            break;
          }
          _context.next = 3;
          return tuya.initActivator(params);
        case 3:
          device = _context.sent;
          return _context.abrupt("return", prepareDeviceBean(device));
        case 5:
          return _context.abrupt("return", tuya.initActivator(params));
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _initActivator.apply(this, arguments);
}
function getActivatorToken(params) {
  return tuya.getActivatorToken(params);
}
function startQRActivator(_x2) {
  return _startQRActivator.apply(this, arguments);
}
function _startQRActivator() {
  _startQRActivator = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(params) {
    var device;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(reactNative.Platform.OS === 'ios')) {
            _context2.next = 5;
            break;
          }
          _context2.next = 3;
          return tuya.initActivator(_extends({}, params, {
            type: 'TY_QR'
          }));
        case 3:
          device = _context2.sent;
          return _context2.abrupt("return", prepareDeviceBean(device));
        case 5:
          return _context2.abrupt("return", tuya.startQRActivator(params));
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _startQRActivator.apply(this, arguments);
}
function stopQRActivator() {
  if (reactNative.Platform.OS === 'ios') {
    return stopConfig();
  }
  return tuya.stopQRActivator();
}
function stopConfig() {
  return tuya.stopConfig();
}
function startBluetoothScan(params) {
  if (reactNative.Platform.OS === 'ios') {
    return tuyaBLEScanner.startBluetoothLEScan();
  }
  return tuya.startBluetoothScan(params);
}
function initBluetoothDualModeActivator(_x3) {
  return _initBluetoothDualModeActivator.apply(this, arguments);
}
function _initBluetoothDualModeActivator() {
  _initBluetoothDualModeActivator = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(params) {
    var device;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!(reactNative.Platform.OS === 'ios')) {
            _context3.next = 5;
            break;
          }
          _context3.next = 3;
          return tuyaBLEActivator.initActivator(params);
        case 3:
          device = _context3.sent;
          return _context3.abrupt("return", prepareDeviceBean(device));
        case 5:
          return _context3.abrupt("return", tuya.initBluetoothDualModeActivator(params));
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _initBluetoothDualModeActivator.apply(this, arguments);
}
function initBluetoothDualModeActivatorFromScanBean(_x4) {
  return _initBluetoothDualModeActivatorFromScanBean.apply(this, arguments);
}
function _initBluetoothDualModeActivatorFromScanBean() {
  _initBluetoothDualModeActivatorFromScanBean = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(params) {
    var device;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!(reactNative.Platform.OS === 'ios')) {
            _context4.next = 5;
            break;
          }
          _context4.next = 3;
          return tuyaBLEActivator.initActivator(params);
        case 3:
          device = _context4.sent;
          return _context4.abrupt("return", prepareDeviceBean(device));
        case 5:
          return _context4.abrupt("return", tuya.initBluetoothDualModeActivatorFromScanBean(params));
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _initBluetoothDualModeActivatorFromScanBean.apply(this, arguments);
}
function stopLeScan() {
  if (reactNative.Platform.OS === 'ios') {
    return tuyaBLEScanner.stopBluetoothScan();
  }
  return tuya.stopBluetoothScan();
}
function stopLePairing() {
  if (reactNative.Platform.OS === 'ios') {
    return tuyaBLEActivator.stopLePairing();
  }
  return tuya.stopLeActivation();
}
function getCurrentWifi(success, error) {
  // We need the Allow While Using App location permission to use this.
  return tuya.getCurrentWifi({}, success, error);
}

var tuya$1 = reactNative.NativeModules.TuyaDeviceModule;
var devListenerSubs = {};
function registerDevListener(params, type, callback) {
  tuya$1.registerDevListener(params);
  var sub = addEvent(bridge(DEVLISTENER, params.devId), function (data) {
    if (data.type === type) {
      callback(data);
    }
  });
  devListenerSubs[params.devId] = sub;
}
function unRegisterAllDevListeners() {
  for (var devId in devListenerSubs) {
    var sub = devListenerSubs[devId];
    sub.remove();
    tuya$1.unRegisterDevListener({
      devId: devId
    });
  }
  devListenerSubs = {};
}
function send(params) {
  return tuya$1.send(params);
}
function removeDevice(params) {
  return tuya$1.removeDevice(params);
}
function renameDevice(params) {
  return tuya$1.renameDevice(params);
}
function getDataPointStat(params) {
  return tuya$1.getDataPointStat(params);
}
function getWifiSignalStrength(params) {
  return tuya$1.getWifiSignalStrength(params);
}

var tuya$2 = reactNative.NativeModules.TuyaDeviceModule;
(function (DeviceListenerType) {
  DeviceListenerType["onDpUpdate"] = "onDpUpdate";
  DeviceListenerType["onRemoved"] = "onRemoved";
  DeviceListenerType["onStatusChanged"] = "onStatusChanged";
  DeviceListenerType["onNetworkStatusChanged"] = "onNetworkStatusChanged";
  DeviceListenerType["onDevInfoUpdate"] = "onDevInfoUpdate";
  DeviceListenerType["onFirmwareUpgradeSuccess"] = "onFirmwareUpgradeSuccess";
  DeviceListenerType["onFirmwareUpgradeFailure"] = "onFirmwareUpgradeFailure";
  DeviceListenerType["onFirmwareUpgradeProgress"] = "onFirmwareUpgradeProgress";
  DeviceListenerType["onFirmwareUpgradeStatus"] = "onFirmwareUpgradeStatus";
})(exports.DeviceListenerType || (exports.DeviceListenerType = {}));
var subscriptions = {};
var addDeviceListener = function addDeviceListener(_ref, cb, onError) {
  var devId = _ref.devId,
    type = _ref.type;
  if (!subscriptions[devId]) {
    tuya$2.registerDevListener({
      devId: devId
    })["catch"](function (e) {
      return onError == null ? void 0 : onError(e);
    });
    subscriptions[devId] = 0;
  }
  var sub = addEvent(bridge(DEVLISTENER, devId), function (data) {
    if (data.type === type) {
      cb(data);
    }
  });
  subscriptions[devId]++;
  return {
    remove: function remove() {
      sub.remove();
      if (subscriptions[devId] <= 1) {
        tuya$2.unRegisterDevListener({
          devId: devId
        });
      }
      subscriptions[devId]--;
    }
  };
};
var removeAllDeviceListeners = function removeAllDeviceListeners() {
  Object.keys(subscriptions).forEach(function (devId) {
    tuya$2.unRegisterDevListener({
      devId: devId
    });
    delete subscriptions[devId];
  });
};

var tuya$3 = reactNative.NativeModules.TuyaHomeModule;
function queryRoomList(params) {
  return tuya$3.queryRoomList(params);
}
function getHomeDetail(_x) {
  return _getHomeDetail.apply(this, arguments);
}
function _getHomeDetail() {
  _getHomeDetail = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
    var homeDetails, _homeDetails$deviceLi, deviceList;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return tuya$3.getHomeDetail(params);
        case 2:
          homeDetails = _context.sent;
          if (!(reactNative.Platform.OS === 'ios' && homeDetails.deviceList)) {
            _context.next = 6;
            break;
          }
          deviceList = (_homeDetails$deviceLi = homeDetails.deviceList) == null ? void 0 : _homeDetails$deviceLi.map(function (i) {
            return prepareDeviceBean(i);
          });
          return _context.abrupt("return", _extends({}, homeDetails, {
            deviceList: deviceList
          }));
        case 6:
          return _context.abrupt("return", homeDetails);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getHomeDetail.apply(this, arguments);
}
function updateHome(params) {
  return tuya$3.updateHome(params);
}
function dismissHome(params) {
  return tuya$3.dismissHome(params);
}
function sortRoom(params) {
  return tuya$3.sortRoom(params);
}

var tuya$4 = reactNative.NativeModules.TuyaHomeDataManagerModule;
function getRoomDeviceList(params) {
  return tuya$4.getRoomDeviceList(params);
}

var tuya$5 = reactNative.NativeModules.TuyaHomeManagerModule;
function createHome(params) {
  return tuya$5.createHome(params);
}
function queryHomeList() {
  return _queryHomeList.apply(this, arguments);
}
function _queryHomeList() {
  _queryHomeList = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var homes;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return tuya$5.queryHomeList();
        case 2:
          homes = _context.sent;
          // Tuya's Android SDK uses different property names than the iOS SDK...
          if (reactNative.Platform.OS === 'android') {
            homes = homes.map(function (m) {
              return _extends({}, m, {
                dealStatus: m.homeStatus
              });
            });
          }
          return _context.abrupt("return", homes);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _queryHomeList.apply(this, arguments);
}
function joinFamily(params) {
  return tuya$5.joinFamily(params);
}

var tuya$6 = reactNative.NativeModules.TuyaHomeMemberModule;
function queryMemberList(_x) {
  return _queryMemberList.apply(this, arguments);
}
function _queryMemberList() {
  _queryMemberList = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
    var members;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return tuya$6.queryMemberList(params);
        case 2:
          members = _context.sent;
          // Tuya's Android SDK uses different property names than the iOS SDK...
          if (reactNative.Platform.OS === 'android') {
            members = members.map(function (m) {
              return {
                admin: m.admin,
                username: m.account,
                id: m.memberId,
                dealStatus: m.memberStatus
              };
            });
          }
          return _context.abrupt("return", members);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _queryMemberList.apply(this, arguments);
}
function addMember(params) {
  return tuya$6.addMember(params);
}
function removeMember(params) {
  return tuya$6.removeMember(params);
}

var tuya$7 = reactNative.Platform.OS === 'ios' ? reactNative.NativeModules.TuyaDeviceModule : reactNative.NativeModules.TuyaOTAModule;
function startOta(params, onSuccess, onFailure, onProgress) {
  tuya$7.startOta(params);
  return addEvent(bridge(HARDWAREUPGRADELISTENER, params.devId), function (data) {
    if (data.type === 'onSuccess') {
      onSuccess(data);
    } else if (data.type === 'onFailure') {
      onFailure(data);
    } else if (data.type === 'onProgress') {
      onProgress(data);
    }
  });
}
(function (TuyaUpgradeStatus) {
  TuyaUpgradeStatus[TuyaUpgradeStatus["noUpdate"] = 0] = "noUpdate";
  TuyaUpgradeStatus[TuyaUpgradeStatus["updateAvailable"] = 1] = "updateAvailable";
  TuyaUpgradeStatus[TuyaUpgradeStatus["updating"] = 2] = "updating";
  TuyaUpgradeStatus[TuyaUpgradeStatus["waitForDevice"] = 5] = "waitForDevice";
})(exports.TuyaUpgradeStatus || (exports.TuyaUpgradeStatus = {}));
function getOtaInfo(params) {
  return tuya$7.getOtaInfo(params);
}
function startFirmwareUpgrade(params) {
  return tuya$7.startFirmwareUpgrade(params);
}

var tuya$8 = reactNative.NativeModules.TuyaTimerModule;
function addTimerWithTask(params) {
  return tuya$8.addTimerWithTask(params);
}
function updateTimerWithTask(params) {
  return tuya$8.updateTimerWithTask(params);
}
function getTimerTaskStatusWithDeviceId(params) {
  return tuya$8.getTimerTaskStatusWithDeviceId(params);
}
function getAllTimerWithDeviceId(_x) {
  return _getAllTimerWithDeviceId.apply(this, arguments);
}
function _getAllTimerWithDeviceId() {
  _getAllTimerWithDeviceId = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
    var timers;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return tuya$8.getAllTimerWithDeviceId(params);
        case 2:
          timers = _context.sent;
          timers.forEach(function (t) {
            t.timerTaskStatus.open = !!t.timerTaskStatus.open;
          });
          return _context.abrupt("return", timers);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getAllTimerWithDeviceId.apply(this, arguments);
}
function removeTimerWithTask(params) {
  return tuya$8.removeTimerWithTask(params);
}
function updateTimerStatusWithTask(params) {
  return tuya$8.updateTimerStatusWithTask(params);
}

var tuya$9 = reactNative.NativeModules.TuyaUserModule;
function registerAccountWithEmail(params) {
  return tuya$9.registerAccountWithEmail(params);
}
function getRegisterEmailValidateCode(params) {
  return tuya$9.getRegisterEmailValidateCode(params);
}
function sendVerifyCodeWithUserName(params) {
  return tuya$9.sendVerifyCodeWithUserName(params);
}
function loginWithEmail(params) {
  return tuya$9.loginWithEmail(params);
}
function getEmailValidateCode(params) {
  return tuya$9.getEmailValidateCode(params);
}
function resetEmailPassword(params) {
  return tuya$9.resetEmailPassword(params);
}
function logout() {
  return tuya$9.logout();
}
function getCurrentUser() {
  return tuya$9.getCurrentUser();
}
function getUser() {
  return tuya$9.getUser();
}
function cancelAccount() {
  return tuya$9.cancelAccount();
}
function loginWithUid(_x) {
  return _loginWithUid.apply(this, arguments);
}
function _loginWithUid() {
  _loginWithUid = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(params) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", tuya$9.loginWithUid(params));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _loginWithUid.apply(this, arguments);
}
function loginOrRegisterWithUid(_x2) {
  return _loginOrRegisterWithUid.apply(this, arguments);
}
function _loginOrRegisterWithUid() {
  _loginOrRegisterWithUid = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(params) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", tuya$9.loginOrRegisterWithUid(params));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _loginOrRegisterWithUid.apply(this, arguments);
}

exports.DEVLISTENER = DEVLISTENER;
exports.GROUPLISTENER = GROUPLISTENER;
exports.HARDWAREUPGRADELISTENER = HARDWAREUPGRADELISTENER;
exports.HOMECHANGE = HOMECHANGE;
exports.HOMESTATUS = HOMESTATUS;
exports.SINGLETRANSFER = SINGLETRANSFER;
exports.SUBDEVLISTENER = SUBDEVLISTENER;
exports.addDeviceListener = addDeviceListener;
exports.addEvent = addEvent;
exports.addMember = addMember;
exports.addTimerWithTask = addTimerWithTask;
exports.bridge = bridge;
exports.cancelAccount = cancelAccount;
exports.createHome = createHome;
exports.dismissHome = dismissHome;
exports.getActivatorToken = getActivatorToken;
exports.getAllTimerWithDeviceId = getAllTimerWithDeviceId;
exports.getCurrentUser = getCurrentUser;
exports.getCurrentWifi = getCurrentWifi;
exports.getDataPointStat = getDataPointStat;
exports.getEmailValidateCode = getEmailValidateCode;
exports.getHomeDetail = getHomeDetail;
exports.getOtaInfo = getOtaInfo;
exports.getRegisterEmailValidateCode = getRegisterEmailValidateCode;
exports.getRoomDeviceList = getRoomDeviceList;
exports.getTimerTaskStatusWithDeviceId = getTimerTaskStatusWithDeviceId;
exports.getUser = getUser;
exports.getWifiSignalStrength = getWifiSignalStrength;
exports.initActivator = initActivator;
exports.initBluetoothDualModeActivator = initBluetoothDualModeActivator;
exports.initBluetoothDualModeActivatorFromScanBean = initBluetoothDualModeActivatorFromScanBean;
exports.joinFamily = joinFamily;
exports.loginOrRegisterWithUid = loginOrRegisterWithUid;
exports.loginWithEmail = loginWithEmail;
exports.loginWithUid = loginWithUid;
exports.logout = logout;
exports.openNetworkSettings = openNetworkSettings;
exports.prepareDeviceBean = prepareDeviceBean;
exports.queryHomeList = queryHomeList;
exports.queryMemberList = queryMemberList;
exports.queryRoomList = queryRoomList;
exports.registerAccountWithEmail = registerAccountWithEmail;
exports.registerDevListener = registerDevListener;
exports.removeAllDeviceListeners = removeAllDeviceListeners;
exports.removeDevice = removeDevice;
exports.removeMember = removeMember;
exports.removeTimerWithTask = removeTimerWithTask;
exports.renameDevice = renameDevice;
exports.resetEmailPassword = resetEmailPassword;
exports.send = send;
exports.sendVerifyCodeWithUserName = sendVerifyCodeWithUserName;
exports.sortRoom = sortRoom;
exports.startBluetoothScan = startBluetoothScan;
exports.startFirmwareUpgrade = startFirmwareUpgrade;
exports.startOta = startOta;
exports.startQRActivator = startQRActivator;
exports.stopConfig = stopConfig;
exports.stopLePairing = stopLePairing;
exports.stopLeScan = stopLeScan;
exports.stopQRActivator = stopQRActivator;
exports.unRegisterAllDevListeners = unRegisterAllDevListeners;
exports.updateHome = updateHome;
exports.updateTimerStatusWithTask = updateTimerStatusWithTask;
exports.updateTimerWithTask = updateTimerWithTask;
//# sourceMappingURL=react-native-tuya.cjs.development.js.map
