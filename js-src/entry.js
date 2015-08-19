require('../sass/entry.sass');
var React = require('react');

var Entry = React.createClass({

	propTypes: {
		name: React.PropTypes.string.isRequired,
		icon: React.PropTypes.string.isRequired,
		link: React.PropTypes.string.isRequired,
		color: React.PropTypes.string.isRequired
	},

	getInitialState: function() {
		return {
			isAdded: false
		};
	},

	render: function() {
		var entryStyle = {
			backgroundColor: this.props.color
		};
		return (
		<a href = {this.props.link}>
			<div className={this.state.isAdded ? "entry added" : "entry"} style={entryStyle}>
				<img className="icon" src={this.props.icon} />
				<p className="name">{this.props.name}</p>
			</div>
		</a>
		)
	},

	componentDidMount: function() {
		this.setState({isAdded: true});
	}

});

module.exports = Entry;
