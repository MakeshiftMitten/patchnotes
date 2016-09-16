function bomb(x, y, orientation, velocity, lifeTime, type, playerSafe, enemySafe, color){
	this.x = x;
	this.y = y;

	this.orientation = orientation;
	this.velocity = velocity;

	this.lifeTime = lifeTime;
	this.currentTime = 0;

	this.flicker = lifeTime/1.1;
	this.currentFlicker = 0;

	this.playerSafe = playerSafe;
	this.enemySafe = enemySafe;

	this.type = type; //PATCH //EXPLODE

	this.state = "FIRED";

	this.color = color;
	// this.currentColor = color;
	this.fill = true;

	this.update = function(dt){
		this.currentTime+=dt;
		this.currentFlicker+=dt;
		if(this.currentFlicker >=dt){
			// if(this.currentColor == this.color)
			// 	this.currentColor = "#FFFFFF";
			// else
			// 	this.currentColor = this.color;
			this.fill = !this.fill;
			this.currentFlicker = 0;
			//s.//flicker; 
		}

		if(this.currentTime > this.lifeTime)
			this.state = "EXPLODED"

		if(this.state == "EXPLODED"){
			// if(this.type == "PATCH"){
			// 	for(var z = 0; z <= game.currentSector.pillars.length; z++){
			// 		console.log(z);
			// 		pillar = game.currentSector.pillars[z];
			// 		 if(pillar.elevation == -1){
			// 		 	pillars.splice(z, 1);
			// 		  	z--;
			// 		}
			// 	}
			// }
			// else{
				this.isActive = false;
				// for(var x = 0; x < 40; x++){
						
				// 	game.currentSector.bulletManager.addBullet(new bullet(this.x + game.common.randInt(-5, 5), this.y + game.common.randInt(-5, 5), game.common.randInt(0, 360), 20, 1.5, 1, this.playerSafe, false, this.color));
					
				// }	
			
			

		}
		else{
			this.x+= this.velocity*Math.cos(toRad(this.orientation))*dt;
			this.y+= this.velocity*Math.sin(toRad(this.orientation))*dt;	
		}
		
	}




	this.draw = function(){
		draw.drawCircle(this.x, this.y, 1, this.color, this.fill);
	}

}