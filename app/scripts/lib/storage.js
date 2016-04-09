'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
	function Storage() {
		_classCallCheck(this, Storage);

		this.repository = 'storage_jira_accessibility';
	}

	_createClass(Storage, [{
		key: 'seti',
		value: function seti(key, value) {
			var _this = this;

			this.get().then(function (response) {
				if (!response[_this.repository]) {
					response[_this.repository] = {};
				}
				response[_this.repository][key] = value;

				chrome.storage.sync.set(response, function () {
					console.log('Settings saved => ' + JSON.stringify(response));
				});
			});
		}
	}, {
		key: 'get',
		value: function get() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				chrome.storage.sync.get(_this2.repository, function (response) {
					if (chrome.runtime.error) {
						console.log('Error settings recovery');
						reject();
					}
					console.log('Settings recovery => ' + JSON.stringify(response));
					resolve(response);
				});
			});
		}
	}, {
		key: 'getf',
		value: function getf() {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				_this3.get().then(function (response) {
					if (!response || !response[_this3.repository]) {
						reject('storage is undefined');
					}
					response = response[_this3.repository];
					resolve({
						url: response['store.settings.url'],
						project: response['store.settings.project']
					});
				}, function (error) {
					reject('error get storage');
				});
			});
		}
	}]);

	return Storage;
}();