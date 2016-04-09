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
		return new Promise(
			function(resolve, reject) {
				var request = new XMLHttpRequest();
				request.onreadystatechange = function() {
					if (this.readyState === XMLHttpRequest.DONE) {
						if (this.status === 200) {
							resolve(this.response);
						} else {
							reject(new Error(this.statusText));
						}
					}
				}
				request.onerror = function() {
					reject(new Error('XMLHttpRequest Error: ' + this.statusText));
				};
				request.open('GET', url);
				request.send();
			});
	}

}