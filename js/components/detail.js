require('../../sass/detail.sass');
var React = require('react');
var Shelf = require('./shelf');

var Detail = React.createClass({
	
	propTypes: {
		data: React.PropTypes.object.isRequired
	},

	render: function() {
		return (
			<div className='detail'>
				<img className='cover' src={this.props.data.imgurl} />
				<h3>{this.props.data.title}</h3>
				<div className='info'>
					<p>展览时间：{this.props.data.date}</p>
					<p>地点：{this.props.data.locate}</p>
					<p>策展人：{this.props.data.organizer}</p>
				</div>
				<div className='content'>
					{this.props.data.body}
				</div>
				{this.props.data.photos && 
					<Shelf index={this.props.data.photos.index} 
						data={this.props.data.photos.data}/>}
			</div>
		)
	}

});

module.exports = Detail;
