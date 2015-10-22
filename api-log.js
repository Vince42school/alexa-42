// Set the client credentials and the OAuth2 server
const credentials = include('config').credentials || {};

console.log(credentials, include("config"))
// Initialize the OAuth2 Library
const oauth2 = require('simple-oauth2')(credentials);

var _token;

const _errorList = [];
const MAX_ERROR_BEFORE_PROCESS_EXIT = 20;

function callApi(path, access_token, resolve, reject) {
  oauth2.api('GET', path, { access_token }, (err, res) => err
	    ? reject(err) : resolve(res));
  _errorList.length = 0;
}

function request(path, resolve, reject) {
  if (!_token) {
    oauth2.client.getToken({}, (error, result) => {
      if (error) { return _errorList.push(error) }
      _token = oauth2.accessToken.create(result);
      if (_errorList.length > MAX_ERROR_BEFORE_PROCESS_EXIT) {
        reject(new Error(_errorList[0]));
      } else {
        request(path, resolve, reject);
      }
    });
  } else if (_token.expired()) {
    _token.refresh((error, result) => {
      _token = error ? null : result;
      request(path, resolve, reject);
    });
  } else {
    callApi(path, _token.token.access_token, resolve, reject);
  }
}

module.exports = path => new Promise((resolve, reject) => request(path, resolve, reject));

