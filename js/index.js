require('../sass/index.sass');
var React = require('react');
var Header = require('./components/header');
var Slider = require('./components/slider');
var Entry = require('./components/entry');
var Footer = require('./components/footer');
var FrontStore = require('./stores/frontStore');
var FrontAction = require('./actions/frontAction');

var Index = React.createClass({

	getInitialState: function() {
		return FrontStore.getData();
	},

	render: function() {
		return (
			<div>
				<Header/>
				<Slider data={this.state.sliderData}></Slider>
				<div className="entries" ref="entries">
					{this.state.entries.map(function(item, i){
						return (
						<Entry key={i} 
							name={item.name} 
							icon={item.icon} 
							link={item.link} 
						/>
						)
					})}
				</div>
				<Footer/>
			</div>
		)
	},

	componentDidMount: function() {
		FrontStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		FrontStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(FrontStore.getData());
	}

});

var index = <Index/>;
React.render(index, document.body);
FrontAction.fetch();
