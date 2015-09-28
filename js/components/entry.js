require('../../sass/entry.sass');
var React = require('react');

var Entry = React.createClass({

	propTypes: {
		name: React.PropTypes.string.isRequired,
		icon: React.PropTypes.string.isRequired,
		link: React.PropTypes.string.isRequired
	},

	render: function() {
		return (
		<a href = {this.props.link}>
			<div className="entry">
				<img className="photo" src={this.props.icon} />
			</div>
		</a>
		)
	}

});

module.exports = Entry;
