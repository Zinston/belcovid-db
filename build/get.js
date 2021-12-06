"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var getDiff = exports.getDiff = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(db, key, fromId) {
        var collection, cursor, allDiffs, index, startDiff, endDiff, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        collection = db.collection(key);
                        cursor = collection.find();
                        // Get all diffs until ID.

                        _context.next = 4;
                        return cursor.toArray();

                    case 4:
                        allDiffs = _context.sent;
                        index = fromId ? allDiffs.findIndex(function (singleDiff) {
                            return singleDiff.diffId === fromId;
                        }) : 0;
                        startDiff = allDiffs[index];
                        endDiff = allDiffs[allDiffs.length - 1];
                        result = {
                            start: [startDiff.diffId, startDiff.datetime],
                            end: [endDiff.diffId, endDiff.datetime],
                            changes: allDiffs.slice(index + 1).flatMap(function (diff) {
                                return diff.changes;
                            })
                        };
                        return _context.abrupt("return", result);

                    case 10:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getDiff(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=get.js.map