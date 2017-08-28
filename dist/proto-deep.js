/* proto-deep v0.2.4 Copyright (c) 2017 Paul Smirnov */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.protoDeep = factory());
}(this, (function () { 'use strict';

var version = "0.2.4";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function protoDeep(obj, ensureZeroOwnProperties) {
  var res = obj;
  if (Array.isArray(obj)) {
    res = new Array(obj.length);
    for (var i = 0, n = obj.length; i < n; ++i) {
      res[i] = protoDeep(obj[i]);
    }
  } else if (obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    res = Object.create(obj);
    var keys = Object.keys(obj);
    for (var _i = 0, _n = keys.length; _i < _n; ++_i) {
      var key = keys[_i];
      var value = obj[key];
      var copy = protoDeep(value);
      if (copy !== value) {
        res[key] = copy;
      }
    }
    if (ensureZeroOwnProperties && Object.keys(res).length > 0) {
      res = Object.create(res);
    }
  }
  return res;
}

protoDeep.VERSION = version;

return protoDeep;

})));
