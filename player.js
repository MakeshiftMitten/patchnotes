function player(x, y){
    this.x = x;
    this.y = y;
    
    this.velX = 0;
    this.velY = 0;
    this.velStrafe = 0;
    this.velocity = 0;
    
    this.width = 1;
    this.height = 3;
    this.accel = 20;
    this.moveSpeed = 20;

    this.shotType = "MACHINEGUN";

    
    this.maxLife = 100;
    this.currentLife = 100;
    this.lifeRegen = 2;
    this.shotSpeed = 20;


    //cooldowns
    this.swapCooldown = 1;
    this.swapCooldownCurrent = 0;

    this.cameraCooldown = .25;
    this.cameraCooldownCurrent = 0;

    this.shotCooldown = .2;
    this.shotCooldownCurrent = 0;

    this.orientation = 90;
    this.heading = this.orientation;

    this.isAlive = true;
    this.state = "ship"; //ship, bot
    this.getElevation = function(){
        if(this.state == "ship"){
            if(this.highFlying){
                return 2;
            }
            return 1;
        }
        if(this.state == "bot"){
            return 0;
        }
    }

    this.onHit = function(damage){
        this.currentLife -= damage;
        console.log(this.currentLife);
    }

    this.right = function(){return this.x + this.width/2;};
    this.left = function(){return this.x - this.width/2};
    this.top = function(){return this.y + this.height/2};
    this.bottom = function(){return this.y - this.height/2};
    
    this.printSides = function(){        
        console.log("Player Right: " + this.right() + " Left: " + this.left() + " Top" + this.top() + " Bottom" + this.bottom());
    }
    
    this.draw = function(){
        if(this.isAlive){
            draw.drawPlayerRect(game.gameWidth/2, game.gameHeight/2, this.width, this.height, this.orientation);   
        }
        else{
            //draw.drawPlayerRect(game.gameWidth/2, game.gameHeight/2, this.width, this.height, -this.orientation)
        }
    }        
            
    this.update = function(dt){

        if(this.currentLife <= 0){
            this.isAlive = false;
            this.shoot("DEATH");
        }
        else{
            //Update Cooldowns
            this.swapCooldownCurrent -= dt;
            this.cameraCooldownCurrent -= dt;
            this.shotCooldownCurrent -= dt;

            if(game.keys[game.KeyBinds.Common.SWITCH]){
                if(this.swapCooldownCurrent <= 0)
                {
                    if(this.state =="bot"){
                        this.state = "ship";
                        this.shotType = "MACHINEGUN";
                    }
                    else if(this.state == "ship"){
                        this.state = "bot";
                        this.shotType = "SHOTGUN";
                    }
                    this.swapCooldownCurrent = this.swapCooldown;
                }
            }

            if(game.keys[game.KeyBinds.Common.CAMERA]){
                if(this.cameraCooldownCurrent <= 0)
                {
                    if(game.drawType =="camera"){
                        //draw = new drawPlayerCentricObject();
                        game.drawType = "player";
                    }
                    else if(game.drawType == "player"){
                        draw = new drawCameraCentricObject(this.x, this.y);
                        game.drawType = "camera";
                    }
                    this.cameraCooldownCurrent = this.cameraCooldown;
                }
            }

            if(game.drawType == "player")
            {
                draw.cameraX = this.x;
                draw.cameraY = this.y;
            }


                    
            if(this.state == "ship")
            {
                if(game.keys[game.KeyBinds.Ship.SHOOT]){
                    if(this.shotCooldownCurrent <= 0)
                    //console.log("shoot");
                        this.shoot(this.shotType);
                }

                this.velStrafe/= 1.3;
                //A
                if(game.keys[game.KeyBinds.Ship.TURNLEFT]){
                    this.orientation+=2;
                }
                //D
                if(game.keys[game.KeyBinds.Ship.TURNRIGHT]){
                    this.orientation-=2;
                }
                            
                if(game.keys[game.KeyBinds.Ship.ACCEL]){                
                    if(!game.keys[game.KeyBinds.Ship.DECEL]){
                        this.velocity += this.accel*2*dt;
                        //game.streamers.push(new bitStreamer(this.x, this.y, this.orientation, this.velocity/2, .4, .1)) 
                    }
                    if (this.velocity > this.moveSpeed*2)
                        this.velocity = this.moveSpeed*2;
                }
                
                if(game.keys[game.KeyBinds.Ship.DECEL]){
                    this.velocity += -this.accel*dt;
                    if (this.velocity < -this.moveSpeed*2)
                        this.velocity = -this.moveSpeed*2;
                }

                if(this.velocity < 10)
                    this.velocity += this.accel*dt;

                if(!game.keys[game.KeyBinds.Ship.SPECIAL])
                    this.heading = this.orientation;
            }
            if(this.state == "bot")
            {
                if(game.keys[game.KeyBinds.Bot.SHOOT]){
                    if(this.shotCooldownCurrent <= 0)
                    //console.log("shoot");
                        this.shoot(this.shotType);
                }

                 //A
                if(game.keys[game.KeyBinds.Bot.STRAFELEFT]){
                    this.velStrafe += -this.accel*20*dt;            
                    if(this.velStrafe < -this.moveSpeed)
                        this.velStrafe = -this.moveSpeed;
                }
                //D
                else if(game.keys[game.KeyBinds.Bot.STRAFERIGHT]){
                    this.velStrafe += this.accel*20*dt;
                    if(this.velStrafe > this.moveSpeed)
                        this.velStrafe = this.moveSpeed;
                }
                else 
                    this.velStrafe /= 2;

                //A
                if(game.keys[game.KeyBinds.Bot.TURNLEFT]){
                    this.orientation+=2;            
                }
                //D
                else if(game.keys[game.KeyBinds.Bot.TURNRIGHT]){
                    this.orientation-=2;;
                }
                            
                if(game.keys[game.KeyBinds.Bot.ACCEL]){
                    this.velocity += this.accel*20*dt;
                    if (this.velocity > this.moveSpeed)
                        this.velocity = this.moveSpeed;
                }
                
                else if(game.keys[game.KeyBinds.Bot.DECEL]){
                    this.velocity += -this.accel*20*dt;
                    if (this.velocity < -this.moveSpeed)
                        this.velocity = -this.moveSpeed;
                }
                else
                    this.velocity/=1.1;

                this.heading = this.orientation;
            }
        
        


        
        this.updateState(dt);
        
        var oldX = this.x;
        var oldY = this.y;
        
        //this.x += this.velX;
        //this.y += this.velY; 

        this.x += this.velocity * Math.cos(toRad(this.heading))*dt + this.velStrafe * Math.cos(toRad(this.heading - 90))*dt;
        this.y += this.velocity * Math.sin(toRad(this.heading))*dt + this.velStrafe * Math.sin(toRad(this.heading - 90))*dt;  

        //Wall Hit Detection
        for(var p = 0; p < game.currentSector.pillars.length; p++){
            var pillar = game.currentSector.pillars[p];

            if(pointInRectangle(this, pillar)){
                if(this.state == "ship"){
                    if(pillar.elevation == 1){
                        this.currentLife -= this.maxLife;
                        this.isAlive = false;
                    }
                }
                else if(this.state == "bot")
                    if(oldX < pillar.left() && this.x > pillar.left() 
                        || oldX > pillar.right() && this.x < pillar.right())
                        this.x = oldX;
                    if(oldY < pillar.bottom() && this.y > pillar.bottom()
                        || oldY > pillar.top() && this.y < pillar.top())
                        this.y = oldY;
            }
        }

        //console.log(this.getSector(oldX, oldY));
        if(Math.floor((this.y+200)/400) != game.currentSector.y || Math.floor((this.x+200)/400) != game.currentSector.x)
        {
            console.log(this.getSector(this.x) + " " + this.getSector(this.y));
            game.currentSector = game.sectors[Math.floor((this.x+200)/400)][Math.floor((this.y+200)/400)];
        }
        
        }
        
    }

    this.getSector = function(x){
        return Math.floor((x+200)/400);
    }
    
    this.updateState = function(dt){
        
    }

    this.shoot = function(shotType){    

        if(shotType == "SHOTGUN"){
            game.currentSector.bulletManager.addBullet(new bullet(this.x, this.y, this.orientation, 100, .4, 0, true));
            game.currentSector.bulletManager.addBullet(new bullet(this.x, this.y, this.orientation-3, 100, .4, 0, true));
            game.currentSector.bulletManager.addBullet(new bullet(this.x, this.y, this.orientation+3, 100, .4, 0, true));
            game.currentSector.bulletManager.addBullet(new bullet(this.x, this.y, this.orientation-7, 100, .4, 0, true));
            game.currentSector.bulletManager.addBullet(new bullet(this.x, this.y, this.orientation+7, 100, .4, 0, true));
            this.shotCooldownCurrent = this.shotCooldown*2;
        }
        else if(shotType == "MACHINEGUN"){
            var pushBullet = new bullet(this.x, this.y, this.orientation, 100, 1, 1, true);
            game.currentSector.bulletManager.addBullet(pushBullet);
            this.shotCooldownCurrent  = this.shotCooldown/2;
        }
        else if(shotType == "DEATH"){
            game.currentSector.bulletManager.addBullet(new bullet(this.x, this.y, this.orientation+45, 100, .4, 2, true));
            game.currentSector.bulletManager.addBullet(new bullet(this.x, this.y, this.orientation+45*2, 100, .4, 2, true));
            game.currentSector.bulletManager.addBullet(new bullet(this.x, this.y, this.orientation+45*3, 100, .4, 2, true));
            game.currentSector.bulletManager.addBullet(new bullet(this.x, this.y, this.orientation+45*4, 100, .4, 2, true));
            game.currentSector.bulletManager.addBullet(new bullet(this.x, this.y, this.orientation+45*5, 100, .4, 2, true));
        }



        
    }
}