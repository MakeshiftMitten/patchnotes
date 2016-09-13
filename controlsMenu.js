function controlsMenu(){
	this.stockControls = {
      Common : {
        SWITCH : 75,
        CAMERA : 67
      },
      //SHIP
      Ship : {
        ACCEL : 87,
        DECEL : 83,
        TURNRIGHT : 68,
        TURNLEFT : 65,
        SHOOT : 73,
        SPECIAL: 16
      },
      //TURNRIGHT

      //BOT
      Bot: {
        ACCEL : 87,
        DECEL : 83,
        TURNLEFT : 74,
        TURNRIGHT : 76,
        STRAFELEFT : 65,
        STRAFERIGHT : 68,
        SHOOT : 73,
        SPECIAL : 16
      }
    };

  this.reverseControls = {
      Common : {
        SWITCH : 75,
        CAMERA : 67
      },
      //SHIP
      Ship : {
        ACCEL : 83,
        DECEL : 87,
        TURNRIGHT : 68,
        TURNLEFT : 65,
        SHOOT : 73,
        SPECIAL: 16
      },
      //TURNRIGHT

      //BOT
      Bot: {
        ACCEL : 87,
        DECEL : 83,
        TURNLEFT : 65,
        TURNRIGHT : 68,
        STRAFELEFT : 74,
        STRAFERIGHT : 76,
        SHOOT : 73,
        SPECIAL : 16
      }
    };

    this.customControls = {
      Common : {
        SWITCH : 75,
        CAMERA : 67
      },
      //SHIP
      Ship : {
        ACCEL : 83,
        DECEL : 87,
        TURNRIGHT : 68,
        TURNLEFT : 65,
        SHOOT : 73,
        SPECIAL: 16
      },
      //TURNRIGHT

      //BOT
      Bot: {
        ACCEL : 87,
        DECEL : 83,
        TURNLEFT : 65,
        TURNRIGHT : 68,
        STRAFELEFT : 74,
        STRAFERIGHT : 76,
        SHOOT : 73,
        SPECIAL : 16
      }
    };
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