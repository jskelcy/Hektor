
function MiddleStack(){
	var root;
	var ptr; 
}

MiddleStack.prototype.insert(middleObj){
	var newStackObj = new StackObj(middleObj);
	if(ptr === root){
		root = newStackObj;
	}else{
		ptr.next = newStackObj;
		ptr = ptr.next;
	}
}

//this is the funtion thjat the other files should call to start the middleware chain 
MiddleStack.prototype.run(middleObj, req, res){
	middleObj(req, res, next);
}

function StackObj(middleObj){
	var next;
	var route: middleObj.route;
	var fn = middleObj.fn;
}

StackObj.prototype.next(nextStackObj){
	this.next = nextStackObj;
}

function next(){
	req, res
}