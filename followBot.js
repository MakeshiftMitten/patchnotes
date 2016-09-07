function followBot(x, y, shotElevation){	
	this.x = x;
	this.y = y;

	this.width = 5;
	this.height = 5;

	this.orientation = 90;
	this.velocity = 5;

	this.maxHealth = 100;
	this.health = 100;
	
	this.shotElevation = shotElevation;
	this.isHit = false;
	this.movementState = "RUN";
	this.state = "";

	this.switchTime = 5;
	this.currentSwitchTime = 0;

	this.shotTime = 1;
	this.currentShotTime = 0;

	this.target = game.players[0];

    this.right = function(){return this.x + this.width/2;};
    this.left = function(){return this.x - this.width/2};
    this.top = function(){return this.y + this.height/2};
    this.bottom = function(){return this.y - this.height/2};


	this.update = function(dt){

		
		this.currentShotTime += dt;
		if(this.currentShotTime > this.shotTime){
			this.shoot();
			this.currentShotTime = 0;
		}
		this.currentSwitchTime +=dt;
		if(this.currentSwitchTime > this.switchTime){
			this.movementState = "FOLLOW";
		}
		if(this.currentSwitchTime > this.switchTime*2){
			this.movementState = "RUN";
			this.currentSwitchTime = 0;
		}

		if(this.movementState == "RUN"){
			this.x+= this.velocity*Math.cos(toRad(this.orientation))*dt;
			this.y+= this.velocity*Math.sin(toRad(this.orientation))*dt;
		}
		if(this.movementState == "FOLLOW"){
		    this.x-= this.velocity*Math.cos(toRad(this.orientation))*dt;
			this.y-= this.velocity*Math.sin(toRad(this.orientation))*dt;	
		}
	}

	this.onHit = function(damage){
		this.health -= damage;
		if(this.health <= 0 ){
			this.state = "DEAD";
		}
	}

	this.shoot = function(){
		

		//var angle = 180;
		var rise = this.target.y - this.y;
		var run = this.target.x - this.x
		var slopeToPlayer = rise/run;

		var angle =  toDeg(Math.atan(slopeToPlayer));

		// if((rise < 0 && run < 0) || run < 0)
		// 	angle += 180;
		
		if( run < 0)
			angle += 180;

		// else 
		//  	var angle = toDeg(Math.atan(slopeToPlayer)) + 180;
		
		var pushBullet = new bullet(this.x + 15*Math.cos(toRad(angle)), this.y + 15*Math.sin(toRad(angle)), angle, 30, 1, this.shotElevation);  //*Math.sin(angle), 
        game.currentSector.bulletManager.addBullet(pushBullet);
	}

	this.draw = function(){
		if(this.state != "DEAD"){
			draw.drawRectCentered(this.x, this.y, this.width, this.height, "#FF0000");
			draw.drawRect(this.x - this.width/2, this.y - this.height*.8, this.width, .5);
			draw.drawRect(this.x - this.width/2, this.y - this.height*.8, this.width * (this.health/this.maxHealth), .5, "#FF0000", true);
		}

			
	}
}