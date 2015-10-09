var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var MocaConstants = require('../constants/mocaConstants');
var assign = require('object-assign');
var Request = require('./request');
var NodeParser = require('./nodeParser');

var CHANGE_EVENT = 'change';

var _activityData = {
	listCurrent: [],
	listPreview: [],
	listReview: [],
	objs: {}
};

function fetchList() {
	return Request.getData('activity_cn').then(parseList);
}

function fetchDetail(id) {
	return Request.getData('node/' + id + '.json').then(parseDetail);
}

function parseList(data) {
	 data.map(function(item){
		var obj = {
			id: item.nid,
			title: item.node_title,
			date: parseDate(item)
		};
		_activityData.objs[item.nid] = obj;
		return obj;
	}).map(allocateObj);
	return true;
}

function parseDate(item) {
	var e = /\d\d\d\d\-\d\d\-\d\d/g;
	var r = [];
	var m;
	while((m = e.exec(item.field_date)) !== null) {
		r.push(m[0]);
	}
	if (r.length) {
		return r.map(function(s) {
			return s.replace(/\-/g, '.');	
		}).join(' - ');
	} else {
		return '';
	}
}

function allocateObj(obj) {
	if (obj.date) {
		var ds = obj.date.split('-').map(function(item){
			return new Date(item).getTime();
		});
		if (!ds[1]) {
			ds[1] = ds[0] + 864000000;
		}
		var n = new Date().getTime();
		if (n < ds[0]) {
			_activityData.listPreview.push(obj.id);
		} else if (n > ds[1]) {
			_activityData.listReview.push(obj.id);
		} else {
			_activityData.listCurrent.push(obj.id);
		}
	} else {
		_cativityData.listCurrent.push(obj.id);
	}
}

function parseDetail(data) {
	var col = NodeParser.parse(data, ['imgurl', 'body', 'photos']);
	assign(_activityData.objs[data.nid], col, {_detail: true});
	return true;
}

var ActivityStore = assign({}, EventEmitter.prototype, {

	getData: function() {
		return _activityData;
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

			case MocaConstants.ACTIVITY_FETCH_LIST:
				fetchList().then(function(){
					ActivityStore.emitChange();
				});
				break;
		
			case MocaConstants.ACTIVITY_FETCH_DETAIL:
				fetchDetail(action.id).then(function(){
					ActivityStore.emitChange();
				});
				break;
		}

		return true;
	
	})

});

module.exports = ActivityStore;
