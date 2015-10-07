require('../sass/collection.sass');
var React = require('react');
var Header = require('./components/header');
var Shelf = require('./components/shelf');
var Footer = require('./components/footer');
var CollectionStore = require('./stores/collectionStore');
var CollectionAction = require('./actions/collectionAction');

var Collection = React.createClass({

	getInitialState: function() {
		return CollectionStore.getData();
	},

	render: function() {
		return (
			<div>
				<Header/>
				<Shelf index={this.state.shelfIndex}
					data={this.state.shelfData}
					updateItem={this.updateItem}>
				</Shelf>
				<Footer/>
			</div>
		)
	},

	componentDidMount: function() {
		CollectionStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		CollectionStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(CollectionStore.getData());
	},

	updateItem: function(item) {
		if (!item._detail) {
			CollectionAction.fetchDetail(item.id);
		}
	}

});

var collection = <Collection/>;
React.render(collection, document.body);
CollectionAction.fetchList();
