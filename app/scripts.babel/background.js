'use strict';

const _storage = 'storage_jira_accessibility';
let storage = new Storage(_storage);

let commands = {},
	timeout;

let direct = new Speak(false),
	enqueue = new Speak(true);

/**
 * Options messages and titles
 */
const MENU_OPTION_INITIAL = 'Você acessou o jíra, qual opção você deseja acessar?',
	MENU_OPTION_LIST_HISTORY = 'Listar histórias',
	MENU_OPTION_DETAIL_HISTORY = 'Detalhar história';

/**
 * Init app, call all functions
 */
function init() {
	validate().then(
		() => {
			options();
			delay();
		}, (error) => {
			_(error.forEach(
				(value) => {
					console.log(value);
				}));
		});
}

/**
 * Validate url and project for jira site
 */
function validate() {
	return new Promise((resolve, reject) => {
		storage.get(_storage).then((properties) => {
			let _url = 'store.settings.url',
				_project = 'store.settings.project';

			let errors = [];
			if (!properties || !properties[_storage]) {
				errors.push('Validation error => storage is undefined');
			} else {
				if (S(properties[_storage][_url]).isEmpty()) {
					errors.push('Validation error => url jira storage is undefined or blank');
				}
				if (S(properties[_storage][_project]).isEmpty()) {
					errors.push('Validation error => project jira storage is undefined or blank');
				}
			}

			if (errors.length > 0) {
				reject(errors);
			}
			resolve();
		});
	});
}

/**
 * Configure properties and speak options in menu initial
 */
function options() {
	direct.speak(MENU_OPTION_INITIAL);

	commands.option1 = () => {
		direct.speak(MENU_OPTION_LIST_HISTORY + ', BBB-1990 - Inserir campo de contrato na tela de evidência, BBB-2990 - Inserir campo de agência na tela de cadastro');
	}
	enqueue.speak('1 - ' + MENU_OPTION_LIST_HISTORY);
}

/**
 * Configure delay after speak
 */
function delay() {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		commands = {};
	}, 10000); // 10 secs
}

/**
 * @description Receive command by inject listener content script
 */
chrome.extension.onRequest.addListener((request, sender, sendResponse) => {
	if (request.type == 'command') {
		var command = commands[request.command];
		if (command) {
			commands[request.command]();
			delay();
		}
	} else if (request.type == 'storage') {
		storage.seti(request.key, request.value);
	}
	sendResponse({});
});

/**
 * @description Receive command by chrome browser
 */
chrome.commands.onCommand.addListener(command => {
	if (command == 'active') {
		init();
	}
});