var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var MocaConstants = require('../constants/mocaConstants');
var assign = require('object-assign');
var Request = require('./request');

var CHANGE_EVENT = 'change';

var _newsData = {
	list: [],
	objs: {}
};

function fetchList() {
	return Request.getData('news_cn').then(parseList);
}

function parseList(data) {
	_newsData.list = parseCommonList(data);
	return true;
}

function parseCommonList(data) {
	return data.map(function(item){
		var imgurl = /src="([^"]*)"/.exec(item.field_image);
		var obj = {
			imgurl: imgurl ? imgurl[1] : '',
			id: item.nid,
			title: item.node_title,
			createTime: parseCreateTime(item)
		};
		_newsData.objs[item.nid] = obj;
		return item.nid;
	});
}

function parseCreateTime(item) {
	if (item.node_created) {
		var str = new Date(item.node_created * 1000).toLocaleString('zh-CN');
		str = str.match(/(\d+)\/(\d+)\/(\d+)/);
		if (str) {
			str.shift();
			return str.map(function(item){
				if (item.length < 2) {
					return '0' + item;
				} else {
					return item;
				}
			}).join('.');
		} else {
			return '';
		}
	} else {
		return '';
	}
}

var NewsStore = assign({}, EventEmitter.prototype, {

	getData: function() {
		return _newsData;
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

			case MocaConstants.NEWS_FETCH_LIST:
				fetchList().then(function(){
					NewsStore.emitChange();
				});
				break;
		
		}

		return true;
	
	})

});

module.exports = NewsStore;
