'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLatestRecord = exports.getDiff = undefined;

var getDiff = exports.getDiff = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(db, key, fromId) {
        var startRecord, endRecord;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!fromId) {
                            _context.next = 6;
                            break;
                        }

                        _context.next = 3;
                        return getRecord(db, key, fromId);

                    case 3:
                        _context.t0 = _context.sent;
                        _context.next = 7;
                        break;

                    case 6:
                        _context.t0 = { id: '', record: [] };

                    case 7:
                        startRecord = _context.t0;
                        _context.next = 10;
                        return getLatestRecord(db, key);

                    case 10:
                        endRecord = _context.sent;
                        return _context.abrupt('return', {
                            start: startRecord.id,
                            end: endRecord.id,
                            changes: (0, _changeset2.default)(startRecord.record, endRecord.record)
                        });

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getDiff(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var getLatestRecord = exports.getLatestRecord = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(db, key) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', getRecord(db, key, 'last'));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function getLatestRecord(_x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}();

var getRecord = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(db, key, id) {
        var collection, cursor, allDiffs, index, record, recordId, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, singleDiff;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        collection = db.collection(key);
                        cursor = collection.find();
                        // Get all diffs until ID.

                        _context3.next = 4;
                        return cursor.toArray();

                    case 4:
                        allDiffs = _context3.sent;

                        if (id !== 'last') {
                            index = id ? allDiffs.findIndex(function (singleDiff) {
                                return singleDiff.diffId === id;
                            }) : 0;

                            allDiffs = allDiffs.slice(0, index + 1);
                        }
                        record = [];
                        recordId = void 0;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context3.prev = 11;

                        for (_iterator = allDiffs[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            singleDiff = _step.value;

                            record = _changeset2.default.apply(singleDiff.changes, record);
                            recordId = singleDiff.diffId;
                        }
                        _context3.next = 19;
                        break;

                    case 15:
                        _context3.prev = 15;
                        _context3.t0 = _context3['catch'](11);
                        _didIteratorError = true;
                        _iteratorError = _context3.t0;

                    case 19:
                        _context3.prev = 19;
                        _context3.prev = 20;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 22:
                        _context3.prev = 22;

                        if (!_didIteratorError) {
                            _context3.next = 25;
                            break;
                        }

                        throw _iteratorError;

                    case 25:
                        return _context3.finish(22);

                    case 26:
                        return _context3.finish(19);

                    case 27:
                        return _context3.abrupt('return', { id: recordId, record: record });

                    case 28:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[11, 15, 19, 27], [20,, 22, 26]]);
    }));

    return function getRecord(_x6, _x7, _x8) {
        return _ref3.apply(this, arguments);
    };
}();

var _changeset = require('changeset');

var _changeset2 = _interopRequireDefault(_changeset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=get.js.map