require('../sass/collection.sass');
var React = require('react');
var Request = require('./request');
var Header = require('./header');
var Nav = require('./nav');

var Collection = React.createClass({

	getInitialState: function() {
		return {
			mainNav: [{
				name: '典藏',
				callback: function(){}
			},{
				name: '出版物',
				callback: function(){}
			},{
				name: '学术交流',
				callback: function(){}
			}]
		}
	},

	render: function() {
		return (
			<div>
				<Header/>
				<Nav data={this.state.mainNav}/>
			</div>
		)
	}

});

var collection = <Collection/>;
React.render(collection, document.body);
