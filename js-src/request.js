var realPath = '../admin/?q=service/',
	mockPath = './datamock/';

var Request = {
	get: function(name, success, error) {
		var self = this;
		this.getFromPath(name, realPath, success, function(){
			self.getFromPath(name, mockPath, success, error);
		});
	},

	getFromPath: function(name, path, success, error) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					success(xmlhttp.responseText);
				} else {
					error(xmlhttp.responseText);
				}
			}
		}
		xmlhttp.open('GET', path + name, true);
		xmlhttp.send();
	}
};

module.exports = Request;
