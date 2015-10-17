var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var MocaConstants = require('../constants/mocaConstants');
var assign = require('object-assign');
var Request = require('./request');
var NodeParser = require('./nodeParser');

var CHANGE_EVENT = 'change';

var _aboutData = {
	list: [],
	objs: {},
	coverImgurl: require('../../img/about.png')
};

var excludeTitles = /^(学术委员会|联系我们)$/;

function fetchList() {
	return Request.getData('about_cn').then(parseList);
}

function fetchDetail(id) {
	return Request.getData('node/' + id + '.json').then(parseDetail);
}

function parseList(data) {
	 _aboutData.list = data.map(function(item){
		var obj = {
			id: item.nid,
			title: item.node_title
		};
		if (!excludeTitles.test(obj.title)) {
			_aboutData.objs[item.nid] = obj;
			return item.nid;
		}
	}).reduce(function(pre, cur) {
		if (typeof cur !== 'undefined') {
			pre.push(cur);
		}
		return pre;
	}, []);
	return true;
}

function parseDetail(data) {
	var col = NodeParser.parse(data, ['imgurl', 'body', 'photos']);
	assign(_aboutData.objs[data.nid], col, {_detail: true});
	return true;
}

var AboutStore = assign({}, EventEmitter.prototype, {

	getData: function() {
		return _aboutData;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	dispatcherIndex: AppDispatcher.register(function(payload) {
		var action = payload.action;
		
		switch(action.actionType) {

			case MocaConstants.ABOUT_FETCH_LIST:
				fetchList().then(function(){
					AboutStore.emitChange();
				});
				break;
		
			case MocaConstants.ABOUT_FETCH_DETAIL:
				fetchDetail(action.id).then(function(){
					AboutStore.emitChange();
				});
				break;
		}

		return true;
	
	})

});

module.exports = AboutStore;
