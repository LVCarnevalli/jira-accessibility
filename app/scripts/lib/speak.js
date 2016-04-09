'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @description Class responsible for chrome speak tts
 */

var Speak = function () {

	/**
  * Instance speak conf
  * @param  { true or false } enqueue Define with speak direct or enqueue
  */

	function Speak(enqueue) {
		_classCallCheck(this, Speak);

		this.speakconf = {
			lang: 'pt-BR',
			rate: 1.3,
			enqueue: enqueue,
			voiceName: 'Google português do Brasil'
		};
	}

	/**
  * Speak
  * @param  { string } message Message for speak tts
  */


	_createClass(Speak, [{
		key: 'speak',
		value: function speak(message) {
			chrome.tts.speak(message, this.speakconf);
		}
	}]);

	return Speak;
}();