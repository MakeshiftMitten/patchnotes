function followBot(x, y){	
	this.x = 10;
	this.y = 10;

	this.width = 5;
	this.height = 5;

	this.orientation = 90;
	this.velocity = 10;

	this.maxHealth = 100;
	this.health = 100;
	
	this.isHit = false;
	this.state = "RUN";

	this.switchTime = 5;
	this.currentSwitchTime = 0;

    this.right = function(){return this.x + this.width/2;};
    this.left = function(){return this.x - this.width/2};
    this.top = function(){return this.y + this.height/2};
    this.bottom = function(){return this.y - this.height/2};


	this.update = function(dt){
		this.currentSwitchTime +=dt;
		if(this.currentSwitchTime > this.switchTime){
			this.state = "FOLLOW";
		}
		if(this.currentSwitchTime > this.switchTime*2){
			this.state = "RUN";
			this.currentSwitchTime = 0;
		}

		if(this.state == "RUN"){
			this.x+= this.velocity*Math.cos(toRad(this.orientation))*dt;
			this.y+= this.velocity*Math.sin(toRad(this.orientation))*dt;
		}
		if(this.state == "FOLLOW"){
		    this.x-= this.velocity*Math.cos(toRad(this.orientation))*dt;
			this.y-= this.velocity*Math.sin(toRad(this.orientation))*dt;	
		}
	}

	this.onHit = function(damage){
		this.health -= damage;
		if(this.health <= 0 ){
			console.log(this.health);
			this.state = "DEAD";
		}
	}

	this.draw = function(){
		console.log(this.state + " " + this.velocity);
		if(this.state != "DEAD"){
			draw.drawRectCentered(this.x, this.y, this.width, this.height, "#FF0000");
			draw.drawRect(this.x - this.width/2, this.y - this.height*.8, this.width, .5);
			draw.drawRect(this.x - this.width/2, this.y - this.height*.8, this.width * (this.health/this.maxHealth), .5, "#FF0000", true);
		}

			
	}
}