/**
 * @description Class responsible for chrome speak tts
 */
class Speak {

	/**
	 * Instance speak conf
	 * @param  { true or false } enqueue Define with speak direct or enqueue
	 */
	constructor(enqueue) {
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
	speak(message) {
		chrome.tts.speak(message, this.speakconf);
	}

}