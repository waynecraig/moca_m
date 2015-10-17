var MocaConstants = require('../constants/mocaConstants');

var mapping = {
	title: 0,
	imgurl: 1,
	body: 2,
	date: 3,
	locate: 4,
	organizer: 5,
	photos: 6,
	type: 7
};

var parsers = [
	// 0 title parser
	function (oriData) {
		return oriData.title;
	},
	// 1 imgurl parser
	function (oriData) {
		var imgurl = '';
		try {
			imgurl = encodeURI(oriData.field_image.und[0].uri)
				.replace('public://', MocaConstants.PUBLIC_IMG_BASE);
		} catch(e) { }
		return imgurl;
	},
	// 2 body parser
	function (oriData) {
		var body = '';
		try {
			body = oriData.body.und[0].value.replace(/<[^>]*>/g, '');
		} catch(e) { }
		return body;
	},
	// 3 date parser
	function (oriData) {
		var date = '';
		try {
			date = oriData.field_date.und[0].value.match(/\d{4}\-\d{2}\-\d{2}/)[0].replace(/\-/g, '.');
		} catch(e) { }
		try {
			date += ' - ' 
				+ oriData.field_date.und[0].value2.match(/\d{4}\-\d{2}\-\d{2}/)[0].replace(/-/g, '.');
		} catch(e) { }
		return date;
	},
	//4 locate parser
	function (oriData) {
		var locate = '';
		try {
			locate = oriData.field_location.und[0].value;
		} catch(e) { }
		return locate;
	},
	// 5 organizer parser
	function (oriData) {
		var organizer = '';
		try {
			organizer = oriData.field_organizer.und[0].value;
		} catch(e) { }
		return organizer;
	},
	// 6 photos parser
	function (oriData) {
		var photos = {
			index: [],
			data: {}
		};
		try {
			oriData.field_photos.und.map(function(item, i) {
				var imgurl = encodeURI(item.uri.replace('public://', MocaConstants.PUBLIC_IMG_BASE));
				photos.index.push(i);
				photos.data[i] = {imgurl:imgurl};
			});
		} catch(e) { }
		return photos;
	},
	// 7 type parse
	function (oriData) {
		return oriData.type;
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
