function drawCameraCentricObject(cameraX, cameraY){
    this.cameraX = cameraX;
    this.cameraY = cameraY;
    //Function to draw the entire screen
    this.drawGame = function(){
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");        

            //Bounding Rect    
            //ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); 
            draw.drawBackgroundRect(game.gameWidth/2, game.gameHeight/2, game.gameWidth, game.gameHeight, game.colors.Background);
            
            this.drawGrid();

            for(var p = 0; p < game.currentSector.pillars.length; p++){                
                game.currentSector.pillars[p].draw();
            }

            game.currentSector.bulletManager.draw();

            game.currentSector.enemyManager.draw();

            for(var b = 0; b < game.coordinates.length; b++){
                game.coordinates[b].draw();
            }

            for(var p = 0; p < game.players.length; p++){                
                game.players[p].draw();
            }
            //Scaling rect 
            ctx.beginPath();
            ctx.fillStyle = "#000000";           
            ctx.rect(0, gameCanvas.height - gameYToCanvasY(20), gameCanvas.width, gameCanvas.height);       
            ctx.stroke();
            ctx.fill();
            ctx.font = gameXToCanvasX(3).toString()+"px Consolas";
            draw.drawInfoText(10, 15, "Life: " + game.players[0].currentLife);
            draw.drawInfoText(10, 12, "Sector: " + game.currentSector.x + " , " + game.currentSector.y);
            draw.drawInfoText(10, 9, "Level: " + game.currentSector.level);
            draw.drawInfoText(10, 6, "Enemies: " + game.currentSector.enemyManager.enemies.length);
            draw.drawInfoText(10, 3, "Bosses Left: " + game.bossRoomCount);

            draw.drawInfoText(40, 15, "Controls: ");
            draw.drawInfoText(40, 12, "Move(Ship): WASD");
            draw.drawInfoText(40, 9,  "Move(Bot): WASD + J/L");
            draw.drawInfoText(40, 6,  "Shoot: I Secondary: K ");
            draw.drawInfoText(40, 3,  "Transform: Space");

            draw.drawInfoText(80, 15, "Controls: ");
            draw.drawInfoText(80, 12, "Special Move: Shift");
            draw.drawInfoText(80, 9,  "Map: M");

            draw.drawText(50, -25, "Fly Over Low(Dark) Pillars");
            draw.drawText(80, 0, "Crash into high ones as a plane :(");

            draw.drawText(-90, -25, "Transform(Space) to ground mode to use both as cover!");
            draw.drawText(-90, -55, "Fly over unpatched nodes, but don't try to ride across them as a bot!");

            draw.drawText(-20, -10, "If you die, you will respawn here!");


            draw.drawText(-20, 10, "Dodge bright bullets!");

            draw.drawText(-20, 40, "Fly over dark bullets as a plane  or dodge them as the walker!");


            draw.drawText(-20, 62, "I for primary weapon, K for secondary!");

            draw.drawText(-40, 82, "Press shift to access your special!");

            draw.drawText(-40, 100, "Take out all enemies in a zone to make it safe!");

            draw.drawText(-40, 220, "Once a zone is clear, you can teleport to it by accessing the map(m), selecting a blue zone, and pressing enter!");

            draw.drawText(-40, 240, "Clear the four bosses, located at 1:1, 1:-1, -1:1, and -1:-1 to beat the game!");





            



            ctx.closePath();

            // draw.drawFilledRectCentered(game.gameWidth/2, game.gameHeight/2, game.gameWidth, game.gameHeight - gameYToCanvasY(20), "#0000FF");                   
            
    }

    this.drawControlsMenu = function()
    {
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");        

        //Bounding Rect            
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); 
        draw.drawBackgroundRect(game.gameWidth/2, game.gameHeight/2, game.gameWidth, game.gameHeight, game.colors.Background);

        draw.drawInfoText(10, game.gameHeight - 10, game.controlsMenu.controlTypes[game.controlsMenu.controlsChoice]);

        
        var row = 1;
        draw.drawInfoText(15, game.gameHeight - 10 - 5*row, "Common");
        row++;
        for (var prop in game.KeyBinds.Common){
            
             draw.drawInfoText(20, game.gameHeight - 10 - 5*row, prop);
             row++;
        }

        draw.drawInfoText(15, game.gameHeight - 10 - 5*row, "Ship");
        row++;
        for (var prop in game.KeyBinds.Ship){
            
             draw.drawInfoText(20, game.gameHeight - 10 - 5*row, prop);
             row++;
        }

        draw.drawInfoText(15, game.gameHeight - 10 - 5*row, "Bot");
        row++;
        for (var prop in game.KeyBinds.Bot){
            
             draw.drawInfoText(20, game.gameHeight - 10 - 5*row, prop);
             row++;
        }
            
        

    }

    this.drawEquipmentMenu = function()
    {
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");        

        //Bounding Rect    
        console.log("equipment");
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); 
        draw.drawBackgroundRect(game.gameWidth/2, game.gameHeight/2, game.gameWidth, game.gameHeight, game.colors.Background);     
    }

    this.drawMapMenu = function()
    {
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");        

        this.cameraX = 0;
        this.cameraY = 0;
        //Bounding Rect            
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); 
        draw.drawBackgroundRect(game.gameWidth/2, game.gameHeight/2, game.gameWidth, game.gameHeight, game.colors.Background);     

        var selectedX = game.mapMenu.selectedSectionX//-Math.floor(game.dimensions/2);
        var selectedY = game.mapMenu.selectedSectionY//-Math.floor(game.dimensions/2);
        var currentSectorX = game.currentSector.x + Math.floor(game.dimensions/2);
        var currentSectorY = game.currentSector.y + Math.floor(game.dimensions/2);

        draw.drawRectCentered(selectedX*20-game.dimensions*10 , selectedY*20  -game.dimensions*10, 20, 20, "#FFFFFF", true);    
        var innerColor = "#000000";    
        var innerColor = "#000000";
        draw.drawRectCentered(currentSectorX*20-game.dimensions*10 , currentSectorY*20  -game.dimensions*10, 19, 19, "#00FF00", true);
        for(var x = 0; x < game.dimensions; x++){
            for(var y = 0; y < game.dimensions; y++){                
                topColor = "#0000FF";
                innerColor = "#000088";
                if(game.sectors[x][y] == undefined)
                    innerColor = "#444444";
                else if(game.sectors[x][y].level > 0){
                    topColor = "#FF0000";
                    innerColor = "#880000";
                }
                if(game.selectedX == x && game.selectedY == y)
                    topColor = "#00FF00";
                draw.drawRectCentered(x*20 -game.dimensions*10 , y*20 -game.dimensions*10, 18, 18, topColor , true);
                draw.drawRectCentered(x*20 -game.dimensions*10 , y*20 -game.dimensions*10, 14, 14, innerColor, true);


            }
        }
        

        
        //draw.drawRectCentered(currentSectorX*20-game.dimensions*10 , currentSectorY*20  -game.dimensions*10, 14, 14, innerColor, true);
    }


    
    this.drawGrid = function()
    {
        var ctx = game.ctx;

        ctx.strokeStyle = "#00FF00";
        ctx.fillStyle = "#00FF00";
        //(text, gameXToCanvasX(gameX + game.gameWidth/2 - cameraX), gameYToCanvasY(-gameY + game.gameHeight/2 + cameraY))        ;

        //horizontal lines
        for(var x = -game.currentSector.height/40; x <= game.currentSector.height/40; x++){
            ctx.beginPath();
            ctx.moveTo(gameXToCanvasX(-game.currentSector.width/2 + game.gameWidth/2 - this.cameraX + 400*game.currentSector.x), gameYToCanvasY(x*20 + game.gameHeight/2 + this.cameraY - 400*game.currentSector.y));
            ctx.lineTo(gameXToCanvasX(game.currentSector.width/2 + game.gameWidth/2 - this.cameraX + 400*game.currentSector.x), gameYToCanvasY(x*20 + game.gameHeight/2 + this.cameraY - 400*game.currentSector.y));
            ctx.stroke();
            ctx.closePath();
        }
        //vertical lines
        for(var x = -game.currentSector.width/40; x <= game.currentSector.width/40; x++){   
            ctx.beginPath();
            ctx.moveTo(gameXToCanvasX(x*20 + game.gameWidth/2 - this.cameraX + 400*game.currentSector.x), gameYToCanvasY(-game.currentSector.height/2 + game.gameHeight/2 + this.cameraY - 400*game.currentSector.y));
            ctx.lineTo(gameXToCanvasX(x*20 + game.gameWidth/2 - this.cameraX + 400*game.currentSector.x), gameYToCanvasY(game.currentSector.height/2 + game.gameHeight/2 + this.cameraY - 400*game.currentSector.y));
            ctx.stroke();
            ctx.closePath();
        }
    }

    //Draw Primitives
    this.drawRect = function(gameX, gameY, gameWidth, gameHeight)
    {
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= game.ctx;// gameCanvas.getContext("2d");   

        ctx.rect(gameXToCanvasX(gameX), gameYToCanvasY(gameY), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
        ctx.stroke();
    }

    this.drawPlayerRect = function(gameX, gameY, gameWidth, gameHeight, orientation)
    {
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= game.ctx;// gameCanvas.getContext("2d");   
        var ship = game.players[0];
        ctx.save();


        ctx.fillStyle = "#00AAAA";
        ctx.strokeStyle = "#00AAAA";
        ctx.style = "#00AAAA";        

        ctx.translate(gameXToCanvasX(game.players[0].x + game.gameWidth/2 - this.cameraX ), gameYToCanvasY(-game.players[0].y + game.gameHeight/2 + this.cameraY));
        ctx.rotate(toRad(-orientation+90));
        //ctx.beginPath();
        if(ship.state=="ship"){
            ctx.beginPath();
                ctx.moveTo(gameXToCanvasX(0),gameYToCanvasY(-2));
                ctx.lineTo(gameXToCanvasX(-.5), gameYToCanvasY(2));
                ctx.lineTo(gameXToCanvasX(.5),gameYToCanvasY(2));
                ctx.strokeStyle = "#00AAAA";
                ctx.stroke();
                ctx.fill();
            ctx.closePath();


            ctx.beginPath();
                ctx.moveTo(gameXToCanvasX(0),gameYToCanvasY(-1));
                ctx.lineTo(gameXToCanvasX(-1), gameYToCanvasY(1));
                ctx.lineTo(gameXToCanvasX(1),gameYToCanvasY(1));
                ctx.fill();
                ctx.strokeStyle = "#00AAAA";
                ctx.stroke();
            ctx.closePath();

        }
        if(ship.state=="bot"){
            ctx.rect(gameXToCanvasX(-ship.width/2 - ship.width), gameYToCanvasY(-ship.height/2), gameXToCanvasX(gameWidth/2), gameYToCanvasY(gameHeight));
            ctx.rect(gameXToCanvasX(ship.width), gameYToCanvasY(-ship.height/2), gameXToCanvasX(gameWidth/2), gameYToCanvasY(gameHeight));
            ctx.rect(gameXToCanvasX(-ship.height/2), gameYToCanvasY(ship.height/8), gameXToCanvasX(ship.height), gameYToCanvasY(ship.width/2));
            ctx.strokeStyle = "#00AAAA";
            ctx.fill();
        }
        //ctx.closePath();
        ctx.restore();


        //ctx.stroke();


    }

        this.drawChaseBot = function(gameX, gameY, gameWidth, gameHeight, orientation)
    {
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= game.ctx;// gameCanvas.getContext("2d");   
        var ship = game.players[0];
        ctx.save();


        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = "#FF0000";
        ctx.style = "#FF0000";        

        ctx.translate(gameXToCanvasX(gameX + game.gameWidth/2 - this.cameraX ), gameYToCanvasY(-gameY + game.gameHeight/2 + this.cameraY));
        ctx.rotate(toRad((-orientation-90)));
        //ctx.beginPath();
        if(ship.state=="ship"){
            ctx.beginPath();
                ctx.moveTo(gameXToCanvasX(0),gameYToCanvasY(-2));
                ctx.lineTo(gameXToCanvasX(-.5), gameYToCanvasY(2));
                ctx.lineTo(gameXToCanvasX(.5),gameYToCanvasY(2));
                ctx.strokeStyle = "#FF0000";
                ctx.stroke();
                ctx.fill();
            ctx.closePath();


            ctx.beginPath();
                ctx.moveTo(gameXToCanvasX(0),gameYToCanvasY(-1));
                ctx.lineTo(gameXToCanvasX(-1), gameYToCanvasY(1));
                ctx.lineTo(gameXToCanvasX(1),gameYToCanvasY(1));
                ctx.fill();
                ctx.strokeStyle = "#FF0000";
                ctx.stroke();
            ctx.closePath();

        }
        if(ship.state=="bot"){
            ctx.rect(gameXToCanvasX(-ship.width/2 - ship.width), gameYToCanvasY(-ship.height/2), gameXToCanvasX(gameWidth/2), gameYToCanvasY(gameHeight));
            ctx.rect(gameXToCanvasX(ship.width), gameYToCanvasY(-ship.height/2), gameXToCanvasX(gameWidth/2), gameYToCanvasY(gameHeight));
            ctx.rect(gameXToCanvasX(-ship.height/2), gameYToCanvasY(ship.height/8), gameXToCanvasX(ship.height), gameYToCanvasY(ship.width/2));
            ctx.strokeStyle = "#FF0000";
            ctx.fill();
        }
        //ctx.closePath();
        ctx.restore();


        //ctx.stroke();


    }

    this.drawRectCentered = function(gameX, gameY, gameWidth, gameHeight, color, fill)
    {
        
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");   
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(gameXToCanvasX(gameX - gameWidth/2 + game.gameWidth/2 - this.cameraX), gameYToCanvasY(-gameY - gameHeight/2 + game.gameHeight/2 + this.cameraY), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
        ctx.stroke();
        if(fill)
            ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    this.drawRectRotatedCentered = function(gameX, gameY, gameWidth, gameHeight, orientation, color, fill)
    {
        
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");   
        ctx.save();
        ctx.translate(gameXToCanvasX(gameX + game.gameWidth/2 - this.cameraX ), gameYToCanvasY(- gameY + game.gameHeight/2 + this.cameraY));
        ctx.rotate(toRad(-orientation+90));
        ctx.translate(gameXToCanvasX(-gameX - game.gameWidth/2 + this.cameraX ), gameYToCanvasY(gameY - game.gameHeight/2 - this.cameraY));
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(gameXToCanvasX(gameX - gameWidth/2 + game.gameWidth/2 - this.cameraX), gameYToCanvasY(-gameY - gameHeight/2 + game.gameHeight/2 + this.cameraY), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
        ctx.stroke();
        if(fill)
            ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    this.drawRect = function(gameX, gameY, gameWidth, gameHeight, color, fill)
    {
        
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");   
        ctx.save();
        ctx.beginPath();
        ctx.rect(gameXToCanvasX(gameX + game.gameWidth/2 - this.cameraX), gameYToCanvasY(-gameY + game.gameHeight/2 + this.cameraY), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
        ctx.stroke();
        if(fill)
            ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    
    this.drawBackgroundRect = function(gameX, gameY, gameWidth, gameHeight, color)
    {
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");   
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.rect(gameXToCanvasX(gameX-gameWidth/2), gameYToCanvasY(gameY-gameHeight/2), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    
    this.drawCircle = function(gameX, gameY, radius, color, fill)
    {    
        var ctx= game.ctx;// gameCanvas.getContext("2d");  
        ctx.beginPath();
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.arc(gameXToCanvasX(gameX + game.gameWidth/2 - this.cameraX), gameYToCanvasY(-gameY + game.gameHeight/2 + this.cameraY), gameXToCanvasX(radius), 0, 2 * Math.PI, false);
        if(fill){
            ctx.fillStyle = color;
            ctx.fill();
        }

        ctx.stroke();    
        ctx.restore();
    }

    this.drawFilledCircle = function(gameX, gameY, radius, color)
    { 
        var ctx= game.ctx;// gameCanvas.getContext("2d");  
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(gameXToCanvasX(gameX), gameYToCanvasY(gameY), gameXToCanvasX(radius), 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();    
        ctx.restore();
    }

    this.drawText = function(gameX, gameY, text, color)
    {
        var ctx = game.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#00FF00";
        if(color != undefined)
            ctx.fillStyle = color;
        ctx.fillText(text, gameXToCanvasX(gameX + game.gameWidth/2 - this.cameraX), gameYToCanvasY(-gameY + game.gameHeight/2 + this.cameraY))        ;    
        ctx.stroke();
        ctx.restore();
    }

    this.drawInfoText = function(gameX, gameY, text)
    {
        var ctx = game.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#00FF00";
        ctx.fillText(text, gameXToCanvasX(gameX), gameYToCanvasY(game.gameHeight - gameY));    
        ctx.stroke();
        ctx.restore();
    }

    this.drawColoredText = function(gameX, gameY, text, color)
    {
        var ctx = game.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillText(text, gameXToCanvasX(gameX), gameYToCanvasY(game.gameHeight - gameY));    
        ctx.stroke();
        ctx.restore();
    }
}

function toRad(deg) {
  return deg * Math.PI / 180
}

function toDeg(rad) {
    return rad / Math.PI * 180;
}