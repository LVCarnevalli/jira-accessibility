'use strict';

let storage = new Storage();
let jira = new Jira();

let commands = {};
let timeout;

let direct = new Speak(false);
let enqueue = new Speak(true);

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
					commands = {};
					direct.speak(VALIDATION_FIELDS_JIRA);
				}));
		});
}

/**
 * Validate url and project for jira site
 */
function validate() {
	let errors = [];
	return new Promise((resolve, reject) => {
		storage.getf().then((response) => {
			if (S(response.url).isEmpty()) {
				errors.push('Validation error => url jira storage is undefined or blank');
			}
			if (S(response.project).isEmpty()) {
				errors.push('Validation error => project jira storage is undefined or blank');
			}

			if (errors.length > 0) {
				reject(errors);
			}
			resolve();
		}, (error) => {
			errors.push('Validation error => ' + error);
			reject(errors);
		});
	});
}

/**
 * Configure properties and speak options in menu initial
 */
function options() {
	storage.getf().then((props) => {
		jira.profile(props.url).then((profile) => {
			direct.speak(S(MENU_OPTION_INITIAL).template({
				name: profile.displayName
			}).s);

			defineOption1(props.url, props.project);
			defineOption2(props.url, props.project);
		}, (error) => {
			commands = {};
			direct.speak(jira.errors(error));
		});
	});
}

function defineOption1(url, project) {
	commands.option1 = () => {
		jira.stories(url, project).then((stories) => {
			direct.speak(MENU_OPTION_LIST_HISTORY);

			_(stories.issues.forEach(
				(value) => {
					enqueue.speak(value.key + ' - ' + value.fields.summary);
				}));
		});
	}
	enqueue.speak('1 - ' + MENU_OPTION_LIST_HISTORY);
}

function defineOption2(url, project) {
	commands.option2 = () => {
		jira.nonFunctionalStories(url, project).then((stories) => {
			direct.speak(MENU_OPTION_LIST_HISTORY_NON_FUNCTIONAL);

			_(stories.issues.forEach(
				(value) => {
					enqueue.speak(value.key + ' - ' + value.fields.summary);
				}));
		});
	}
	enqueue.speak('2 - ' + MENU_OPTION_LIST_HISTORY_NON_FUNCTIONAL);
}

/**
 * Configure delay after speak
 */
function delay() {
	clearTimeout(timeout);
	timeout = setTimeout(() => {
		commands = {};
	}, 20000); // 20 secs
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