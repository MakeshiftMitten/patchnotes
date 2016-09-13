function pillar(x, y, width, height, elevation){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.elevation = elevation;//0: Kill plane, 1: flyover/cover

	this.addStreamerTimer = .1;
	this.currentAddStreamerTimer = 0;

	this.streamers = [];

	this.right = function(){return this.x + this.width/2;};
    this.left = function(){return this.x - this.width/2};
    this.top = function(){return this.y + this.height/2};
    this.bottom = function(){return this.y - this.height/2};

    this.update = function(dt){
    	if(this.elevation == -1){
    		this.currentAddStreamerTimer+=dt;
    		if(this.currentAddStreamerTimer > this.addStreamerTimer){
	    			for(var z = 0; z < 5; z++){
	    			var x = game.common.randInt(this.x-this.width/2, this.x + this.width/2);
	    			var y = game.common.randInt( this.y-this.height/2, this.y + this.height/2);
	    			console.log(x + " " + y)
	    			this.streamers.push(new bitStreamer(x, y, 0, 0, 2));
	    			this.currentAddStreamerTimer = 0;
	    		}
    		}

    		for(var x = 0; x < this.streamers.length; x++){
    			this.streamers[x].update(dt);
    			if(this.streamers[x].isActive == false){				
					this.streamers.splice(x, 1);
				x--;
			}
    		}
    	}
    }


	this.draw = function(){
		if(this.elevation == 1){
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

		else if(this.elevation == -1){
			if(game.players[0].state == "ship"){
				draw.drawRectCentered(this.x, this.y, this.width, this.height, "#000000", true);
				for(var x = 0; x < this.streamers.length; x++){										
    				this.streamers[x].draw();
    			}
				
			}
			if(game.players[0].state == "bot"){
				draw.drawRectCentered(this.x, this.y, this.width, this.height, "#000000", true);
				for(var x = 0; x < this.streamers.length; x++){										
    				this.streamers[x].draw();
    			}
			}
		} 

		
	}
}