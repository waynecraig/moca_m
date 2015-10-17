var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var MocaConstants = require('../constants/mocaConstants');
var assign = require('object-assign');
var Request = require('./request');

var CHANGE_EVENT = 'change';

var _visitorguideData = {
	data: {},
	coverImgurl: require('../../img/visitorguide.png')
};

function fetchData() {
	return Request.getData('visitorguide_cn').then(parseData);
}

function parseData(data) {
	if (data && data[0]) {
		_visitorguideData.data = {
			id: data[0].nid,
			title: data[0].node_title,
			body: data[0].body
		};
		if (data[0].field_lnglat) {
			var ll = data[0].field_lnglat.split(',');
			if (ll.length === 2) {
				_visitorguideData.data.position = [
					+ll[1],
					+ll[0]
				];
			}
		}
	}
	return true;
}

var VisitorguideStore = assign({}, EventEmitter.prototype, {

	getData: function() {
		return _visitorguideData;
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

			case MocaConstants.VISITORGUIDE_FETCH_DATA:
				fetchData().then(function(){
					VisitorguideStore.emitChange();
				});
				break;
		}

		return true;
	
	})

});

module.exports = VisitorguideStore;
