function bullet(x, y, orientation, velocity, lifeTime, elevation, safe){	
	this.x = x;
	this.y = y;

	this.orientation = orientation;
	this.velocity = velocity;

	this.elevation = elevation;
	this.lifeTime = lifeTime;
	this.currentTime = 0;
	this.safe = safe;

	this.isActive = true;

	this.update = function(dt){
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
					if(!this.safe){
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
			if(this.elevation < game.players[0].getElevation()){
				draw.drawText(this.x, this.y, "0", "#008800");
			}
			else
				draw.drawText(this.x, this.y, "0", "#00FF00");
	}
}