'use strict';

var connectMongoDB = function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
		var client;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.next = 2;
						return new _mongodb2.default(_constants.MONGO_URI, { useUnifiedTopology: true });

					case 2:
						client = _context4.sent;
						_context4.prev = 3;
						_context4.next = 6;
						return client.connect();

					case 6:
						_context4.next = 13;
						break;

					case 8:
						_context4.prev = 8;
						_context4.t0 = _context4['catch'](3);

						console.error(_context4.t0);
						_context4.next = 13;
						return client.close();

					case 13:
						return _context4.abrupt('return', client);

					case 14:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, this, [[3, 8]]);
	}));

	return function connectMongoDB() {
		return _ref4.apply(this, arguments);
	};
}();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _constants = require('./constants.js');

var _get = require('./get.js');

var _put = require('./put.js');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

connectMongoDB().catch(console.error).then(function (client) {
	var db = client.db('belcovid');

	var server = (0, _express2.default)();
	(0, _cors2.default)({ credentials: true, origin: true });
	server.use((0, _cors2.default)());

	server.get('/update', function () {
		var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
			var updates;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return (0, _put.updateDatabase)(db);

						case 2:
							updates = _context.sent;

							res.statusCode = 200;
							res.json({ updated: updates });

						case 5:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined);
		}));

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}());
	server.get('/update-time', function () {
		var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
			var updateTimes;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.next = 2;
							return db.collection('lastUpdate').find().toArray();

						case 2:
							updateTimes = _context2.sent;

							res.statusCode = 200;
							res.json(updateTimes[updateTimes.length - 1]);

						case 5:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, undefined);
		}));

		return function (_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	}());
	server.get('/:key/:fromId?', function () {
		var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
			var diff;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.next = 2;
							return (0, _get.getDiff)(db, req.params.key, req.params.fromId);

						case 2:
							diff = _context3.sent;

							res.statusCode = 200;
							res.json(diff);

						case 5:
						case 'end':
							return _context3.stop();
					}
				}
			}, _callee3, undefined);
		}));

		return function (_x5, _x6) {
			return _ref3.apply(this, arguments);
		};
	}());

	// Handle 404 - Keep this as a last route
	server.use(function (req, res, next) {
		res.status(404);
		res.send('404: File Not Found');
	});

	// listen for request on port 3000, and as a callback function have the port listened on logged
	// eslint-disable-next-line no-undef
	server.listen(process.env.PORT || 3000, function () {
		// eslint-disable-next-line no-console,no-undef
		console.log('Listening to port ' + (process.env.PORT || 3000));
	});
});
//# sourceMappingURL=index.js.map