function Frame(){
	var self = this;
	self.getReq= {};
	self.postRequets = {};
	self.publicPath = []; 

	/*this.get = function(extension, fn){
		getReq[extension] = fn;
	}*/

	self.reqListener = function(req,res){
		var path = req.url.split("/");
		var filename = path.splice(path.length -1, 1);
		//path = path.join("");

		console.log(path);
		if(req.url === '/favicon.ico'){
			res.end();
			return;
		}
		/*
		if(path[0]=== 'public') {
			var filname = 

		} else {


		}
		*/		



		var page = req.url;
		self.getReq[page](req, res);
	}

}

function makeFrame(){
	return new Frame();
}

module.exports = makeFrame;

Frame.prototype.get = function(extension, fn){	
	console.log(this)
	this.getReq[extension] = fn;
}


Frame.prototype.serveStatic = function(path) {


	// extension
	// check if extension matches regex
	// extract file 
	// send back file.

}