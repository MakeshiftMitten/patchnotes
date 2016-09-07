function gameObject(){
    
    //Game Dimensions in Game Units. I think of them as meters, but this is what you will do all of your position updating in. 
    this.gameWidth = 200 ;
    this.gameHeight = this.gameWidth * 3.0/4.0; 
    
    var FloatingInSpace = {"Background":"#000000", "Ship":"#00FF00", "Enemy":"#CEF5FB", "Bomb":"#343A3B", "Well":"#8AAAAF"};
    //var FloatingInSpace = {"Background":"#5D6F72", "Ship":"#80CCD8", "Enemy":"#CEF5FB", "Bomb":"#343A3B", "Well":"#8AAAAF"};
    
    var stockKeyBinds = {
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
        TURNLEFT : 65,
        TURNRIGHT : 68,
        STRAFELEFT : 74,
        STRAFERIGHT : 76,
        SHOOT : 73,
        SPECIAL : 16
      }
    };

    this.controlsMenu = new controlsMenu();

    this.KeyBinds = stockKeyBinds;

    this.menuTimerMax = 1;
    this.menuTimer = this.menuTimerMax;

    this.screen = "GAME";
    this.colors = FloatingInSpace;
    
    //Canvas Context for easy referencing
    this.Canvas = document.getElementById('gameCanvas');
    this.ctx = this.Canvas.getContext("2d"); 
    
    this.isMobile = function(){         
    if( navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)
         ){
            return true;
            }
         else {
            return false;
          }
    }        

    this.draw = function(){
      if(this.screen == "MENU"){
        draw.drawControlsMenu();
        this.controlsMenu.draw();
      }
      else if(this.screen =="GAME"){
        draw.drawGame();
        }
      else if(this.screen =="EQUIP"){
        draw.drawEquipmentMenu();
      }

    }

    this.update = function(dt){
        this.menuTimer -= dt;

        //Handle Menu Switches
        if(game.keys[77]){
            if(this.menuTimer < 0){
                if(this.screen == "MENU"){
                    this.screen = "GAME";
                    console.log('toGame');
                }
                else {
                    this.screen = "MENU";
                    console.log('toMenu');
                }
                this.menuTimer = this.menuTimerMax;
            }
        }

        else if(game.keys[78]){
            if(this.menuTimer < 0){
                if(this.screen == "EQUIP"){
                    this.screen = "GAME";                
                }
                else {
                    this.screen = "EQUIP";                    
                }
                this.menuTimer = this.menuTimerMax;
            }
        }

        //Handle Menu Updates
        if(this.screen == "GAME"){
            this.updateGame(dt);
        }
        else if(this.screen == "MENU"){    
            this.updateControlsMenu(dt);
        }
        else if(this.screen == "EQUIP"){
            this.updateEquipmentMenu(dt);
        }
    }    

    this.updateEquipmentMenu = function(dt){

    }

    this.updateControlsMenu = function(dt){
        this.controlsMenu.update(dt);
    }

    this.updateGame = function(dt){

        for(var p = 0; p < game.players.length; p++){
            game.players[p].update(dt);
        } 

        this.currentSector.update(dt);

            // if(game.keys[82]){
        // console.log("new!");
        // game = new gameObject();
        // game.init();
        // }
    }
           
    
    //Physics Variables
    //this.gravity = 10;
    this.gravity = 0;
    
    //Game Settings
    this.level = 0;
    this.score = 0;
    
    //Set up game object arrays here
    this.clicks = [];
    this.keys = [];
    this.buttons = [];
    this.meters = [];

    this.players = [];
    this.boxes = [];
    this.coordinates = [];

    this.currentSector = new worldSector(0, 0);
    this.sectors = [];

    this.streamers = [];

    this.drawType = "player";

    //this.bulletManager = new bulletManager();
    //this.enemyManager = new enemyManager();

    //Timers
    
    //Game Objects            
    this.meterTypes = {"Level":0};        
    
    this.init = function(){
        //Add a player
        //this.players.push(new player(this.gameWidth/2, this.gameHeight/2));
        this.players.push(new player(0, 0));       
        // this.boxes.push(new box(this.gameWidth/2, this.gameHeight/2));
        // this.boxes.push(new box(10, 10));
        for(var x = 0; x < 200; x+=25){
            this.coordinates.push(new coordinate(-x, x));
            this.coordinates.push(new coordinate(x, x));
            this.coordinates.push(new coordinate(-x, -x));
            this.coordinates.push(new coordinate(x, -x));
        }

        for(var x = 0; x < 5; x++){
            this.sectors.push([]);
            for(var y = 0; y < 5; y++){
                this.sectors[x].push(undefined);
            }

        }



        this.currentSector.pillars.push(new pillar(70, 40, 5, 100, 0));
        this.currentSector.pillars.push(new pillar(-70, 40, 5, 100, 0));

        this.currentSector.pillars.push(new pillar(90, 40, 5, 100, 1));
        this.currentSector.pillars.push(new pillar(-90, 40, 5, 100, 1));

        this.currentSector.enemyManager.addEnemy(new followBot(this.players[0].x + 30, this.players[0].y + 60, 1));

        this.sectors[0][0] = new worldSector(0, 0);
        this.sectors[0][1] = new worldSector(0, 1);


        this.sectors[0][0].pillars.push(new pillar(70, 40, 5, 100, 0));
        this.sectors[0][0].pillars.push(new pillar(-70, 40, 5, 100, 0));

        this.sectors[0][0].pillars.push(new pillar(90, 40, 5, 100, 1));
        this.sectors[0][0].pillars.push(new pillar(-90, 40, 5, 100, 1));

        this.sectors[0][0].enemyManager.addEnemy(new followBot(- 30, this.players[0].y + 60, 1));
        this.sectors[0][0].enemyManager.addEnemy(new followBot( - 10, this.players[0].y + 60, 1));
        this.sectors[0][0].enemyManager.addEnemy(new followBot(20, this.players[0].y + 60, 1));


        this.sectors[0][1].pillars.push(new pillar(70, 440, 5, 100, 0));
        this.sectors[0][1].pillars.push(new pillar(-70, 440, 5, 100, 0));

        this.sectors[0][1].pillars.push(new pillar(90, 440, 5, 100, 1));
        this.sectors[0][1].pillars.push(new pillar(-90, 440, 5, 100, 1));

        this.sectors[0][1].enemyManager.addEnemy(new followBot(30, 460, 0));
        this.sectors[0][1].enemyManager.addEnemy(new followBot(70, 460, 0));
        this.sectors[0][1].enemyManager.addEnemy(new followBot(-10, 460, 0));


        this.currentSector = this.sectors[0][0];

        // this.currentSector.enemyManager.addEnemy(new followBot(this.players[0].x + 10, this.players[0].y + 60, 1));
        // this.currentSector.enemyManager.addEnemy(new followBot(this.players[0].x - 40, this.players[0].y + 60, 1, 0));
        // this.currentSector.enemyManager.addEnemy(new followBot(this.players[0].x - 20, this.players[0].y + 60, 1));

        // this.currentSector.enemyManager.addEnemy(new followBot(this.players[0].x + 30, this.players[0].y - 60, 0));
        // this.currentSector.enemyManager.addEnemy(new followBot(this.players[0].x + 10, this.players[0].y - 60, 0));
        // this.currentSector.enemyManager.addEnemy(new followBot(this.players[0].x - 40, this.players[0].y - 60, 0));
        // this.currentSector.enemyManager.addEnemy(new followBot(this.players[0].x - 20, this.players[0].y - 60, 0));

        //this.followBots.push(new followBot(10, 10));

        //Add Meters         
        this.meters.push(new meter(this.gameWidth/2, this.gameHeight - 17.5, this.meterTypes.Level));
        

        //Time Stuff
        this.lastTime = Date.now();
        this.nowTime = this.lastTime;
    }
    
    
    this.levelUp = function(){
        this.currentLevelTimer = 0;            
    }
    /*
        game.generators.push(new shipGenerator(game.gameWidth/2 + Math.random()*game.gameWidth/2-game.gameWidth/4,game.gameHeight/2 + Math.random()*game.gameHeight/2-game.gameHeight/4 , 3, 3, 5, this.weapons.Bomb));
        game.generators.push(new shipGenerator(game.gameWidth/2 + Math.random()*game.gameWidth/2-game.gameWidth/4,game.gameHeight/2 + Math.random()*game.gameHeight/2-game.gameHeight/4 , 3, 3, 5, this.weapons.Well));
        */
         
        
}