var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var MocaConstants = require('../constants/mocaConstants');
var assign = require('object-assign');
var Request = require('./request');

var CHANGE_EVENT = 'change';

var _exhibitionData = {
	list: [],
	objs: {}
};

function fetchList() {
	return Request.getData('m_exhibition_cn').then(parseList);
}

function parseList(data) {
	_exhibitionData.list = parseCommonList(data);
	return true;
}

function parseCommonList(data) {
	return data.map(function(item){
		var obj = {
			imgurl: /src="([^"]*)"/.exec(item.field_image)[1],
			id: item.nid,
			title: item.node_title,
			date: parseDate(item)
		};
		_exhibitionData.objs[item.nid] = obj;
		return item.nid;
	});
}

function parseDate(item) {
	var e = /(\d\d\d\d\-\d\d\-\d\d).*(\d\d\d\d\-\d\d\-\d\d)?/;
	var r = item.field_date.match(e);
	if (r) {
		r.shift();
		if (!r[1]) {
			r[1] = r[0];
		}
		return r.map(function(s) {
			return s.replace('-', '.');	
		}).join(' - ');
	} else {
		return '';
	}
}

var ExhibitionStore = assign({}, EventEmitter.prototype, {

	getData: function() {
		return _exhibitionData;
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

			case MocaConstants.EXHIBITION_FETCH_LIST:
				fetchList().then(function(){
					ExhibitionStore.emitChange();
				});
				break;
		
		}

		return true;
	
	})

});

module.exports = ExhibitionStore;
