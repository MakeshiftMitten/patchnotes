window.requestAnimFrame = (function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        })();
    

function animLoop() {
    game.nowTime = Date.now();
    //var dt = (now - last)/16.66666666666666 * (.8);
    
    var dt = (game.nowTime-game.lastTime)/1000;
    update(dt);
    draw.drawScene();
    requestAnimFrame(animLoop);
    game.lastTime = game.nowTime;
    
}

function update(dt){    
    //Example of key handling
    if(game.keys[82]){
        console.log("new!");
        game = new gameObject();
        game.init();
    }

    //Example of update loop
    for(var p = 0; p < game.players.length; p++){
        game.players[p].update(dt);
    } 

    for(var b = 0; b < game.boxes.length; b++){
        game.boxes[b].update(dt);
    }

    for(var c = 0; c < game.coordinates.length; c++){
        game.coordinates[c].update(dt);
    }

    for(var b = 0; b < game.bullets.length; b++){        
        game.bullets[b].update(dt);
    }

    for(var b = 0; b < game.followBots.length; b++){        
            game.followBots[b].update(dt);
        }

}

game = new gameObject();
game.init();
draw = new drawCameraCentricObject();
//draw = new drawPlayerCentricObject();
resizeGame();
animLoop();