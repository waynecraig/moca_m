var React = require('react');

var Shelf = React.createClass({

	propTypes: {
		data: React.PropTypes.array.isRequired
	},
	
	render: function() {
		return (
			<ul className="nav">
				{this.props.data.map(function(item, i){
					return <li key={i} onClick={item.callback}>{item.name}</li>
				})}
			</ul>
		)
	}
});

module.exports = Shelf;
