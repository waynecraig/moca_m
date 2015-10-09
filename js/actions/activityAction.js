var AppDispatcher = require('../dispatcher/appDispatcher');
var MocaConstants = require('../constants/mocaConstants');

var ActivityAction = {
	
	fetchList: function() {
		AppDispatcher.handleViewAction({
			actionType: MocaConstants.ACTIVITY_FETCH_LIST
		});
	},

	fetchDetail: function(id) {
		AppDispatcher.handleViewAction({
			actionType: MocaConstants.ACTIVITY_FETCH_DETAIL,
			id: id
		});
	}
};

module.exports = ActivityAction;
