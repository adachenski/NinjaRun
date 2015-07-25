/**
 * Created by Nick on 21/7/2015.
 */

var Map = (function (parent) {
    var Map = {};

    Map.init = function(x, y, w, h)
    {
        parent.init.call(this, x, y, w, h);

        return this;
    };

    Map.update = function (moves, maximalX, minimalX, maximalY, minimalY) {
        var velocityX = 5,
            velocityY = 30,
            currentX = Map.x,
            currentY = Map.y


        function animateLeft() {
            Map.x -= velocityX;
        }
        function animateUp()   {
            Map.y -= velocityY;
            if(Map.y = Map.y - maxJump) {
                setTimeout(animateDown, 300);
                return;
            }
            requestAnimationFrame(animateUp);
        }
        function animateRight() {
            Map.x += velocityX;
            while(Map.x < currentX + velocityX) {
                requestAnimationFrame(animateRight);
            }
        }
        function animateDown() {
            Map.y += velocityY;
        }

        if((Map.x <= minimalX || (Map.x >= maximalX)) || ((Map.y <= minimalY) || Map.y >= maximalY)) {

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

    return Map;
})(GameObject);