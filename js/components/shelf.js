require('../../sass/shelf.sass');
var React = require('react');
var Gallery = require('./gallery');

var Shelf = React.createClass({

	propTypes: {
		index: React.PropTypes.array.isRequired,
		data: React.PropTypes.object.isRequired,
		updateItem: React.PropTypes.func
	},

	getInitialState: function() {
		return {
			focus: [],
			showDetail: false,
			detailIndex: 0
		};
	},

	handleNavClick: function(e) {
		var el = e.target;
		var level = el.getAttribute('data-level');
		var text = el.innerHTML;
		var focus = this.state.focus;
		focus[level] = text;
		this.setState({focus: focus});
	},

	handleItemClick: function(e) {
		var el = e.target;
		var index = parseInt(el.getAttribute('data-index'));
		this.setState({detailIndex: index, showDetail: true});
	},

	handleImgurlError: function(e) {
		var el = e.target;
		var id = parseInt(el.getAttribute('data-id'));
		var item = this.props.data[id];
		this.updateItem(item);
	},

	closeDetail: function() {
		this.setState({showDetail: false});
	},

	updateItem: function(item) {
		if (this.props.updateItem) {
			this.props.updateItem(item);
		}
	},

	render: function() {
		var d = this.props.index;
		var navs = [];
		var level = 0;
		var self = this;
		while(d[0] && d[0].nav) {
			navs.push(d.map(function(item, i){
				if (self.state.focus[level]) {
					if (self.state.focus[level] === item.nav) {
						d = item.subs;
					}
				} else {
					if (i === 0) {
						d = item.subs;
					}
				}
				return item.nav;
			}));
			level++;
		}
		return (
			<div className="shelf">
				{navs.map(function(nav, level){
					return (
						<ul key={level} className="nav">
							{nav.map(function(text, i){
								return (
									<li key={i} data-level={level} 
										onClick={self.handleNavClick}
										className={(self.state.focus[level] || nav[0]) === text ? 
												'active' : null}>
										{text}
									</li>
								)
							})}
						</ul>
					)
				})}
				<ul className="items">
					{d.map(function(item, i){
						var obj = self.props.data[item];
						var style = {
							backgroundImage: 'url(' + obj.imgurl + ')'
						};
						return (
							<li key={i}>
								<div style={style} data-index={i} onClick={self.handleItemClick}>
									{!obj._detail && function(){
										return <img className='hide' src={obj.imgurl} data-id={obj.id}
											onError={self.handleImgurlError}/>
									}()}
								</div>
							</li>
						)
					})}
				</ul>
				{function(){
					if (self.state.showDetail) {
						var galleryData = d.map(function(item){
							return self.props.data[item]
						});
						return (
							<Gallery 
								data={galleryData} 
								initIndex={self.state.detailIndex}
								handleClose={self.closeDetail}
								handleRender={self.updateItem}/>
						)
					}
				}()}
			</div>
		)
	}
});

module.exports = Shelf;
