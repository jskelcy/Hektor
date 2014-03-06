var fs = require('fs');
var path = require('path');
var MIME = require('./MIME');
//var middleStack = require('./middleStack');

function Frame(){
	
	this.getReq= {};
	this.postReq = {};
	this.publicPath = []; 
	this.publicFolders = {};
	this.middleStack = [];

	var self = this;


	this.reqListener = function(req,res){
		var absPath = path.join(__dirname,req.url);
		var absDirName = path.dirname(absPath);
		var dirName = path.dirname(req.url);
		var reqExtension = path.extname(absPath);
		var contentType = MIME(reqExtension);
		
		var currentMiddleware = 0;
		var middlewareCallback = function() {
			currentMiddleware++;
			if (currentMiddleware < self.middleStack.length) {
				self.middleStack[currentMiddleware](req, res, middlewareCallback);	
			}		
		}
		
		self.middleStack[currentMiddleware](req, res, middlewareCallback);

		//if the request is for a custom request
		if(req.method === 'GET'){
			if(req.url === '/favicon.ico'){
				res.end();
				return;
			}

		//this if will take care of any requests for web pags in the public dir
		//these do not need custom call backs
			if(self.publicFolders[dirName]){
				fs.readFile(absPath, function(err, data){
					if(!err){
						res.writeHead(200, {'Content-Type': MIME(reqExtension)})
						res.end(data);
					}else{
						console.log('something broke');
						res.writeHead(500);
						res.end();
					}
				});
				return;
			}
			self.getReq[req.url](req, res);
		}
	}
}
/*
function middle(route, fn){
	var jsonMiddle ={ route: route, fn: fn}
	this.middleStack.insert(jsonMiddle);
}
*/
function makeFrame(){
	return new Frame();
}

module.exports = makeFrame;

Frame.prototype.use =function(fn){
	this.middleStack.push(fn);
}


Frame.prototype.setPublic= function(folder){
	this.publicFolders[folder] = true;
}

Frame.prototype.get = function(extension, fn){	
	this.getReq[extension] = fn;
}

Frame.prototype.post = function(extension, fn){
	this.postReq[extension] = fn;
}

