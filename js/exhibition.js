require('../sass/exhibition.sass');
var React = require('react');
var Header = require('./components/header');
var Footer = require('./components/footer');

var Exhibition = React.createClass({

	render: function() {
		return (
			<div>
				<Header/>
				<Footer/>
			</div>
		)
	}

});

var exhibition = <Exhibition/>;
React.render(exhibition, document.body);
