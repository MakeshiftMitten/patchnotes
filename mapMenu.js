function mapMenu(){
    this.switchTimer = .5;
    this.currentSwitchTimer = this.switchTimer;
    this.selectedSectionX = 2;
    this.selectedSectionY = 2;
    
    this.load = function(){
      this.selectedSectionX = game.currentSector.x - Math.floor(game.dimensions/2);
      this.selectedSectionY = game.currentSector.y - Math.floor(game.dimensions/2);
    }

    this.update = function(dt){

      this.currentSwitchTimer-= dt;
      if(this.currentSwitchTimer < 0){
        if(game.keys[39]){
          this.selectedSectionX++;
          this.selectedSectionX +=game.dimensions
          this.selectedSectionX %= game.dimensions;  
          console.log("map.x: " + this.selectedSectionX + "map.y: " + this.selectedSectionY);
          this.currentSwitchTimer = this.switchTimer;
        }
        else if(game.keys[37]){
          this.selectedSectionX--;
          this.selectedSectionX +=game.dimensions
          this.selectedSectionX %= game.dimensions;  
          console.log("map.x: " + this.selectedSectionX + "map.y: " + this.selectedSectionY);
          this.currentSwitchTimer = this.switchTimer;
        }
        else if(game.keys[38]){
          this.selectedSectionY++;
          this.selectedSectionY += game.dimensions;  
          this.selectedSectionY %= game.dimensions;  
          console.log("map.x: " + this.selectedSectionX + "map.y: " + this.selectedSectionY);
          this.currentSwitchTimer = this.switchTimer;
        }
        else if(game.keys[40]){
          this.selectedSectionY--;
          this.selectedSectionY += game.dimensions;  
          this.selectedSectionY %= game.dimensions;  
          console.log("map.x: " + this.selectedSectionX + "map.y: " + this.selectedSectionY);
          this.currentSwitchTimer = this.switchTimer;
        }
        else if(game.keys[13]){          
          if(game.getSector(this.selectedSectionX - Math.floor(game.dimensions/2), this.selectedSectionY - Math.floor(game.dimensions/2)) != undefined && game.getSector(this.selectedSectionX - Math.floor(game.dimensions/2), this.selectedSectionY - Math.floor(game.dimensions/2)).level == 0){
            game.currentSector = game.getSector(this.selectedSectionX - Math.floor(game.dimensions/2), this.selectedSectionY - Math.floor(game.dimensions/2));
            //game.loadSector(this.selectedSectionX - Math.floor(game.dimensions/2), this.selectedSectionY - Math.floor(game.dimensions/2));
            game.players[0].x = (game.currentSector.x*400);
            game.players[0].y = (game.currentSector.y*400);

            console.log(game.currentSector.x-200)*400;
            //
            game.screen = "GAME";
          }          
          this.currentSwitchTimer = this.switchTimer;
        }

      }
    }
    

     
    

    this.draw = function(dt){
      draw.drawMapMenu();
    }
}