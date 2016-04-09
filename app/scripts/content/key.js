'use strict';

/**
 * Define shortcuts for options.
 * @type key codes
 */
var shortcuts = {
  49: 'option1',
  50: 'option2',
  51: 'option3',
  52: 'option4',
  53: 'option5'
};

/**
 * Listener onKeyDown, inject in pages.
 * @param event
 * @return response command
 */
window.onkeydown = function (event) {
  var command = shortcuts[event.keyCode];
  if (command) {
    chrome.extension.sendRequest({
      type: 'command',
      command: command
    }, function (response) {});
  }
};