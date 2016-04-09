'use strict';

let commands = {},
	timeout,
	direct = new Speak(false),
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
	if (validate_jira()) {
		define_options();
		delay();
	}
}

/**
 * Validate url and project for jira site
 */
function validate_jira() {
	return true;
}

/**
 * Configure properties and speak options in menu initial
 */
function define_options() {
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
	var command = commands[request.command];
	if (command) {
		commands[request.command]();
		delay();
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