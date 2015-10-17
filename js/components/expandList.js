require('../../sass/expandList.sass');
var React = require('react');
var Detail = require('./detail');

var ExpandList = React.createClass({
	
	propTypes: {
		list: React.PropTypes.array.isRequired,
		objs: React.PropTypes.object.isRequired,
		toggleItem: React.PropTypes.func
	},

	handleClick: function(e) {
		if (this.props.toggleItem) {
			var el = e.target;
			var id = parseInt(el.getAttribute('data-id') || el.parentNode.getAttribute('data-id'));
			var item = this.props.objs[id];
			this.props.toggleItem(item);
		}
	},

	render: function() {
		var self = this;
		return (
			<ul className='expand-list'>
				{this.props.list.map(function(id) {
					return (
						<li key={id} className='expand-item'>
							<h3 data-id={id} className='item-title' onClick={self.handleClick}>
								<span className={'mark icon icon-' + 
									(self.props.objs[id].showDetail ? 'minus' : 'plus')}>
								</span>
								<span className='content'>{self.props.objs[id].title}</span>	
							</h3>
							{ self.props.objs[id].showDetail && 
								<Detail data={self.props.objs[id]} hideTitle={true}/>
							}
						</li>
					)
				})}
			</ul>
		)
	}

});

module.exports = ExpandList;
