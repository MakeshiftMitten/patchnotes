window.requestAnimFrame = (function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
                window.setTimeout(callback, 1000 / 200);
            };
        })();
    

function animLoop() {
    game.nowTime = Date.now();
    //var dt = (now - last)/16.66666666666666 * (.8);
    
    var dt = (game.nowTime-game.lastTime)/1000;
    game.update(dt);
    game.draw();
    requestAnimFrame(animLoop);
    game.lastTime = game.nowTime;
    
}


game = new gameObject();
game.init();
draw = new drawCameraCentricObject();
//draw = new drawPlayerCentricObject();
resizeGame();
animLoop();