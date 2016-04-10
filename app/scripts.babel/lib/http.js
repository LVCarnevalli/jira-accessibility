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
		return new Promise((resolve, reject) => {
			var request = new XMLHttpRequest();
			request.onreadystatechange = () => {
				if (request.readyState == XMLHttpRequest.DONE) {
					if (request.status == 200) {
						resolve(request.response);
					} else {
						reject(new Error(request.statusText));
					}
				}
			}
			request.onerror = () => {
				reject(new Error('XMLHttpRequest Error: ' + request.statusText));
			};
			request.open('GET', url);
			request.send();
		});
	}

}