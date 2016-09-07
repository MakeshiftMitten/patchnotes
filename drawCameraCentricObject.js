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

            // for(var b = 0; b < game.currentSector.coordinates.length; b++){
            //     game.coordinates[b].draw();
            // }

            for(var p = 0; p < game.currentSector.pillars.length; p++){                
                game.currentSector.pillars[p].draw();
            }

            game.currentSector.bulletManager.draw();

            game.currentSector.enemyManager.draw();


            for(var b = 0; b < game.coordinates.length; b++){
                game.coordinates[b].draw();
            }

            // for(var p = 0; p < game.pillars.length; p++){                
            //     game.pillars[p].draw();
            // }

            // for(var b = 0; b < game.streamers.length; b++){
            //     game.streamers[b].draw();
            // }

            for(var p = 0; p < game.players.length; p++){                
                game.players[p].draw();
            }


            // game.bulletManager.draw();

            // game.enemyManager.draw();


            ctx.stroke();    
            ctx.closePath();
            //Scaling rect 
            ctx.beginPath();
            ctx.fillStyle = "#000000";           
            ctx.rect(0, gameCanvas.height - gameYToCanvasY(20), gameCanvas.width, gameCanvas.height);       
            ctx.stroke();
            ctx.fill();
            draw.drawInfoText(10, 15, "Life: " + game.players[0].currentLife);
            ctx.closePath();

            // draw.drawFilledRectCentered(game.gameWidth/2, game.gameHeight/2, game.gameWidth, game.gameHeight - gameYToCanvasY(20), "#0000FF");                   
            
    }

    this.drawControlsMenu = function()
    {
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");        

        //Bounding Rect    
        console.log("controls");
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
        console.log("controls");
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); 
        draw.drawBackgroundRect(game.gameWidth/2, game.gameHeight/2, game.gameWidth, game.gameHeight, game.colors.Background);

        for(var p = 0; p < game.pillars.length; p++){                
                game.pillars[0].draw();
        }
    }
    
    this.drawGrid = function()
    {
        var ctx = game.ctx;
        ctx.beginPath();
        ctx.strokeStyle = "#00FF00";
        ctx.fillStyle = "#00FF00";
        //(text, gameXToCanvasX(gameX + game.gameWidth/2 - cameraX), gameYToCanvasY(-gameY + game.gameHeight/2 + cameraY))        ;

        //horizontal lines
        for(var x = -game.currentSector.height/40; x <= game.currentSector.height/40; x++){
            ctx.beginPath();
            ctx.moveTo(gameXToCanvasX(-game.currentSector.width/2 + game.gameWidth/2 - this.cameraX + 400*game.currentSector.x), gameYToCanvasY(x*20 + game.gameHeight/2 + this.cameraY - 400*game.currentSector.y));
            ctx.lineTo(gameXToCanvasX(game.currentSector.width/2 + game.gameWidth/2 - this.cameraX + 400*game.currentSector.x), gameYToCanvasY(x*20 + game.gameHeight/2 + this.cameraY - 400*game.currentSector.y));
            ctx.stroke();
        }
        //vertical lines
        for(var x = -game.currentSector.width/40; x <= game.currentSector.width/40; x++){   
            ctx.beginPath();
            ctx.moveTo(gameXToCanvasX(x*20 + game.gameWidth/2 - this.cameraX + 400*game.currentSector.x), gameYToCanvasY(-game.currentSector.height/2 + game.gameHeight/2 + this.cameraY - 400*game.currentSector.y));
            ctx.lineTo(gameXToCanvasX(x*20 + game.gameWidth/2 - this.cameraX + 400*game.currentSector.x), gameYToCanvasY(game.currentSector.height/2 + game.gameHeight/2 + this.cameraY - 400*game.currentSector.y));
            ctx.stroke();
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
        ctx.translate(gameXToCanvasX(game.players[0].x + game.gameWidth/2 - this.cameraX ), gameYToCanvasY(-game.players[0].y + game.gameHeight/2 + this.cameraY));
        ctx.rotate(toRad(-orientation+90));
        ctx.beginPath();
        if(ship.state=="ship"){
            ctx.beginPath();
                ctx.moveTo(gameXToCanvasX(0),gameYToCanvasY(-2));
                ctx.lineTo(gameXToCanvasX(-.5), gameYToCanvasY(2));
                ctx.lineTo(gameXToCanvasX(.5),gameYToCanvasY(2));
                ctx.fill();
            ctx.closePath();

            ctx.beginPath();
                ctx.moveTo(gameXToCanvasX(0),gameYToCanvasY(-1));
                ctx.lineTo(gameXToCanvasX(-1), gameYToCanvasY(1));
                ctx.lineTo(gameXToCanvasX(1),gameYToCanvasY(1));
                ctx.fill();
            ctx.closePath();
        }
        if(ship.state=="bot"){
            ctx.rect(gameXToCanvasX(-ship.width/2 - ship.width), gameYToCanvasY(-ship.height/2), gameXToCanvasX(gameWidth/2), gameYToCanvasY(gameHeight));
            ctx.rect(gameXToCanvasX(ship.width), gameYToCanvasY(-ship.height/2), gameXToCanvasX(gameWidth/2), gameYToCanvasY(gameHeight));
            ctx.rect(gameXToCanvasX(-ship.height/2), gameYToCanvasY(ship.height/8), gameXToCanvasX(ship.height), gameYToCanvasY(ship.width/2));
            ctx.fill();
        }
        ctx.closePath();
        ctx.restore();


        ctx.stroke();


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
    
    this.drawCircle = function(gameX, gameY, radius, color)
    {    
        var ctx= game.ctx;// gameCanvas.getContext("2d");  
        ctx.beginPath();
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.arc(gameXToCanvasX(gameX), gameYToCanvasY(gameY), gameXToCanvasX(radius), 0, 2 * Math.PI, false);
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
}

function toRad(deg) {
  return deg * Math.PI / 180
}

function toDeg(rad) {
    return rad / Math.PI * 180;
}