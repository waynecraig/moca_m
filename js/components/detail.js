require('../../sass/detail.sass');
var React = require('react');
var Shelf = require('./shelf');

var Detail = React.createClass({
	
	propTypes: {
		data: React.PropTypes.object.isRequired,
		hideTitle: React.PropTypes.bool
	},

	render: function() {
		return (
			<div className='detail'>
				{!!this.props.data.imgurl && <img className='cover' src={this.props.data.imgurl}/>}
				{!this.props.hideTitle && <h3 className='title'>{this.props.data.title}</h3>}
				<div className='info'>
					{!!this.props.data.date && <p>时间：{this.props.data.date}</p>}
					{!!this.props.data.locate && <p>地点：{this.props.data.locate}</p>}
					{!!this.props.data.organizer && <p>策展人：{this.props.data.organizer}</p>}
				</div>
				{!!this.props.data.body && function(body, photos) {
					var imgIndex = photos && photos.index;
					var imgData = photos && photos.data;
					body = body.split('\n');
					return (
						<div className='content'>
							{body.map(function(line, i){
								var r = line.match(/\[img\-(\d+)\]/);
								if (r && imgIndex && imgData) {
									var n = parseInt(r[1]);
									photos._inlineImg = true;
									return <img key={i} src={imgData[imgIndex[n]].imgurl}/>
								} else {
									return <p key={i}>{line}</p>
								}
							})}
						</div>
					)
				}(this.props.data.body, this.props.data.photos)}
				{!!this.props.data.photos && !this.props.data.photos._inlineImg &&
					<Shelf index={this.props.data.photos.index} 
						data={this.props.data.photos.data}/>}
			</div>
		)
	}

});

module.exports = Detail;
