var fs = require('fs');
var path = require('path');
var MIME = require('./MIME');

function Frame(){
	
	this.getReq= {};
	this.postReq = {};
	this.publicPath = []; 
	this.publicFolders = {};

	var self = this;
	this.reqListener = function(req,res){
		var absPath = path.join(__dirname,req.url);
		var absDirName = path.dirname(absPath);
		var dirName = path.dirname(req.url);
		var reqExtension = path.extname(absPath);
		var contentType = MIME(reqExtension);
		
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



function makeFrame(){
	return new Frame();
}

module.exports = makeFrame;

Frame.prototype.setPublic= function(folder){
		this.publicFolders[folder] = true;
	}

Frame.prototype.get = function(extension, fn){	
	this.getReq[extension] = fn;
}

Frame.prototype.post = function(extension, fn){
	this.postReq[extension] = fn;
}

// Frame.prototype.setPublic= function(folder){
// 	publicFolders.push(folder);
// }