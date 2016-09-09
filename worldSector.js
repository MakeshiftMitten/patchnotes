function worldSector(x, y, width, height){

	this.x = x;
	this.y = y;
	
    this.pillars = [];
    this.bulletManager = new bulletManager();
    this.enemyManager = new enemyManager();           

    this.height = height;
    this.width = width; 

    this.level = 1;

	this.update = function(dt){
		for(var x = 0; x < this.pillars.length; x++){
			this.pillars[x].update(dt);
		}

		this.bulletManager.update(dt);
		this.enemyManager.update(dt);
		console.log(this.enemyManager.enemies.length);
		if(this.enemyManager.enemies.length == 0)
			
			this.level = 0;
			

	}

	this.draw = function(){

	}
}