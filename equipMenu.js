function equipMenu(){
    this.controlsTimer = .5;
    this.currentControlsTimer = this.controlsTimer;
    this.controlsChoice = 0;
    this.controlTypes = ["REGULAR", "REVERSE", "CUSTOM1"];


    this.update = function(dt){
      this.currentControlsTimer-= dt;
      if(this.currentControlsTimer < 0){
        if(game.keys[39]){
          this.controlsChoice++;
          this.controlsChoice %= this.controlTypes.length;

          if(this.controlsChoice == "REGULAR"){
            game.KeyBinds = this.stockControls;
          }
          else if(this.controlsChoice == "REVERSE"){
            game.KeyBinds = this.reverseControls;
          }
          else if(this.controlsChoice == "CUSTOM1"){
            game.KeyBinds = this.customControls;
          }
          else{
            game.KeyBinds = this.stockControls;
          }
          
          this.currentControlsTimer = this.controlsTimer;
        }  
      }
    }
    

     
    

    this.draw = function(dt){
      draw.drawControlsMenu();
    }
}