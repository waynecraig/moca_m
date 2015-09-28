var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var MocaConstants = require('../constants/mocaConstants');
var assign = require('object-assign');
var Request = require('./request');

var CHANGE_EVENT = 'change';

var _frontData = {
	sliderData: [],
	entries: [{
		name: '展览',
		icon: require('../../img/nav_01.png'),
		link: './exhibition.html'
	},{
		name: '研究典藏',
		icon: require('../../img/nav_02.png'),
		link: './collection.html'
	},{
		name: '公共教育',
		icon: require('../../img/nav_03.png'),
		link: './education.html'
	},{
		name: '关于美术馆',
		icon: require('../../img/nav_04.png'),
		link: './about.html'
	},{
		name: '参观指南',
		icon: require('../../img/nav_05.png'),
		link: './visitorGuide.html'
	}]
};

function fetch() {
	return Request.getData('m_front_cn.json').then(parse);
}

function parse(data) {
	_frontData.sliderData = data.map(function(item){
		return {
			title: item.node_title,
			text: item.body.replace(/^<[^>]*>$/, ''),
			imgurl: /src="([^"]*)"/.exec(item.field_image)[1],
			type: item.node_type,
			id: item.nid
		};
	});
	return true;
}

var FrontStore = assign({}, EventEmitter.prototype, {

	getData: function() {
		return _frontData;
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

			case MocaConstants.FRONT_FETCH:
				fetch().then(function(){
					FrontStore.emitChange();
				});
		
		}

		return true;
	
	})

});

module.exports = FrontStore;
