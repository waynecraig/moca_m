var AppDispatcher = require('../dispatcher/appDispatcher');
var MocaConstants = require('../constants/mocaConstants');

var NodeAction = {
	
	fetch: function(id) {
		AppDispatcher.handleViewAction({
			actionType: MocaConstants.NODE_FETCH,
			id: id
		});
	}
};

module.exports = NodeAction;
