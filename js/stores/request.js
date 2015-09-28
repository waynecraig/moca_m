var Promise = window.Promise || require('es6-promise').Promise;
var realPath = '../admin/?q=service/',
	mockPath = './datamock/';

var Request = {

	getJSON: function(url) {
		return new Promise(function(resolve, reject){
			var client = new XMLHttpRequest();
			client.open("GET", url);
			client.onreadystatechange = handler;
			client.responseType = "json";
			client.setRequestHeader("Accept", "application/json");
			client.send();

			function handler() {
				if (this.readyState === this.DONE) {
					if (this.status === 200) { resolve(this.response); }
					else { reject(this); }
				}
			};
		});
	},

	getData: function(name) {
		if (!/\.json$/.test(name)) {
			name += '.json';
		}
		var handleData = function(data) { return data; };
		var self = this;
		return this.getJSON(realPath + name).then(handleData, function() {
			return self.getJSON(mockPath + name).then(handleData);
		});
	},

	getMultiData: function(names) {
		var self = this;
		return Promise.all(names.map(function(item) {
			return self.getData(item);
		}));
	}
};

module.exports = Request;
