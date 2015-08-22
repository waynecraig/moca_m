require('../sass/header.sass');
var React = require('react');
var Menu = require('./menu');

var Header = React.createClass({

	getInitialState: function() {
		return {
			isMenuOpen: false
		};
	},

	openMenu: function() {
		this.setState({isMenuOpen: true});
	},

	closeMenu: function() {
		this.setState({isMenuOpen: false});
	},

	render: function(){
		return (
			<div className="header">
				<a href="./index.html">
					<img className="logo" src={require('../img/logo.png')}/>
				</a>
				<span className="icon icon-menu menu-trigger" onClick={this.openMenu}></span>
				<Menu isOpen={this.state.isMenuOpen} onClick={this.closeMenu}/>
			</div>
		)
	}

});

module.exports = Header;
