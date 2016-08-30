function bullet(x, y, orientation, velocity, lifeTime){	
	this.x = x;
	this.y = y;

	this.orientation = orientation;
	this.velocity = velocity;

	this.lifeTime = lifeTime;
	this.currentTime = 0;

	this.isActive = true;

	this.update = function(dt){
		this.x+= this.velocity*Math.cos(toRad(this.orientation))*dt;
		this.y+= this.velocity*Math.sin(toRad(this.orientation))*dt;		

		if(this.isActive){
			for(var x = 0; x < game.enemyManager.enemies.length; x++)
			{
				if(this.isActive)
							{	
								if(pointInRectangle(this, game.enemyManager.enemies[x])){
										game.enemyManager.enemies[x].onHit(10);
										console.log("hit");
										this.isActive = false;


							}
					}			
			}

			for(var x = 0; x < game.pillars.length; x++)
			{
				
							{	
								if(pointInRectangle(this, game.pillars[x])){										
										console.log("hit");
										this.isActive = false;

								
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
			draw.drawText(this.x, this.y, "0");
	}
}