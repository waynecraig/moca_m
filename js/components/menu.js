require('../../sass/menu.sass');
var React = require('react');

var Menu = React.createClass({

	propTypes: {
		data: React.PropTypes.array.isRequired,
		isOpen: React.PropTypes.bool.isRequired,
		onClick: React.PropTypes.func
	},

	getDefaultProps: function() {
		var url = location.href,
			noFrontPage = false,
			data = [{
				name: '首页',
				iconClass: 'icon-home',
				url: 'index.html'
			},{
				name: '展览',
				iconClass: '',
				url: 'exhibition.html'
			},{
				name: '研究典藏',
				iconClass: '',
				url: 'collection.html'
			},{
				name: '公共教育',
				iconClass: '',
				url: 'education.html'
			},{
				name: '关于美术馆',
				iconClass: '',
				url: 'about.html'
			},{
				name: '参数指南',
				iconClass: '',
				url: 'visitorGuide.html'
			},{
				name: '联系方式',
				iconClass: '',
				url: 'contact.html'
			}].map(function(item){
				if (url.indexOf(item.url) !== -1) {
					item.tailClass = 'active';
					noFrontPage = true;
				} else {
					item.tailClass = '';
				}
				return item;
			});
		if (!noFrontPage) {
			data[0].tailClass = 'active';
		}
		return {data: data};
	},

	render: function(){
		return (
			<div className={this.props.isOpen ? "menu open" : "menu"} onClick={this.props.onClick}>
				<ul>
					{ this.props.data.map(function(item, i) {
						return (
							<li key={i}>
								<a href={item.url}>
									<span className={"menu-head icon " + item.iconClass}></span>
									<span>{item.name}</span>
									<span className={"menu-tail " + item.tailClass}>●</span>
								</a>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}

});

module.exports = Menu;
