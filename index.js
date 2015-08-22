var express = require('express');
var http = require('http');

var app = express();

app.use('/', express.static('./dist/'));
app.use('/datamock/', express.static('./datamock/'));

var port = 8045;
app.listen(port, function(){
	console.log('listening on port ' + port);
});
