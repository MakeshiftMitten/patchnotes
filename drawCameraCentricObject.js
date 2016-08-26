function drawCameraCentricObject(cameraX, cameraY){
    this.cameraX = cameraX;
    this.cameraY = cameraY;
    //Function to draw the entire screen
    this.drawScene = function(){
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");        

            //Bounding Rect    
            ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); 
            draw.drawFilledRectCentered(game.gameWidth/2, game.gameHeight/2, game.gameWidth, game.gameHeight, game.colors.Background);

            
            this.drawGrid();

            for(var p = 0; p < game.players.length; p++){                
                game.players[p].draw();
            }

            for(var b = 0; b < game.boxes.length; b++){
                game.boxes[b].draw();
            }

            for(var b = 0; b < game.coordinates.length; b++){
                game.coordinates[b].draw();
            }

            for(var b = 0; b < game.bullets.length; b++){                
                game.bullets[b].draw();
            }

            for(var b = 0; b < game.followBots.length; b++){                
                game.followBots[b].draw();
            }


            ctx.stroke();    
            ctx.closePath();
            //Scaling rect 
            ctx.beginPath();
            ctx.fillStyle = "#000000";           
            ctx.rect(0, gameCanvas.height - gameYToCanvasY(20), gameCanvas.width, gameCanvas.height);       
            ctx.stroke();
            ctx.fill();
            ctx.closePath();

            // draw.drawFilledRectCentered(game.gameWidth/2, game.gameHeight/2, game.gameWidth, game.gameHeight - gameYToCanvasY(20), "#0000FF");                   
            
    }
    
    this.drawGrid = function()
    {
        var ctx = game.ctx;
        ctx.beginPath();
        ctx.strokeStyle = "#00FF00";
        ctx.fillStyle = "#00FF00";
        //(text, gameXToCanvasX(gameX + game.gameWidth/2 - cameraX), gameYToCanvasY(-gameY + game.gameHeight/2 + cameraY))        ;
        for(var x = -50; x < 50; x++)    
        {
            ctx.beginPath();
            ctx.moveTo(gameXToCanvasX(-500 - this.cameraX), gameYToCanvasY(x*20 + this.cameraY));
            ctx.lineTo(gameXToCanvasX(500 - this.cameraX), gameYToCanvasY(x*20 + this.cameraY));
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(gameXToCanvasX(x*20 - this.cameraX), gameYToCanvasY(-500 + this.cameraY));
            ctx.lineTo(gameXToCanvasX(x*20 - this.cameraX), gameYToCanvasY(500 + this.cameraY));
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
        console.log("orientation " + orientation + "radians" + toRad(orientation));
        ctx.rotate(toRad(-orientation+90));
        //ctx.rotate(toRad(orientation - 90));
        //ctx.strokeStyle = "#00FF00";
        //ctx.fillStyle = "#00FF00";
        //ctx.rect(gameXToCanvasX(game.players[0].x + game.gameWidth/2 - cameraX), gameYToCanvasY(-game.players[0].y + game.gameHeight/2 + cameraY), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
        //ctx.rect(gameXToCanvasX(game.gameWidth/2), gameYToCanvasY(game.gameHeight/2), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
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
        //ctx.fill();
        //ctx.fillText(game.players[0].x + "," + game.players[0].y, gameXToCanvasX(0), gameYToCanvasY(0))        ;    
        ctx.restore();

//ctx.rect(gameXToCanvasX(game.players[0].x + game.gameWidth/2 - cameraX), gameYToCanvasY(-game.players[0].y + game.gameHeight/2 + cameraY), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));


        ctx.stroke();


    }

    this.drawRectCentered = function(gameX, gameY, gameWidth, gameHeight, color)
    {
        
        var gameCanvas = document.getElementById('gameCanvas');
        var ctx= gameCanvas.getContext("2d");   
        ctx.save();
        ctx.beginPath();
        ctx.rect(gameXToCanvasX(gameX-gameWidth/2), gameYToCanvasY(gameY-gameHeight/2), gameXToCanvasX(gameWidth), gameYToCanvasY(gameHeight));
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    
    this.drawFilledRectCentered = function(gameX, gameY, gameWidth, gameHeight, color)
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

    this.drawText = function(gameX, gameY, text)
    {
        var ctx = game.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#00FF00";
        ctx.fillText(text, gameXToCanvasX(gameX + game.gameWidth/2 - this.cameraX), gameYToCanvasY(-gameY + game.gameHeight/2 + this.cameraY))        ;    
        ctx.stroke();
        ctx.restore();
    }
}

function toRad(deg) {
  return deg * Math.PI / 180
}