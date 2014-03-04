var types = {
	".jpg": "image/jpg",
	'.html': 'text/html',
	'.png':  'image/png',
	'.js': "application/javascript"
};

function typeCheck(extension){
	var MIMEType;
	if(MIMEType = types[extension]){
		return MIMEType;
	}else{
		return 'text/plain';
	}
}


module.exports = typeCheck;