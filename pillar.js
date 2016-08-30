function pillar(x, y, width, height, passthrough){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.passthrough = passthrough;

	this.right = function(){return this.x + this.width/2;};
    this.left = function(){return this.x - this.width/2};
    this.top = function(){return this.y + this.height/2};
    this.bottom = function(){return this.y - this.height/2};


	this.draw = function(){
		draw.drawRectCentered(this.x, this.y, this.width, this.height, "#0000FF", true);
	}
}