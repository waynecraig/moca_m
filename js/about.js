require('../sass/about.sass');
var React = require('react');
var render = require('react-dom').render;
var Header = require('./components/header');
var ExpandList = require('./components/expandList');
var Footer = require('./components/footer');
var AboutStore = require('./stores/aboutStore');
var AboutAction = require('./actions/aboutAction');

var About = React.createClass({

	getInitialState: function() {
		return AboutStore.getData();
	},

	render: function() {
		return (
			<div>
				<Header/>
				<div className='about'>
					<img className='about-cover' src={this.state.coverImgurl}/>
					<ExpandList list={this.state.list} objs={this.state.objs} 
						toggleItem={this.toggleItem}/>
				</div>
				<Footer/>
			</div>
		)
	},

	componentDidMount: function() {
		AboutStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AboutStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(AboutStore.getData());
	},

	toggleItem: function(item) {
		if (!item._detail) {
			AboutAction.fetchDetail(item.id);
		}
		item.showDetail = !item.showDetail;
		AboutStore.emitChange();
	}

});

var about = <About/>;
render(about, document.getElementById('moca'));
AboutAction.fetchList();
