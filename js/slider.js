require('../sass/slider.sass');
var React = require('react');

var Slider = React.createClass({

	propTypes: {
		data: React.PropTypes.array.isRequired,
		showImage: React.PropTypes.bool,
		showNav: React.PropTypes.bool,
		showText: React.PropTypes.bool
	},

	getDefaultProps: function() {
		return {
			showImage: true,
			showNav: true,
			showText: true
		};
	},

	getInitialState: function() {
		return {
			index: 0,
			offset: 0,
			step: 0,
			slideTime: 30,
			triggerLimit: 0.1,
			startX: -1
		};
	},

	getNextIndex: function () {
		return (this.state.index + 1 + this.props.data.length) % this.props.data.length;
	},

	getPrevIndex: function () {
		return (this.state.index - 1 + this.props.data.length) % this.props.data.length;
	},

	onImgTouchStart: function(e) {
		if (this.props.data.length > 1) {
			e.preventDefault();
			this.setState({startX: e.touches[0].clientX});
		}
	},
	onImgTouchMove: function(e) {
		if (this.state.startX >= 0) {
			if (this.props.data.length <= 1) return; 
			var offset = e.touches[0].clientX - this.state.startX;
			this.setState({offset: offset});
		}
	},
	onImgTouchEnd: function() {
		var width = this.getDOMNode().clientWidth,
			limit = width * this.state.triggerLimit,
			speed = Math.round(width / this.state.slideTime),
			offsetAbs = Math.abs(this.state.offset);
		if (offsetAbs >= limit) {
			var step = this.state.offset / offsetAbs * speed;
		} else {
			var step = -this.state.offset / offsetAbs * speed;
		}
		this.setState({step: step, startX : -1});
	},

	onNavClick: function(i){
		if (this.state.offset === 0) {
			this.setState({index: i});
		}
	},

	resolveSliding: function() {
		var offset = this.state.offset + this.state.step,
			width = this.getDOMNode().clientWidth,
			speed = Math.round(width / this.state.slideTime),
			index = this.state.index,
			step = this.state.step;
		if (offset > -speed && offset < speed) {
			offset = 0;
			step = 0;
		} else if (offset >= width) {
			offset = 0;
			step = 0;
			index = this.getPrevIndex();
		} else if (offset <= -width) {
			offset = 0;
			step = 0;
			index = this.getNextIndex();
		}
		this.setState({offset: offset, index: index, step: step});
	},

	componentDidUpdate: function() {
		if (this.state.step && this.state.startX < 0) {
			requestAnimationFrame(this.resolveSliding);
		}
	},

	render: function() {
		var self = this,
			imgConStyle = {left: this.state.offset + 'px'};
		return (
		<div className='slider'>
			{ this.props.showImage && 
			<div className='img-view'>
				<div className='img-con' 
					style={imgConStyle} 
					onTouchStart={this.onImgTouchStart} 
					onTouchMove={this.onImgTouchMove} 
					onTouchEnd={this.onImgTouchEnd}>
					
					{ this.props.data.map(function(item, i) {
						var additionClass = '';
						if (self.state.index === i) {
							additionClass = ' current';
						} else if (self.props.data.length <= 1) {
							additionClass = '';
						} else if (self.state.offset > 0 && self.getPrevIndex() === i) {
							additionClass = ' prev';
						} else if (self.state.offset < 0 && self.getNextIndex() === i) {
							additionClass = ' next';
						}
						var imgStyle = {backgroundImage: 'url(' + item.imgurl + ')'};
						return (<div style={imgStyle} key={i} 
							className={'img-item'+additionClass}/>);
					})}
				</div>
			</div>
			}

			{ this.props.showNav && 
			<div className='nav-view'>
				{ this.props.data.map(function(item, i) {
					return (<p key={i} onClick={function(){self.onNavClick(i);}}
						className={i === self.state.index ? 'current' : ''}></p>)
				})}
			</div>
			}

			{ this.props.showText &&
			<div className='text-view'>
				{ this.props.data.map(function(item, i) {
					return (
					<div key={i} className={i === self.state.index ? 'current' : ''}>
						<h3>{item.title}</h3>
					</div>
					);
				})}
			</div>
			}
		</div>
		);
	}
});

module.exports = Slider;
