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

    Player.update = function(moves)
    {
        moves.forEach(function(currentVal, ind, moves) {
            if(currentVal == 'left')
            {
                console.log('left');
                Player.x -= 1;
            }
            if(currentVal == 'right')
            {
                Player.x += 1;
            }
            if (currentVal == 'down') {
                Player.y += 1;
            }

        });
    };

    Player.render = function(ctx)
    {

        ctx.fillRect(Player.x, Player.y, Player.w, Player.h)
        ctx.stroke();

        parent.render.call(this,ctx);
    };


    return Player;
})(GameObject);