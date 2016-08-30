function bulletManager(){	
	this.bullets = [];

	this.addBullet = function(bullet){
		this.bullets.push(bullet);
	}



	this.update = function(dt){
		for(var b = 0; b < this.bullets.length; b++){
			var bullet = this.bullets[b];
			bullet.update(dt);
			if(bullet.isActive == false){				
				this.bullets.splice(b, 1);
				b--;
			}
		}

	}

	this.draw = function(){
		for (var b = 0; b < this.bullets.length; b++)
			this.bullets[b].draw();
	}
}