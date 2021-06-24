import BaseApi from "./BaseApi";

export default class Api extends BaseApi {
	constructor(url, token = "") {
		super();
		this.url = url;
		this.token = token;
	}

	//No support for the experimental syntax 'classPrivateMethods'
	__request(method, url, body = {}) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(method, url);

			xhr.responseType = "json";
			xhr.setRequestHeader("Content-type", "application/json");
			if (this.token) xhr.setRequestHeader("Authorization", this.token);

			xhr.onload = () => {
				if (xhr.status >= 400) {
					reject(xhr.responce);
				} else {
					resolve(xhr.response);
				}
			};

			xhr.onerror = () => {
				reject(xhr.responce);
			};

			xhr.send(JSON.stringify(body));
		});
	}

	GET(url = this.url) {
		return this.__request("GET", url);
	}

	POST(body = {}, url = this.url) {
		return this.__request("POST", url, body);
	}

	DELETE(body = {}, url = this.url) {
		return this.__request("DELETE", url, body);
	}
}
