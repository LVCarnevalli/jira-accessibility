class Storage {

	constructor() {
		this.repository = 'storage_jira_accessibility';
	}

	seti(key, value) {
		this.get().then((response) => {
			if (!response[this.repository]) {
				response[this.repository] = {};
			}
			response[this.repository][key] = value;

			chrome.storage.sync.set(response, () => {
				console.log('Settings saved => ' + JSON.stringify(response));
			});
		});
	}

	get() {
		return new Promise((resolve, reject) => {
			chrome.storage.sync.get(this.repository, (response) => {
				if (chrome.runtime.error) {
					console.log('Error settings recovery');
					reject();
				}
				console.log('Settings recovery => ' + JSON.stringify(response));
				resolve(response);
			});
		});
	}

	getf() {
		return new Promise((resolve, reject) => {
			this.get().then((response) => {
				if (!response || !response[this.repository]) {
					reject('storage is undefined');
				}
				response = response[this.repository];
				resolve({
					url: response['store.settings.url'],
					project: response['store.settings.project']
				});
			}, (error) => {
				reject('error get storage');
			});
		});
	}

}