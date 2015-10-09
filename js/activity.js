require('../sass/activity.sass');
var React = require('react');
var Header = require('./components/header');
var ExpandList = require('./components/expandList');
var Footer = require('./components/footer');
var ActivityStore = require('./stores/activityStore');
var ActivityAction = require('./actions/activityAction');

var Activity = React.createClass({

	getInitialState: function() {
		return ActivityStore.getData();
	},

	render: function() {
		var self = this;
		return (
			<div>
				<Header/>
				<div className='activity'>
					{this.state.listCurrent.length ? function(list, objs){
						return (
							<div className='list'>
								<h2>当前活动</h2>
								<ExpandList list={list} objs={objs} toggleItem={self.toggleItem}/>
							</div>
						)
					}(this.state.listCurrent, this.state.objs) : ''}

					{this.state.listPreview.length ? function(list, objs){
						return (
							<div className='list'>
								<h2>活动预告</h2>
								<ExpandList list={list} objs={objs} toggleItem={self.toggleItem}/>
							</div>
						)
					}(this.state.listPreview, this.state.objs) : ''}
					
					{this.state.listReview.length ? function(list, objs){
						return (
							<div className='list'>
								<h2>活动回顾</h2>
								<ExpandList list={list} objs={objs} toggleItem={self.toggleItem}/>
							</div>
						)
					}(this.state.listReview, this.state.objs) : ''}
				</div>
				<Footer/>
			</div>
		)
	},

	componentDidMount: function() {
		ActivityStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ActivityStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(ActivityStore.getData());
	},

	toggleItem: function(item) {
		if (!item._detail) {
			ActivityAction.fetchDetail(item.id);
		}
		item.showDetail = !item.showDetail;
		ActivityStore.emitChange();
	}

});

var activity = <Activity/>;
React.render(activity, document.body);
ActivityAction.fetchList();
