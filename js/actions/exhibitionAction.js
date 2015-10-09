var AppDispatcher = require('../dispatcher/appDispatcher');
var MocaConstants = require('../constants/mocaConstants');

var ExhibitionAction = {
	
	fetchList: function() {
		AppDispatcher.handleViewAction({
			actionType: MocaConstants.EXHIBITION_FETCH_LIST
		});
	}
};

module.exports = ExhibitionAction;
