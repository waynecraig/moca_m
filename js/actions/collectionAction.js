var AppDispatcher = require('../dispatcher/appDispatcher');
var MocaConstants = require('../constants/mocaConstants');

var CollectionAction = {
	
	fetchList: function() {
		AppDispatcher.handleViewAction({
			actionType: MocaConstants.COLLECTION_FETCH_LIST
		});
	},

	fetchDetail: function(id) {
		AppDispatcher.handleViewAction({
			actionType: MocaConstants.COLLECTION_FETCH_DETAIL,
			id: id
		});
	}
};

module.exports = CollectionAction;
