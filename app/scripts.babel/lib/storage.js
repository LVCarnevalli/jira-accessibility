class Storage {

	constructor(repository) {
		this.repository = repository;
	}

	seti(key, value) {
		this.get(this.repository).then((response) => {
			if (!response[this.repository]) {
				response[this.repository] = {};
			}
			response[this.repository][key] = value;

			chrome.storage.sync.set(response, () => {
				console.log('Settings saved => ' + JSON.stringify(response));
			});
		});
	}

	get(key) {
		return new Promise((resolve, reject) => {
			chrome.storage.sync.get(key, (response) => {
				if (chrome.runtime.error) {
					console.log('Error settings recovery');
					reject();
				}
				console.log('Settings recovery => ' + JSON.stringify(response));
				resolve(response);
			});
		});
	}

}