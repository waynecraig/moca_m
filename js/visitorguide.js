require('../sass/visitorguide.sass');
require('../libs/leaflet/leaflet.css');
var React = require('react');
var render = require('react-dom').render;
var Header = require('./components/header');
var Map = require('react-leaflet').Map;
var TileLayer = require('react-leaflet').TileLayer;
var Marker = require('react-leaflet').Marker;
var Footer = require('./components/footer');
var VisitorguideStore = require('./stores/visitorguideStore');
var VisitorguideAction = require('./actions/visitorguideAction');

var Visitorguide = React.createClass({

	getInitialState: function() {
		return VisitorguideStore.getData();
	},

	render: function() {
		return (
			<div>
				<Header/>
				<div className='visitorguide'>
					<img key={'cover'} className='visitorguide-cover' src={this.state.coverImgurl}/>
					{this.state.data.body && this.state.data.body.split('\n').map(function(line, i) {
						if (line[0] === '#') {
							return <h4 key={i}>{line.substr(1)}</h4>
						} else {
							return <p key={i}>{line}</p>
						}
					})}
					{function(position) {
						if (position) {
							return (
								<Map className='map' center={position} zoom={13} 
									attributionControl={false} zoomControl={false}>
									<TileLayer url='http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'/>
									<Marker position={position}/>
								</Map>
							)
						}
					}(this.state.data.position)}
				</div>
				<Footer/>
			</div>
		)
	},

	componentDidMount: function() {
		VisitorguideStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		VisitorguideStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(VisitorguideStore.getData());
	}

});

var visitorguide = <Visitorguide/>;
render(visitorguide, document.getElementById('moca'));
VisitorguideAction.fetchData();
