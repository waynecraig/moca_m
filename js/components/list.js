require('../../sass/list.sass');
var React = require('react');

var List = React.createClass({
	
	propTypes: {
		list: React.PropTypes.array.isRequired,
		objs: React.PropTypes.object.isRequired
	},

	handleClick: function(e) {
		var el = e.target;
		var id = parseInt(el.getAttribute('data-id'));
		if (id) {
			location.href = './node.html?id=' + id;
		}
	},

	render: function() {
		var self = this;
		return (
			<ul className='list'>
				{this.props.list.map(function(id) {
					var coverStyle = {
						backgroundImage: 'url(' + self.props.objs[id].imgurl + ')'
					};
					return (
						<li key={id} className='item'>
							<div className='cover' 
								style={coverStyle} 
								onClick={self.handleClick}
								data-id={id}/>
							<div className='content'>
								<h4 onClick={self.handleClick}
									data-id={id}>{self.props.objs[id].title}</h4>
								{self.props.objs[id].date && 
									<p>展览时间: {self.props.objs[id].date}</p>}
								{self.props.objs[id].createTime && 
									<p>{self.props.objs[id].createTime}</p>}
								{self.props.objs[id].body && 
									<p>{self.props.objs[id].body}</p>}
							</div>
						</li>
					)
				})}
			</ul>
		)
	}

});

module.exports = List;
