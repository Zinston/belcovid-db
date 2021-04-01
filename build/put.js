'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateDatabase = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var updateDatabase = exports.updateDatabase = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(db) {
        var newData, updatedKeys, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key, collection, latestRecord, changes;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.t0 = normalizeAllData;
                        _context.next = 3;
                        return fetchData();

                    case 3:
                        _context.t1 = _context.sent;
                        newData = (0, _context.t0)(_context.t1);


                        // Update the database with the latest diffs.
                        updatedKeys = [];
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 9;
                        _iterator = Object.keys(newData)[Symbol.iterator]();

                    case 11:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 29;
                            break;
                        }

                        key = _step.value;
                        collection = db.collection(key);
                        // Compute the latest recorded data from all recorded diffs.

                        _context.next = 16;
                        return (0, _get.getLatestRecord)(db, key);

                    case 16:
                        latestRecord = _context.sent;


                        // Compute the diff between the latest recorded data and the new
                        // data.
                        changes = (0, _changeset2.default)(latestRecord.record, newData[key]);

                        if (!changes.length) {
                            _context.next = 25;
                            break;
                        }

                        _context.next = 21;
                        return collection.insertOne({
                            diffId: (0, _uuid.v1)(),
                            changes: changes
                        });

                    case 21:
                        // eslint-disable-next-line no-console
                        console.log('insert new diff for ' + key);
                        updatedKeys.push(key);
                        _context.next = 26;
                        break;

                    case 25:
                        // eslint-disable-next-line no-console
                        console.log('no changes to record for ' + key);

                    case 26:
                        _iteratorNormalCompletion = true;
                        _context.next = 11;
                        break;

                    case 29:
                        _context.next = 35;
                        break;

                    case 31:
                        _context.prev = 31;
                        _context.t2 = _context['catch'](9);
                        _didIteratorError = true;
                        _iteratorError = _context.t2;

                    case 35:
                        _context.prev = 35;
                        _context.prev = 36;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 38:
                        _context.prev = 38;

                        if (!_didIteratorError) {
                            _context.next = 41;
                            break;
                        }

                        throw _iteratorError;

                    case 41:
                        return _context.finish(38);

                    case 42:
                        return _context.finish(35);

                    case 43:
                        return _context.abrupt('return', updatedKeys);

                    case 44:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[9, 31, 35, 43], [36,, 38, 42]]);
    }));

    return function updateDatabase(_x) {
        return _ref.apply(this, arguments);
    };
}();

var fetchData = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var data, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, key;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        data = [];
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context2.prev = 4;
                        _iterator2 = Object.keys(_constants.URLS)[Symbol.iterator]();

                    case 6:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context2.next = 20;
                            break;
                        }

                        key = _step2.value;
                        _context2.t0 = data;
                        _context2.t1 = key;
                        _context2.next = 12;
                        return (0, _nodeFetch2.default)(_constants.URLS[key]);

                    case 12:
                        _context2.next = 14;
                        return _context2.sent.json();

                    case 14:
                        _context2.t2 = _context2.sent;
                        _context2.t3 = [_context2.t1, _context2.t2];

                        _context2.t0.push.call(_context2.t0, _context2.t3);

                    case 17:
                        _iteratorNormalCompletion2 = true;
                        _context2.next = 6;
                        break;

                    case 20:
                        _context2.next = 26;
                        break;

                    case 22:
                        _context2.prev = 22;
                        _context2.t4 = _context2['catch'](4);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context2.t4;

                    case 26:
                        _context2.prev = 26;
                        _context2.prev = 27;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 29:
                        _context2.prev = 29;

                        if (!_didIteratorError2) {
                            _context2.next = 32;
                            break;
                        }

                        throw _iteratorError2;

                    case 32:
                        return _context2.finish(29);

                    case 33:
                        return _context2.finish(26);

                    case 34:
                        return _context2.abrupt('return', data);

                    case 35:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[4, 22, 26, 34], [27,, 29, 33]]);
    }));

    return function fetchData() {
        return _ref2.apply(this, arguments);
    };
}();

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _changeset = require('changeset');

var _changeset2 = _interopRequireDefault(_changeset);

var _uuid = require('uuid');

var _constants = require('./constants');

var _utils = require('./utils');

var _get = require('./get');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function normalizeAllData(data) {
    var finalData = {};
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = data[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _ref3 = _step3.value;

            var _ref4 = _slicedToArray(_ref3, 2);

            var key = _ref4[0];
            var values = _ref4[1];

            switch (key) {
                case 'cases':
                    {
                        finalData.cases = normalizeData('CASES', values, _constants.AGE_GROUPS_CASES);
                        break;
                    }
                case 'hospitalizations':
                    {
                        finalData.totalHospitalizations = normalizeData('TOTAL_IN', values);
                        finalData.newHospitalizations = normalizeData('NEW_IN', values);
                        finalData.totalICU = normalizeData('TOTAL_IN_ICU', values);
                        break;
                    }
                case 'mortality':
                    {
                        finalData.mortality = normalizeData('DEATHS', values, _constants.AGE_GROUPS_MORTALITY);
                        break;
                    }
                case 'tests':
                    {
                        finalData.tests = normalizeData('TESTS_ALL', values, _constants.AGE_GROUPS_MORTALITY);
                        break;
                    }
            }
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    return finalData;
}
function normalizeData(dataKey, values, ageGroups) {
    var data = (0, _utils.objectFrom)(Object.keys(_constants.PROVINCES), {});
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = values[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var item = _step4.value;

            var province = item.PROVINCE && (0, _utils.provinceKey)(item.PROVINCE) || 'be';
            var date = item.DATE;
            if (!date) {
                continue;
            }

            var value = +item[dataKey];
            if (ageGroups) {
                var ageGroup = item.AGEGROUP || 'Age unknown';
                if (!data[province][date]) {
                    // Initialize the age group values.
                    data[province][date] = (0, _utils.objectFrom)(ageGroups, 0);
                }
                if (!data.be[date]) {
                    // Initialize the age group values for Belgium.
                    data.be[date] = (0, _utils.objectFrom)(ageGroups, 0);
                }
                var normalizedValue = data[province][date][ageGroup] || 0;
                // Set province value at date for age group.
                data[province][date][ageGroup] = normalizedValue + value;
                // Add to total for province at date.
                var totalValue = data[province][date].total || 0;
                data[province][date].total = totalValue + value;
                // Add to totals for Belgium at date.
                if (province !== 'be') {
                    if (!data.be[date]) {
                        data.be[date] = {};
                    }
                    // Add to total for Belgium at date for age group.
                    var belgiumValue = data.be[date][ageGroup] || 0;
                    data.be[date][ageGroup] = belgiumValue + value;
                    // Add to total for Belgium at date.
                    var belgiumTotal = data.be[date].total || 0;
                    data.be[date].total = belgiumTotal + value;
                }
            } else {
                var provinceValue = data[province][date] || 0;
                // Set province value at date.
                data[province][date] = provinceValue + value;
                // Add to total for Belgium at date.
                if (province !== 'be') {
                    var _belgiumValue = data.be[date] || 0;
                    data.be[date] = _belgiumValue + value;
                }
            }
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    return data;
}
//# sourceMappingURL=put.js.map