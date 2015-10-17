var AppDispatcher = require('../dispatcher/appDispatcher');
var MocaConstants = require('../constants/mocaConstants');

var VisitorguideAction = {
	
	fetchData: function() {
		AppDispatcher.handleViewAction({
			actionType: MocaConstants.VISITORGUIDE_FETCH_DATA
		});
	}

};

module.exports = VisitorguideAction;
