const ENDPOINT_GET_PROFILE = 'https://{{url}}/rest/api/2/myself',
	ENDPOINT_GET_STORIES = 'https://{{url}}/rest/api/2/search?jql=project={{project}} AND IssueType in ("Story") AND sprint in openSprints() ORDER BY priority ASC',
	ENDPOINT_GET_NON_FUNCTIONAL_STORIES = 'https://{{url}}/rest/api/2/search?jql=project={{project}} AND IssueType in ("Nonfunctional Story") AND sprint in openSprints() ORDER BY priority ASC';

class Jira {

	constructor() {
		this.http = new Http();
	}

	profile(url) {
		return this.get(S(ENDPOINT_GET_PROFILE).template({
			url: url
		}).s);
	}

	stories(url, project) {
		return this.get(S(ENDPOINT_GET_STORIES).template({
			url: url,
			project: project
		}).s);
	}

	nonFunctionalStories(url, project) {
		return this.get(S(ENDPOINT_GET_NON_FUNCTIONAL_STORIES).template({
			url: url,
			project: project
		}).s);
	}

	get(endpoint) {
		return new Promise((resolve, reject) => {
			this.http.get(endpoint).then(
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