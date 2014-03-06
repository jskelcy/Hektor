var http = require('http');
var Frame = require('./frameWork1');
var fs = require('fs');

var app = Frame()
//console.log(app);

app.use(function(req, res, done){
	switch (req.method){
		case 'GET':
			req.get = true;
			break;
		case 'POST':
			req.post = true;
			break;
	}

	fs.writeFile('./log', req.method + '\n', done);
});

app.use(function(req, res, done){
	fs.writeFile('./log', req.url + '\n', done)
});

app.setPublic('/public');
app.setPublic('/assets');

app.get('/', function(req, res){
	res.write('welcome to hector');
	res.end();
});




//look a node source
var server = http.createServer(app.reqListener).listen(8080);
