function pillar(x, y, width, height, elevation){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.elevation = elevation;//0: Kill plane, 1: flyover/cover

	this.right = function(){return this.x + this.width/2;};
    this.left = function(){return this.x - this.width/2};
    this.top = function(){return this.y + this.height/2};
    this.bottom = function(){return this.y - this.height/2};


	this.draw = function(){
		if(this.elevation	 == 1){
			if(game.players[0].state == "ship"){
				draw.drawRectCentered(this.x, this.y, this.width, this.height, "#009900", true);
			}

			if(game.players[0].state == "bot"){
				draw.drawRectCentered(this.x, this.y, this.width, this.height, "#00FF00", true);
			}
		} 

		else if(this.elevation == 0){
			if(game.players[0].state == "ship"){
				draw.drawRectCentered(this.x, this.y, this.width, this.height, "#002200", true);
			}
			if(game.players[0].state == "bot"){
				draw.drawRectCentered(this.x, this.y, this.width, this.height, "#00AA00", true);
			}
		} 

		
	}
}