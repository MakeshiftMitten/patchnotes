function enemyManager(x, y){	
	this.enemies = [];

	this.addEnemy = function(enemy){
		this.enemies.push(enemy);
	}



	this.update = function(dt){
		for(var e = 0; e < this.enemies.length; e++){
			var enemy = this.enemies[e];
			if(enemy.state == "DEAD"){				
				this.enemies.splice(e, 1);
				e--;
			}
			enemy.update(dt);
		}

	}

	this.draw = function(){
		for (var e = 0; e < this.enemies.length; e++){
			this.enemies[e].draw();
		}
	}
}
