require('../sass/node.sass');
var React = require('react');
var render = require('react-dom').render;
var Header = require('./components/header');
var Detail = require('./components/detail');
var Footer = require('./components/footer');
var NodeStore = require('./stores/nodeStore');
var NodeAction = require('./actions/nodeAction');

var Node = React.createClass({

	propsType: {
		id: React.PropTypes.number.isRequired
	},

	getInitialState: function() {
		return NodeStore.getData();
	},

	render: function() {
		var self = this;
		return (
			<div>
				<Header/>
				<div className='node'>
					<Detail data={self.state.node}></Detail>
				</div>
				<Footer/>
			</div>
		)
	},

	componentDidMount: function() {
		NodeStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		NodeStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(NodeStore.getData());
	}

});

var query = location.search.match(/id=(\d+)/);
var id = query && query[1] || 0;
var node = <Node id={id}/>;
render(node, document.getElementById('moca'));
NodeAction.fetch(id);
