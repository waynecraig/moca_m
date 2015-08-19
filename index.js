var express = require('express');
var http = require('http');

var app = express();

app.use('/', express.static('./'));

var port = 8045;
app.listen(port, function(){
	console.log('listening on port ' + port);
});
