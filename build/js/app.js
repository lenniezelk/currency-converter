'use strict';

var _api = require('./countries/api');
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountries = getCountries;

var _settings = require('../config/settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCountries() {
  return fetch(_settings2.default.API_BASE_URL + '/countries');
}
