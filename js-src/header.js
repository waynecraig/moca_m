require('../sass/header.sass');
var React = require('react');

var Header = React.createClass({

	render: function(){
		return (
			<div className="header">
				<a herf="./index.html">
					<img className="logo" src="./img/logo.png"/>
				</a>
			</div>
		)
	}

});

module.exports = Header;
