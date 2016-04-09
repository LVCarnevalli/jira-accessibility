class Jira {

	constructor() {
		this.http = new Http();
	}

	profile(url) {
		return new Promise((resolve, reject) => {
			this.http.get('https://' + url + '/rest/api/2/myself').then(
				(response) => {
					resolve(JSON.parse(response));
				}, (error) => {
					reject(error);
				});
		});
	}

	errors(error) {
		if (S(error).contains('Unauthorized'))
			return UNAUTHORIZED;
		return GENERIC_ERROR;
	}

}