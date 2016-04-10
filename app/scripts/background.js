'use strict';

var storage = new Storage();
var jira = new Jira();

var commands = {};
var timeout = void 0;

var direct = new Speak(false);
var enqueue = new Speak(true);

/**
 * Init app, call all functions
 */
function init() {
	validate().then(function () {
		options();
		delay();
	}, function (error) {
		_(error.forEach(function (value) {
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
	var errors = [];
	return new Promise(function (resolve, reject) {
		storage.getf().then(function (response) {
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
		}, function (error) {
			errors.push('Validation error => ' + error);
			reject(errors);
		});
	});
}

/**
 * Configure properties and speak options in menu initial
 */
function options() {
	storage.getf().then(function (props) {
		jira.profile(props.url).then(function (profile) {
			direct.speak(S(MENU_OPTION_INITIAL).template({
				name: profile.displayName
			}).s);

			defineOption1(props.url, props.project);
			defineOption2(props.url, props.project);
		}, function (error) {
			commands = {};
			direct.speak(jira.errors(error));
		});
	});
}

function defineOption1(url, project) {
	commands.option1 = function () {
		jira.stories(url, project).then(function (stories) {
			direct.speak(MENU_OPTION_LIST_HISTORY);

			_(stories.issues.forEach(function (value) {
				enqueue.speak(value.key + ' - ' + value.fields.summary);
			}));
		});
	};
	enqueue.speak('1 - ' + MENU_OPTION_LIST_HISTORY);
}

function defineOption2(url, project) {
	commands.option2 = function () {
		jira.nonFunctionalStories(url, project).then(function (stories) {
			direct.speak(MENU_OPTION_LIST_HISTORY_NON_FUNCTIONAL);

			_(stories.issues.forEach(function (value) {
				enqueue.speak(value.key + ' - ' + value.fields.summary);
			}));
		});
	};
	enqueue.speak('2 - ' + MENU_OPTION_LIST_HISTORY_NON_FUNCTIONAL);
}

/**
 * Configure delay after speak
 */
function delay() {
	clearTimeout(timeout);
	timeout = setTimeout(function () {
		commands = {};
	}, 20000); // 20 secs
}

/**
 * @description Receive command by inject listener content script
 */
chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
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
chrome.commands.onCommand.addListener(function (command) {
	if (command == 'active') {
		init();
	}
});