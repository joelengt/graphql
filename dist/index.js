'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug')('riqra-service-ads:index');

var app = (0, _express2.default)();
var http = require('http').Server(app);
var port = process.env.PORT;

app.use(_bodyParser2.default.json());

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

http.listen(port, function (err) {
  if (err) return debug('Error: Server not started - ' + err);
  debug('Server listing on port ' + port);
});