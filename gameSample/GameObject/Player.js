/**
 * Created by Nick on 21/7/2015.
 */

var Player = (function (parent) {
    var Player = {};

    var CONSTS = {
        SCREEN_WIDTH : 640,
        SCREEN_HEIGHT: 480
    };

    Player.init = function(x, y, w, h)
    {
        parent.init.call(Player, x, y, w, h);
        Player.Key = {
            _pressed: {},
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            
            isDown: function(keyCode) {
                return this._pressed[keyCode];
            },
            
            onKeyDown: function(e) {
                this._pressed[e.keyCode] = true;
            },
            
            onKeyUp: function(e) {
                delete this._pressed[e.keyCode];
            }
        };

        return this;
    };

    Player.update = function () {
        var velocityX = 5,
            velocityY = 10,
            currentX = Player.x,
            currentY = Player.y
            maxJump = 30;
            
        window.addEventListener('keyup', function(e) {
            Player.Key.onKeyUp(e);
        }, false);
            
        window.addEventListener('keydown', function(e) {
            Player.Key.onKeyDown(e);
        }, false);
        
        
        function animateLeft()
        {
            if(Player.x > 0)
            {
                Player.x -= velocityX;
            }
        }
        function animateUp()
        {
            if(Player.y > 0)
            {
                Player.y -= velocityY;
            }
        }
        function animateRight()
        {
            if(Player.x < CONSTS.SCREEN_WIDTH - Player.w)
            {
                Player.x += velocityX;
            }
        }
        function animateDown()
        {
            if(Player.y < CONSTS.SCREEN_HEIGHT - Player.h)
            {
                Player.y += velocityY;
            }
        }
        
        console.log(Player.Key.isDown());
        
        if(Player.Key.isDown(Player.Key.UP)) {
            animateUp()
        }
        if(Player.Key.isDown(Player.Key.LEFT)) {
            animateLeft()
        }
        if(Player.Key.isDown(Player.Key.RIGHT)) {
            animateRight()
        }
        if(Player.Key.isDown(Player.Key.DOWN)) {
            animateDown()
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