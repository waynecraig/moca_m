require('../sass/index.sass');
var React = require('react');
var Request = require('./request');
var Header = require('./header');
var Slider = require('./slider');
var Entry = require('./entry');

var Index = React.createClass({

	getInitialState: function() {
		return {
			sliderData: [],
			entries: [{
				name: '参观指南',
				icon: require('../img/0074-compass.svg'),
				link: './visitorguide.html',
				color: '#1cb6b6'
			},{
				name: '公共教育',
				icon: require('../img/0034-library.svg'),
				link: './education.html',
				color: '#95c11f'
			},{
				name: '研究典藏',
				icon: require('../img/0033-books.svg'),
				link: './collection.html',
				color: '#513528'
			},{
				name: '关于我们',
				icon: require('../img/0115-users.svg'),
				link: './about.html',
				color: '#f29200'
			}],
			entriesHeight: 0
		};
	},

	render: function() {
		var entriesStyle = {height: this.state.entriesHeight + 'px'};
		return (
			<div>
				<Header/>
				<Slider data={this.state.sliderData}></Slider>
				<div className="entries" ref="entries" style={entriesStyle}>
					{this.state.entries.map(function(item, i){
						return (
						<Entry key={i} 
							name={item.name} 
							icon={item.icon} 
							link={item.link} 
							color={item.color}
						/>
						)
					})}
				</div>
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
		this.adjustEntriesHeight();
		window.addEventListener('resize', function(){
			self.adjustEntriesHeight();
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
	},

	adjustEntriesHeight: function() {
		var conHeight = this.getDOMNode().clientHeight,
			bodyHeight = document.body.clientHeight,
			currentHeight = React.findDOMNode(this.refs.entries).clientHeight,
			targetHeight = bodyHeight - conHeight + currentHeight;
		console.log(conHeight, bodyHeight, currentHeight, targetHeight);
		this.setState({entriesHeight: targetHeight});
	}
});

var index = <Index/>;
React.render(index, document.body);

