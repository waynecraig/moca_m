require('../sass/index.sass');
var React = require('react');
var Request = require('./request');
var Header = require('./header');
var Slider = require('./slider');
var Entry = require('./entry');
var Footer = require('./footer');

var Index = React.createClass({

	getInitialState: function() {
		return {
			sliderData: [],
			entries: [{
				name: '展览',
				icon: require('../img/nav_01.png'),
				link: './exhibition.html'
			},{
				name: '研究典藏',
				icon: require('../img/nav_02.png'),
				link: './collection.html'
			},{
				name: '公共教育',
				icon: require('../img/nav_03.png'),
				link: './education.html'
			},{
				name: '关于美术馆',
				icon: require('../img/nav_04.png'),
				link: './about.html'
			},{
				name: '参观指南',
				icon: require('../img/nav_05.png'),
				link: './visitorGuide.html'
			}]
		};
	},

	render: function() {
		return (
			<div>
				<Header/>
				<Slider data={this.state.sliderData}></Slider>
				<div className="entries" ref="entries">
					{this.state.entries.map(function(item, i){
						return (
						<Entry key={i} 
							name={item.name} 
							icon={item.icon} 
							link={item.link} 
						/>
						)
					})}
				</div>
				<Footer/>
			</div>
		)
	},

	componentDidMount: function() {
		var self = this;
		Request.get('m_front_cn.json', function(data) {
			self.setState({sliderData: self.parseFrontData(data)});
		}, function(err) {
			console.log('get front data error', err);
		});
	},

	parseFrontData: function(responseText) {
		return JSON.parse(responseText).map(function(item){
			return {
				title: item.node_title,
				text: item.body.replace(/^<[^>]*>$/, ''),
				imgurl: /src="([^"]*)"/.exec(item.field_image)[1],
				type: item.node_type,
				id: item.nid
			};
		});
	}

});

var index = <Index/>;
React.render(index, document.body);

