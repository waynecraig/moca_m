var AppDispatcher = require('../dispatcher/appDispatcher');
var MocaConstants = require('../constants/mocaConstants');

var ExhibitionAction = {
	
	fetchList: function() {
		AppDispatcher.handleViewAction({
			actionType: MocaConstants.EXHIBITION_FETCH_LIST
		});
	},

	fetchDetail: function(id) {
		AppDispatcher.handleViewAction({
			actionType: MocaConstants.EXHIBITION_FETCH_DETAIL,
			id: id
		});
	}
};

module.exports = ExhibitionAction;
