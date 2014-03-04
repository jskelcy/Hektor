var fs = require('fs');
var path = require('path');

function Frame(){
	var self = this;
	self.getReq= {};
	self.postRequets = {};
	self.publicPath = []; 

	/*this.get = function(extension, fn){
		getReq[extension] = fn;
	}*/

	self.reqListener = function(req,res){
		var absPath = path.join(__dirname,req.url);
		var absDirName = path.dirname(absPath);
		var dirName = path.dirname(req.url);
		console.log(dirName)
		var reqExtension = path.extname(absPath);
		if(req.url === '/favicon.ico'){
			res.end();
			return;
		}


		if(dirName === '/scripts'){
			fs.readFile(absPath, function(err, data){
				if(!err){
					res.writeHead(200, {'Content-Type': 'application/javascript'});
					res.end(data);
				}else{
					console.log('something broke');
					res.writeHead(500);
					res.end();
				}
			});
			return;
		}


		//this will deal with any images 
		if(dirName === '/assets'){
			fs.readFile(absPath, function(err, data){
				if(!err){
					res.writeHead(200, {'Content-Type': 'image/jpg'});
					res.end(data);
				}else{
					console.log('something broke');
					res.writeHead(500);
					res.end();
				}
			});
			return;
		}


		//this if will take care of any requests for web pags in the public dir
		//these do not need custom call backs
		if(dirName === '/public'){
			fs.readFile(absPath, function(err, data){
				if(!err){
					res.writeHead(200, {'Content-Type': 'text/html'})
					res.end(data);
				}else{
					console.log('something broke');
					res.writeHead(500);
					res.end();
				}
			});
			return;
			}
		
		//if the request is for a custom request
		self.getReq[req.url](req, res);
		}
}



function makeFrame(){
	return new Frame();
}

module.exports = makeFrame;

Frame.prototype.get = function(extension, fn){	
	this.getReq[extension] = fn;
}


Frame.prototype.serveStatic = function(path) {


	// extension
	// check if extension matches regex
	// extract file 
	// send back file.

}