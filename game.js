function gameObject(){
    
    //Game Dimensions in Game Units. I think of them as meters, but this is what you will do all of your position updating in. 
    this.gameWidth = 200 ;
    this.gameHeight = this.gameWidth * 3.0/4.0; 
    
    var FloatingInSpace = {"Background":"#000000", "Ship":"#00FF00", "Enemy":"#CEF5FB", "Bomb":"#343A3B", "Well":"#8AAAAF"};
    //var FloatingInSpace = {"Background":"#5D6F72", "Ship":"#80CCD8", "Enemy":"#CEF5FB", "Bomb":"#343A3B", "Well":"#8AAAAF"};
    
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
    this.bullets = [];
    this.followBots = [];

    this.drawType = "player";
    
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