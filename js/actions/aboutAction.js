var AppDispatcher = require('../dispatcher/appDispatcher');
var MocaConstants = require('../constants/mocaConstants');

var AboutAction = {
	
	fetchList: function() {
		AppDispatcher.handleViewAction({
			actionType: MocaConstants.ABOUT_FETCH_LIST
		});
	},

	fetchDetail: function(id) {
		AppDispatcher.handleViewAction({
			actionType: MocaConstants.ABOUT_FETCH_DETAIL,
			id: id
		});
	}
};

module.exports = AboutAction;
