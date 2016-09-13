function chaseBoss(x, y, shotElevation, weapon){	
	this.x = x;
	this.y = y;

	this.originY = x;
	this.originY = y;

	this.width = 5;
	this.height = 5;

	this.orientation = 90;
	this.velocity = 45;

	this.maxHealth = 100;
	this.health = 1000;
	
	this.shotElevation = shotElevation;
	this.weapon = weapon;
	this.isHit = false;
	this.movementState = "FOLLOW";
	this.state = "";

	this.switchTime = 3;
	this.currentSwitchTime = 0;

	this.shotTime = .2;
	this.currentShotTime = 0;

	this.target = game.players[0];

    this.right = function(){return this.x + this.width/2;};
    this.left = function(){return this.x - this.width/2};
    this.top = function(){return this.y + this.height/2};
    this.bottom = function(){return this.y - this.height/2};


	this.update = function(dt){

		
		this.currentShotTime += dt;
		// if(this.currentShotTime > this.shotTime){
		// 	this.shoot();
		// 	this.currentShotTime = 0;
		// }
		this.currentSwitchTime +=dt;
		if(this.currentSwitchTime > this.switchTime){
			if(this.movementState == "FOLLOW")
				this.movementState = "CHASE";
			else
				this.movementState = "FOLLOW";
			this.currentSwitchTime = 0;
		}
		// if(this.currentSwitchTime > this.switchTime*2){
		// 	this.movementState = "RUN";
		// 	this.currentSwitchTime = 0;
		// }

		if(this.movementState == "FOLLOW"){

			//var angle = 180;
		// var rise = this.target.y - this.y;
		// var run = this.target.x - this.x

		this.shoot();

		var rise = this.target.y - this.y;
		var run = this.target.x - this.x

		var slopeToPlayer = rise/run;

		var angle =  toDeg(Math.atan(slopeToPlayer));		

		if( run < 0)
			angle += 180;
		this.orientation = angle + 180; 


		var oldX = this.x;
		var oldY = this.y;

	    this.x-= this.velocity*Math.cos(toRad(this.orientation))*dt;
		this.y-= this.velocity*Math.sin(toRad(this.orientation))*dt;	

        for(var p = 0; p < game.currentSector.pillars.length; p++){
            var pillar = game.currentSector.pillars[p];

            if(pointInRectangle(this, pillar)){
         
                    if(pillar.elevation == -1){
                        this.currentLife -= this.maxLife;
                        this.isAlive = false;
                    }

                    if(oldX < pillar.left() && this.x > pillar.left() 
                        || oldX > pillar.right() && this.x < pillar.right())
                        this.x = oldX;
                    if(oldY < pillar.bottom() && this.y > pillar.bottom()
                        || oldY > pillar.top() && this.y < pillar.top())
                        this.y = oldY;
          
            }
        }
    }
        else{
        			var rise = this.target.y - this.y;
		var run = this.target.x - this.x

		var slopeToPlayer = rise/run;

		var angle =  toDeg(Math.atan(slopeToPlayer));		

		if( run < 0)
			angle += 180;
		this.orientation = angle + 180;

		this.orientation += 180; 

		if(this.currentShotTime > this.shotTime){
			game.currentSector.bulletManager.addBullet(new bomb(this.x, this.y, this.orientation, this.velocity/2, 1, "EXPLODE", false, false, "#00AAAA"));
			this.currentShotTime = 0;
		}

		

		var oldX = this.x;
		var oldY = this.y;

	    this.x-= this.velocity*Math.cos(toRad(this.orientation))*dt;
		this.y-= this.velocity*Math.sin(toRad(this.orientation))*dt;	

        for(var p = 0; p < game.currentSector.pillars.length; p++){
            var pillar = game.currentSector.pillars[p];

            if(pointInRectangle(this, pillar)){
         
                    if(pillar.elevation == -1){
                        this.currentLife -= this.maxLife;
                        this.isAlive = false;
                    }

                    if(oldX < pillar.left() && this.x > pillar.left() 
                        || oldX > pillar.right() && this.x < pillar.right())
                        this.x = oldX;
                    if(oldY < pillar.bottom() && this.y > pillar.bottom()
                        || oldY > pillar.top() && this.y < pillar.top())
                        this.y = oldY;
        }
		}
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

		var rise = this.target.futureY(.1) - this.y;
		var run = this.target.futureX(.1)- this.x

				var slopeToPlayer = rise/run;

		var angle =  toDeg(Math.atan(slopeToPlayer));

		if( run < 0)
			angle += 180;
	
			var pushBullet = new rocket(this.x + 15*Math.cos(toRad(angle)), this.y + 15*Math.sin(toRad(angle)), angle, 20, 4, this.shotElevation, false, true, "#FF0000");  //*Math.sin(angle), 
		
			var pushBullet = new bullet(this.x + 15*Math.cos(toRad(angle)), this.y + 15*Math.sin(toRad(angle)), angle, 25, 3, this.shotElevation,  false, true, "#FF0000");  //*Math.sin(angle), 
        game.currentSector.bulletManager.addBullet(pushBullet);
	}

	this.draw = function(){
		if(this.state != "DEAD"){
			draw.drawChaseBot(this.x, this.y, this.width, this.height, this.orientation);
			
		}

			
	}
}