require('../../sass/gallery.sass');
var React = require('react');
var CollectionAction = require('../actions/collectionAction');

var Gallery = React.createClass({

	propTypes: {
		data: React.PropTypes.array.isRequired,
		initIndex: React.PropTypes.number.isRequired,
		handleClose: React.PropTypes.func.isRequired
	},

	getInitialState: function() {
		return {
			offset: 0,
			showText: false
		};
	},

	updateOnNeed: function(item) {
		if (!item._detail) {
			CollectionAction.fetchDetail(item.id);
		}
	},

	handlePrev: function() {
		this.setState({offset: this.state.offset - 1});
	},

	handleNext: function() {
		this.setState({offset: this.state.offset + 1});
	},

	switchContent: function() {
		this.setState({showText: !this.state.showText});
	},

	render: function() {
		var item = this.props.data[this.props.initIndex + this.state.offset] || {};
		var noPrev = this.props.data.length === 0 || (this.props.initIndex+this.state.offset) === 0;
		var noNext = this.props.data.length - 1 <= (this.props.initIndex+this.state.offset);
		var contentStyle = {
			maxHeight: (document.body.clientHeight - 100) + 'px'
		};
		var self = this;
		this.updateOnNeed(item);
		return (
			<div className='gallery'>
				<div className='bar top'>{item.title}</div>
				<div className='content' style={contentStyle} onClick={this.switchContent}>
					{function() {
						if (self.state.showText) {
							return <div className='textContent'>{item.body}</div>
						} else {
							return <img className='imgContent' src={item.imgurl}/>
						}
					}()}
				</div>
				<div className='bar bottom'>
					<span className='icon icon-cross close'
						onClick={this.props.handleClose}></span>
					<span className={'icon icon-arrow-left prev'+(noPrev ? ' disable' : '')}
						onClick={noPrev ? undefined : this.handlePrev}></span>
					<span className={'icon icon-arrow-right next'+(noNext ? ' disable' : '')}
						onClick={noNext ? undefined : this.handleNext}></span>
				</div>
			</div>
		)
	}
});

module.exports = Gallery;
