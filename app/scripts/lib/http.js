'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @description Class responsible for http requests
 */

var Http = function () {
	function Http() {
		_classCallCheck(this, Http);
	}

	_createClass(Http, [{
		key: 'get',


		/**
   * Get http
   * @param  { string } url URL get request
   * @return { response } Response body for http request is 200 or response error
   */
		value: function get(url) {
			return new Promise(function (resolve, reject) {
				var request = new XMLHttpRequest();
				request.onreadystatechange = function () {
					if (request.readyState == XMLHttpRequest.DONE) {
						if (request.status == 200) {
							resolve(request.response);
						} else {
							reject(new Error(request.statusText));
						}
					}
				};
				request.onerror = function () {
					reject(new Error('XMLHttpRequest Error: ' + request.statusText));
				};
				request.open('GET', url);
				request.send();
			});
		}
	}]);

	return Http;
}();