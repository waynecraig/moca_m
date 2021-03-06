var AppDispatcher = require('../dispatcher/appDispatcher');
var MocaConstants = require('../constants/mocaConstants');

var FrontAction = {

	fetchList: function() {
		AppDispatcher.handleViewAction({
			actionType: MocaConstants.FRONT_FETCH_LIST
		});
	},

	fetchDetail: function(id) {
		AppDispatcher.handleViewAction({
			actionType: MocaConstants.FRONT_FETCH_DETAIL,
			id: id
		});
	}

};

module.exports = FrontAction;
