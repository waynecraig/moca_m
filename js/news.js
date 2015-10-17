require('../sass/news.sass');
var React = require('react');
var render = require('react-dom').render;
var Header = require('./components/header');
var List = require('./components/list');
var Footer = require('./components/footer');
var NewsStore = require('./stores/newsStore');
var NewsAction = require('./actions/newsAction');

var News = React.createClass({

	getInitialState: function() {
		return NewsStore.getData();
	},

	render: function() {
		var self = this;
		return (
			<div>
				<Header/>
				<div className='news'>
					<List list={self.state.list} objs={self.state.objs}></List>
				</div>
				<Footer/>
			</div>
		)
	},

	componentDidMount: function() {
		NewsStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		NewsStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(NewsStore.getData());
	}

});

var news = <News/>;
render(news, document.getElementById('moca'));
NewsAction.fetchList();
