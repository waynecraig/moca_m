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
		console.log(this.props.list);
		var self = this;
		return (
			<ul className='list'>
				{this.props.list.map(function(id) {
					var coverStyle = {
						backgroundImage: 'url(' + self.props.objs[id].imgurl + ')'
					};
					return (
						<li>
							<div className='cover' 
								style={coverStyle} 
								onClick={self.handleClick}
								data-id={id}/>
							<h4 onClick={self.handleClick}
								data-id={id}>{self.props.objs[id].title}</h4>
							<p>展览时间: {self.props.objs[id].date}</p>
						</li>
					)
				})}
			</ul>
		)
	}

});

module.exports = List;
