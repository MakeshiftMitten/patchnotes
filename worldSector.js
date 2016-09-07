function worldSector(x, y){

    this.pillars = [];
    this.bulletManager = new bulletManager();
    this.enemyManager = new enemyManager();            

	this.update = function(dt){
		for(var x = 0; x < this.pillars.length; x++){
			this.pillars[x].update(dt);
		}

		this.bulletManager.update(dt);
		this.enemyManager.update(dt);
	}

	this.draw = function(){

	}
}