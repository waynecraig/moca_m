var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var MocaConstants = require('../constants/mocaConstants');
var assign = require('object-assign');
var Request = require('./request');
var NodeParser = require('../stores/nodeParser');

var CHANGE_EVENT = 'change';

var _collectionData = {
	shelfIndex: [{
		nav: '典藏',
		subs: [{
				nav: '全部',
				subs: []
			},{
				nav: '晚清',
				subs: []
			},{
				nav: '当代',
				subs: []
			},{
				nav: '老地图',
				subs: []
			}],
	}, {
		nav: '出版物',
		subs: []
	}, {
		nav: '学术交流',
		subs: []
	}],
	shelfData: {}
};

function fetchList() {
	return Request.getMultiData([
		'collection_type_cn',
		'm_collection_cn',
		'm_publication_cn',
		'm_exchange_cn'
	]).then(parseList);
}

function fetchDetail(id) {
	return Request.getData('node/' + id + '.json').then(parseDetail);
}

function parseList(data) {
	var collectionType = data[0];
	var collection = data[1];
	var publication = data[2];
	var exchange = data[3];
	_collectionData.shelfIndex = [
		{
			nav: '典藏',
			subs: parseCollectionList(collectionType, collection)
		}, {
			nav: '出版物',
			subs: parseCommonList(publication)
		}, {
			nav: '学术交流',
			subs: parseCommonList(exchange)
		}
	];
	return true;
}

function parseCollectionList(collectionType, collection) {
	collection = collection.map(function(item){
		var colObj = {
			author: item.field_author,
			imgurl: /src="([^"]*)"/.exec(item.field_image)[1],
			type: item.field_type,
			id: item.nid,
			title: item.node_title
		};
		_collectionData.shelfData[item.nid] = colObj;
		return item.nid;
	});
	var subs = collectionType.map(function(item){
		return [{
			nav: item.node_title,
			subs: collection.map(function(col) {
					var colObj = _collectionData.shelfData[col];
					if (colObj.type === item.nid) {
						return [col];
					} else {
						return [];
					}
				}).reduce(function(pre, cur) {
					return pre.concat(cur);
				}, [])
		}];
	}).reduce(function(pre, cur) {
		return pre.concat(cur);
	}, []);
	if (subs && subs.length) {
		subs.unshift({
			nav: '全部',
			subs: collection
		});
	} else {
		subs = collection;
	}
	return subs;
}

function parseCommonList(data) {
	return data.map(function(item){
		var obj = {
			imgurl: /src="([^"]*)"/.exec(item.field_image)[1],
			id: item.nid,
			title: item.node_title
		};
		_collectionData.shelfData[item.nid] = obj;
		return item.nid;
	});
}

function parseDetail(data) {
	var col = NodeParser.parse(data, ['imgurl', 'body']);
	assign(_collectionData.shelfData[data.nid], col, {_detail: true});
	return true;
}

var CollectionStore = assign({}, EventEmitter.prototype, {

	getData: function() {
		return _collectionData;
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

			case MocaConstants.COLLECTION_FETCH_LIST:
				fetchList().then(function(){
					CollectionStore.emitChange();
				});
				break;

			case MocaConstants.COLLECTION_FETCH_DETAIL:
				fetchDetail(action.id).then(function(){
					CollectionStore.emitChange();
				});
				break;
		
		}

		return true;
	
	})

});

module.exports = CollectionStore;
