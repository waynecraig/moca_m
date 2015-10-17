var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var MocaConstants = require('../constants/mocaConstants');
var assign = require('object-assign');
var Request = require('./request');
var NodeParser = require('../stores/nodeParser');

var CHANGE_EVENT = 'change';

var _nodeData = {
	node: {}
};

function fetch(id) {
	return Request.getData('node/' + id + '.json').then(parseDetail);
}

function parseDetail(data) {
	var attrs = ['imgurl', 'title', 'body', 'date', 'locate', 'organizer', 'photos'];
	if (data.type === 'news') {
		attrs.shift();
	}
	_nodeData.node = NodeParser.parse(data, attrs);
	return true;
}

var NodeStore = assign({}, EventEmitter.prototype, {

	getData: function() {
		return _nodeData;
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

			case MocaConstants.NODE_FETCH:
				fetch(action.id).then(function(){
					NodeStore.emitChange();
				});
				break;
		
		}

		return true;
	
	})

});

module.exports = NodeStore;
