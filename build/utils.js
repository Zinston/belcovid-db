"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.objectFrom = objectFrom;
exports.provinceKey = provinceKey;

var _constants = require("./constants");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Return an object with the given `keys`, all set to the given `initalValue`.
 *
 * @param {string[]} keys
 * @param {any} [initialValue] default: undefined
 */
function objectFrom(keys, initialValue) {
    return keys.reduce(function (object, key) {
        var value = Array.isArray(initialValue) ? [].concat(_toConsumableArray(initialValue)) : (typeof initialValue === "undefined" ? "undefined" : _typeof(initialValue)) === 'object' ? Object.assign({}, initialValue) : initialValue;
        object[key] = value;
        return object;
    }, {});
}
function provinceKey(provinceString) {
    return _constants.PROVINCE_KEYS[provinceString];
}
//# sourceMappingURL=utils.js.map