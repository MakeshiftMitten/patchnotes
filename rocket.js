function rocket(x, y, orientation, velocity, lifeTime, elevation, playerSafe, enemySafe, color){	
	this.x = x;
	this.y = y;

	this.orientation = orientation;
	this.velocity = 10;

	this.elevation = elevation;
	this.lifeTime = lifeTime;
	this.currentTime = 0;
	this.playerSafe = playerSafe;
	this.enemySafe = enemySafe;
	this.target = game.players[0];

	this.state = "FIRED";
	


	this.homeTimer = .25;
	this.currentHomeTimer = 0

	this.isActive = true;

	this.update = function(dt){
		this.currentHomeTimer += dt;
		this.velocity+=10*dt;

		if(this.currentHomeTimer > this.homeTimer	){
		var rise = this.target.y - this.y;
		var run = this.target.x - this.x
		var slopeToPlayer = rise/run;

		var angle =  toDeg(Math.atan(slopeToPlayer));

		if( run < 0)
			angle += 180;

		this.orientation  = angle; //+= (this.orientaion -angle)/2;

		this.currentHomeTimer = 0;
		}
		
		this.x+= this.velocity*Math.cos(toRad(this.orientation))*dt;
		this.y+= this.velocity*Math.sin(toRad(this.orientation))*dt;		

		if(this.isActive){
			for(var x = 0; x < game.currentSector.enemyManager.enemies.length; x++)
			{
				if(this.isActive)
				{	
					if(pointInRectangle(this, game.currentSector.enemyManager.enemies[x])){
						game.currentSector.enemyManager.enemies[x].onHit(10);										
						this.isActive = false;
						}
					}			
			}

			for(var x = 0; x < game.currentSector.pillars.length; x++)
			{
				{	
			
					if(pointInRectangle(this, game.currentSector.pillars[x])){
						if(this.elevation == 0){
							this.isActive = false;
						}
						else if(this.elevation == 1){
							if(game.currentSector.pillars[x].elevation == 1)
								this.isActive = false;
						}
					}
				}			
			}

			for(var x = 0; x < game.players.length; x++)
			{
				{	
					if(!this.playerSafe){
						if(pointInRectangle(this, game.players[x])){
							if(this.elevation == 0){
								if(game.players[x].getElevation() == 0){
										console.log("HIT");
										this.isActive = false;
										game.players[x].onHit(10);
								}
							}
							else if(this.elevation == 1){
									console.log("HIT");
									this.isActive = false;
									game.players[x].onHit(10);
								
							}
						}
					}
				}			
			}

			this.currentTime += dt;
			if(this.currentTime > this.lifeTime)
			{
				this.isActive = false;
			}
		}
	}

	this.draw = function(){
		if(this.isActive)			
			draw.drawRectRotatedCentered(this.x, this.y, .50, 2, this.orientation, "#FF0000", true);						
	}
}