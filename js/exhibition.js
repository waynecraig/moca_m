require('../sass/exhibition.sass');
var React = require('react');
var Header = require('./components/header');
var List = require('./components/list');
var Detail = require('./components/detail');
var Footer = require('./components/footer');
var ExhibitionStore = require('./stores/exhibitionStore');
var ExhibitionAction = require('./actions/exhibitionAction');

var Exhibition = React.createClass({

	getInitialState: function() {
		return ExhibitionStore.getData();
	},

	render: function() {
		var self = this;
		return (
			<div>
				<Header/>
				<div className='exhibition'>
					<List list={self.state.list} objs={self.state.objs}></List>
				</div>
				<Footer/>
			</div>
		)
	},

	componentDidMount: function() {
		ExhibitionStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ExhibitionStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(ExhibitionStore.getData());
	}

});

var exhibition = <Exhibition/>;
React.render(exhibition, document.body);
ExhibitionAction.fetchList();