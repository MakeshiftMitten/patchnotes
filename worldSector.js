function worldSector(x, y, width, height){

	this.x = x;
	this.y = y;
	
    this.pillars = [];
    this.bulletManager = new bulletManager();
    this.enemyManager = new enemyManager();           

    this.height = height;
    this.width = width; 

    this.level = 1;

    this.bossRoom = false;

	this.update = function(dt){
		for(var x = 0; x < this.pillars.length; x++){
			this.pillars[x].update(dt);
		}

		this.bulletManager.update(dt);
		this.enemyManager.update(dt);
		console.log(this.enemyManager.enemies.length);
		if(this.enemyManager.enemies.length == 0){
			this.level = 0;
			if(this.bossRoom){
				game.bossDefeated();
				this.bossRoom = false;	
			}
		}
			

	}

	this.generate = function(){
		// for(var z = 0; z < 20; z++){
		// 	var x = Math.floor(Math.random() * (400)) - 200;
		// 	var y = Math.floor(Math.random() * (400)) - 200;
		// 	this.enemyManager.addEnemy(new followBot(this.relativeX(x), this.relativeY(y), 1, "ROCKET"));
		// }
		if(this.x == 0 && this.y == 0)
			this.enemyManager.addEnemy(new followBot(this.relativeX(0), this.relativeY(0), 1, "BOMB"));	

		if(this.x < 0 && this.y > 0){
			if(this.x == game.bossRooms[0][0] && this.y == game.bossRooms[0][1]){
				this.bossRoom = true;
				this.enemyManager.addEnemy(new followBot(this.relativeX(0), this.relativeY(0), 1, "ROCKET"));	
			
			}
			else{
				for(var z = 0; z < 20; z++){
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;
					this.enemyManager.addEnemy(new chaseBot(this.relativeX(x), this.relativeY(y), 1, "ROCKET"));	
				}
			}
		}

		if(this.x < 0 && this.y < 0){
			if(this.x == game.bossRooms[1][0] && this.y == game.bossRooms[1][1]){
				this.bossRoom = true;
				this.enemyManager.addEnemy(new followBot(this.relativeX(0), this.relativeY(0), 1, "ROCKET"));	
			}
			else{
				for(var z = 0; z < 20; z++){
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;
					this.enemyManager.addEnemy(new chaseBot(this.relativeX(x), this.relativeY(y), 1, "ROCKET"));	
				}
			}
		}

		if(this.x > 0 && this.y > 0){
			if(this.x == game.bossRooms[2][0] && this.y == game.bossRooms[2][1]){
				this.bossRoom = true;
				this.enemyManager.addEnemy(new followBot(this.relativeX(0), this.relativeY(0), 1, "ROCKET"));	
			}
			else{
				for(var z = 0; z < 20; z++){
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;
					this.enemyManager.addEnemy(new chaseBot(this.relativeX(x), this.relativeY(y), 1, "ROCKET"));	
				}
			}
		}

		if(this.x > 0 && this.y < 0){
			if(this.x == game.bossRooms[3][0] && this.y == game.bossRooms[3][1]){
				this.bossRoom = true;
				this.enemyManager.addEnemy(new followBot(this.relativeX(0), this.relativeY(0), 1, "ROCKET"));	
			}
			else{
				for(var z = 0; z < 20; z++){
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;
					this.enemyManager.addEnemy(new chaseBot(this.relativeX(x), this.relativeY(y), 1, "ROCKET"));	
				}
			}
		}
	}

	this.relativeX = function(x){
		return x + 400*this.x;
	}

	this.relativeY = function(y){
		return y + 400*this.y;
		this.enemeyManager.addEnemy(new followBot(this.relativeX(-30), this.relativeY(160), 1, "ROCKET"));
	}
	this.draw = function(){

	}
}