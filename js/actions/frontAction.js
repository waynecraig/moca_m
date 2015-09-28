var AppDispatcher = require('../dispatcher/appDispatcher');
var MocaConstants = require('../constants/mocaConstants');

var FrontAction = {

	fetch: function() {
		AppDispatcher.handleViewAction({
			actionType: MocaConstants.FRONT_FETCH
		});
	}
};

module.exports = FrontAction;
