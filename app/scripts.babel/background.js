'use strict';

let commands = {};

chrome.runtime.onInstalled.addListener(details => {
	console.log('previousVersion', details.previousVersion);
});

chrome.commands.onCommand.addListener(command => {
	commands[command]();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status == 'complete')
		init();
});

function init() {
	let speakDirect = new Speak(false),
		speakEnqueue = new Speak(true);

	speakDirect.speak('Você acessou o jíra, qual opção você deseja acessar?');

	commands.option1 = function() {
		speakDirect.speak('Listar histórias, BBB-1990 - Inserir campo de contrato na tela de evidência, BBB-2990 - Inserir campo de agência na tela de cadastro');
	}

	speakEnqueue.speak('1 - Listar histórias');
	speakEnqueue.speak('2 - Detalhar história');
	speakEnqueue.speak('3 - Listar atividades');
	speakEnqueue.speak('4 - Detalhar atividade');
}

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
			rate: 2.0,
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

/**
 * @description Class responsible for http requests
 */
class Http {

	/**
	 * Get http
	 * @param  { string } url URL get request
	 * @return { response } Response body for http request is 200 or response error
	 */
	get(url) {
		return new Promise(
			function(resolve, reject) {
				var request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if (this.readyState === XMLHttpRequest.DONE) {
						if (this.status === 200) {
							resolve(this.response);
						} else {
							reject(new Error(this.statusText));
						}
					}
				}
				request.onerror = function() {
					reject(new Error('XMLHttpRequest Error: ' + this.statusText));
				};
				request.open('GET', url);
				request.send();
			});
	}

}