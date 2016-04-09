'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Jira = function () {
	function Jira() {
		_classCallCheck(this, Jira);

		this.http = new Http();
	}

	_createClass(Jira, [{
		key: 'profile',
		value: function profile(url) {
			var _this = this;

			return new Promise(function (resolve, reject) {
				_this.http.get('https://' + url + '/rest/api/2/myself').then(function (response) {
					resolve(JSON.parse(response));
				}, function (error) {
					reject(error);
				});
			});
		}
	}, {
		key: 'errors',
		value: function errors(error) {
			if (S(error).contains('Unauthorized')) return UNAUTHORIZED;
			return GENERIC_ERROR;
		}
	}]);

	return Jira;
}();