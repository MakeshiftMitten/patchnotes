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

		if(Math.abs(this.x) + Math.abs(this.y) > 2){
			for(var z = 0; z < game.common.randInt(0, 5); z++){
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;
					this.enemyManager.addEnemy(new followBot(this.relativeX(x), this.relativeY(y), 1, "BULLET"));	
			}

			for(var z = 0; z < game.common.randInt(0, 2); z++){
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;
					this.enemyManager.addEnemy(new followBot(this.relativeX(100), this.relativeY(0), 1, "ROCKET", true));		
			}

			for(var z = 0; z < game.common.randInt(0, 2); z++){
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;
					this.enemyManager.addEnemy(new chaseBot(this.relativeX(x), this.relativeY(y), 1, "BULLET"));	
			}

			for(var z = 0; z < game.common.randInt(0, 5); z++){
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;
					this.enemyManager.addEnemy(new chaseBoss(this.relativeX(0), this.relativeY(0), 1, "ROCKET"));	
			}
			for(var z = 0; z < 20; z++){
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;
					this.enemyManager.addEnemy(new followBot(this.relativeX(x), this.relativeY(y), 1, "BULLET"));	
				}
				for(var z = 0; z < game.common.randInt(6, 20); z++)
				{
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;

					var width = game.common.randInt(20, 80);
					var height = 5;

					var elevation = game.common.randInt(0, 2);
					this.pillars.push(new pillar(this.relativeX(x), this.relativeY(y), width, height, elevation));
				}

				for(var z = 0; z < game.common.randInt(6, 20); z++)
				{
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;

					var width = 5
					var height = game.common.randInt(20, 80);

					var elevation = game.common.randInt(0, 2);
					this.pillars.push(new pillar(this.relativeX(x), this.relativeY(y), width, height, elevation));
				}

		}
		if(this.x == 0 && this.y == 0)
			this.enemyManager.addEnemy(new followBot(this.relativeX(0), this.relativeY(100), 1, "BOMB"));	

		if(this.x < 0 && this.y >= 0){
			if(this.x == game.bossRooms[0][0] && this.y == game.bossRooms[0][1]){
				this.bossRoom = true;
				this.enemyManager.addEnemy(new followBot(this.relativeX(0), this.relativeY(0), 1, "ROCKET"));	
			
			}
			else{
				for(var z = 0; z < 10; z++){
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;
					this.enemyManager.addEnemy(new chaseBot(this.relativeX(x), this.relativeY(y), 1, "ROCKET"));	
				}

				for(var z = 0; z < game.common.randInt(6, 20); z++)
				{
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;

					var width = game.common.randInt(20, 80);
					var height = 5;

					var elevation = game.common.randInt(0, 2);
					this.pillars.push(new pillar(this.relativeX(x), this.relativeY(y), width, height, elevation));
				}

				for(var z = 0; z < game.common.randInt(6, 20); z++)
				{
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;

					var width = 5
					var height = game.common.randInt(20, 80);

					var elevation = game.common.randInt(0, 2);
					this.pillars.push(new pillar(this.relativeX(x), this.relativeY(y), width, height, elevation));
				}
			}
		}

		//Holes
		if(this.x <= 0 && this.y < 0){
			if(this.x == game.bossRooms[1][0] && this.y == game.bossRooms[1][1]){
				this.bossRoom = true;
				this.enemyManager.addEnemy(new followBot(this.relativeX(100), this.relativeY(0), 1, "ROCKET", true));	
				this.enemyManager.addEnemy(new followBot(this.relativeX(-100), this.relativeY(0), 1, "ROCKET", true));		

				for(var z = 0; z < game.common.randInt(6, 20); z++)
				{
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;

					var width = game.common.randInt(20, 80);
					var height = 5;

					var elevation = game.common.randInt(0, 2);
					this.pillars.push(new pillar(this.relativeX(x), this.relativeY(y), width, height, elevation));
				}

				for(var z = 0; z < game.common.randInt(6, 20); z++)
				{
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;

					var width = 5
					var height = game.common.randInt(20, 80);

					var elevation = game.common.randInt(0, 2);
					this.pillars.push(new pillar(this.relativeX(x), this.relativeY(y), width, height, elevation));
				}
			}
			else{
				for(var z = 0; z < 20; z++){
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;
					this.enemyManager.addEnemy(new followBot(this.relativeX(x), this.relativeY(y), 1, "BULLET"));	
				}

				for(var z = 0; z < game.common.randInt(1*Math.abs(x+y), 2*Math.abs(x+y)); z++)
				{
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;

					var width = game.common.randInt(20, 40);
					var height = game.common.randInt(20, 40);

					var elevation = game.common.randInt(0, 2);
					this.pillars.push(new pillar(this.relativeX(x), this.relativeY(y), width, height, -1));
				}
			}
		}

		if(this.x >= 0 && this.y > 0){
			if(this.x == game.bossRooms[2][0] && this.y == game.bossRooms[2][1]){
				this.bossRoom = true;
				this.enemyManager.addEnemy(new chaseBoss(this.relativeX(0), this.relativeY(0), 1, "ROCKET"));	


			}
			else{
				for(var z = 0; z < 20; z++){
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;
					this.enemyManager.addEnemy(new chaseBot(this.relativeX(x), this.relativeY(y), 1, "ROCKET"));	
				}
			}
		}

		if(this.x > 0 && this.y <= 0){
			if(this.x == game.bossRooms[3][0] && this.y == game.bossRooms[3][1]){
				this.bossRoom = true;
				this.enemyManager.addEnemy(new followBot(this.relativeX(0), this.relativeY(0), 1, "ROCKET", true));	
			}
			else{
				for(var z = 0; z < 20; z++){
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;
					this.enemyManager.addEnemy(new followBot(this.relativeX(x), this.relativeY(y), 1, "BULLET"));	
				}
				for(var z = 0; z < game.common.randInt(6, 20); z++)
				{
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;

					var width = game.common.randInt(20, 80);
					var height = 5;

					var elevation = game.common.randInt(0, 2);
					this.pillars.push(new pillar(this.relativeX(x), this.relativeY(y), width, height, elevation));
				}

				for(var z = 0; z < game.common.randInt(6, 20); z++)
				{
					var x = Math.floor(Math.random() * (400)) - 200;
					var y = Math.floor(Math.random() * (400)) - 200;

					var width = 5
					var height = game.common.randInt(20, 80);

					var elevation = game.common.randInt(0, 2);
					this.pillars.push(new pillar(this.relativeX(x), this.relativeY(y), width, height, elevation));
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