var MocaConstants = require('../constants/mocaConstants');

var mapping = {
	title: 0,
	imgurl: 1,
	body: 2
};

var parsers = [
	// 0 title parser
	function (oriData) {
		return oriData.node_title;
	},
	// 1 imgurl parser
	function (oriData) {
		var imgurl = '';
		try {
			imgurl = oriData.field_image.und[0].uri
				.replace('public://', MocaConstants.PUBLIC_IMG_BASE);
		} catch(e) { }
		return imgurl;
	},
	// 2 body parser
	function (oriData) {
		var body = '';
		try {
			body = oriData.body.und[0].value;
		} catch(e) { }
		return body;
	}
];

var NodeParser = {
	parse: function(oriData, attrs) {
		return attrs.map(function(attr){
			return parsers[mapping[attr]](oriData);
		}).reduce(function(pre, cur, i){
			pre[attrs[i]] = cur;
			return pre;
		}, {});
	}
};

module.exports = NodeParser;
