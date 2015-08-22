require('../sass/footer.sass');
var React = require('react');

var Footer = React.createClass({

	render: function(){
		return (
			<div className="footer">
				<p className="center-text">ycmoca@moca-yinchuan.com</p>
				<p className="center-text">0951-8426106</p>
				<p className="center-text">宁夏银川市兴庆区禾乐路12号 邮编：750101</p>
				<p className="center-text">版权所有©银川当代美术馆</p>
			</div>
		)
	}

});

module.exports = Footer;
