var http = require('http');
var Frame = require('./frameWork1');

var app = new Frame()
//console.log(app);

app.get('/', function(req, res){
	res.write('welcome to hector');
	res.end();
});
//look a node source
var server = http.createServer(app.reqListener).listen(8080);

//var server = http.createServer( function(request, response){
//	app.reqListener(request,response)
//}).listen(8080);