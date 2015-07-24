/**
 * Created by Nick on 21/7/2015.
 */

var Player = (function (parent) {
    var Player = {};

    Player.init = function(x, y, w, h)
    {
        parent.init.call(Player, x, y, w, h);

        return this;
    };

    Player.update = function (moves, maximalX, minimalX, maximalY, minimalY) {
        var velocityX = 5,
            velocityY = 30,
            currentX = Player.x,
            currentY = Player.y
            maxJump = 30;
            
        function animateLeft() {
            Player.x -= velocityX;
        }
        function animateUp() {
            Player.y -= velocityY;
            if(Player.y = Player.y - maxJump) {
                setTimeout(animateDown, 300);
                return;
            }    
            requestAnimationFrame(animateUp);
        }
        function animateRight() {
            Player.x += velocityX;
            while(Player.x < currentX + velocityX) {
                requestAnimationFrame(animateRight);
            }
        }
        function animateDown() {
            Player.y += velocityY;
        }
        
        if((Player.x <= minimalX || (Player.x >= maximalX)) || ((Player.y <= minimalY) || Player.y >= maximalY)) {
            
        } else {
            moves.forEach(function (move) {
                if (move === 'left') {
                    animateLeft();
                } else if (move === 'up') {
                    animateUp();
                } else if (move === 'right') {
                    animateRight();
                }
            });
        }
    };


    //Player.render = function(ctx)
    //{
    //    ctx.fillRect(Player.x, Player.y, Player.w, Player.h)
    //    ctx.stroke();
    //
    //    parent.render.call(this,ctx);
    //};

    return Player;
})(GameObject);