function followBot(x, y, shotElevation, weapon, boss = false){	
	this.x = x;
	this.y = y;

	this.width = 5;
	this.height = 5;

	this.orientation = 90;
	this.velocity = 15;

	this.maxHealth = 100;
	this.health = 100;
	
	this.shotElevation = shotElevation;
	this.weapon = weapon;
	this.isHit = false;
	this.movementState = "RUN";
	this.state = "";

	this.switchTime = 5;
	this.currentSwitchTime = 0;

	this.shotTime = 1;
	this.currentShotTime = 0;

	this.boss = boss;
	if(boss){
		this.maxHealth *= 10;
		this.health *= 10;
	}
	

	this.target = game.players[0];

    this.right = function(){return this.x + this.width/2;};
    this.left = function(){return this.x - this.width/2};
    this.top = function(){return this.y + this.height/2};
    this.bottom = function(){return this.y - this.height/2};


	this.update = function(dt){

		console.log(this.boss);
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
			if(this.boss)
					this.shoot();
		}
		if(this.movementState == "FOLLOW"){
		    this.x-= this.velocity*Math.cos(toRad(this.orientation))*dt;
			this.y-= this.velocity*Math.sin(toRad(this.orientation))*dt;	
			if(this.boss)
					this.shoot();
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

		if( run < 0)
			angle += 180;
		if(this.weapon == "ROCKET")
			var pushBullet = new rocket(this.x + 15*Math.cos(toRad(angle)), this.y + 15*Math.sin(toRad(angle)), angle, 5, 3, this.shotElevation, false, true, "#FF0000");  //*Math.sin(angle), 
		else if (this.weapon == "BULLET")
			var pushBullet = new bullet(this.x + 15*Math.cos(toRad(angle)), this.y + 15*Math.sin(toRad(angle)), angle, 10, 5, this.shotElevation,  false, true, "#FF0000");  //*Math.sin(angle), 
		else if (this.weapon == "BOMB")
			var pushBullet = new bomb(this.x + 15*Math.cos(toRad(angle)), this.y + 15*Math.sin(toRad(angle)), angle, 10, 3, "PATCH",  false, true, "#FF0000");  //*Math.sin(angle), 

		else if(this.boss){
			var pushBullet = new bullet(this.x + 15*Math.cos(toRad(angle)), this.y + 15*Math.sin(toRad(angle)), angle, 10, 5, this.shotElevation,  false, false, "#FF0000");
			game.currentSector.bulletManager.addBullet(pushBullet);
			var pushBullet = new bullet(this.x + 15*Math.cos(toRad(angle)), this.y + 15*Math.sin(toRad(angle)), angle+180, 10, 5, this.shotElevation,  false, false, "#FF0000");
		}
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