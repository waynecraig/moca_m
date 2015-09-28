var express = require('express');
var http = require('http');

var app = express();

app.use('/mo/', express.static('./dist/'));
app.get('/admin', function(req, res) {
	var q = req.query.q;
	http.get('http://moca-yinchuan.com/admin/?q=' + q, function(oriRes) {
		oriRes.pipe(res);
	});
});

var port = 8045;
app.listen(port, function(){
	console.log('listening on port ' + port);
});
