/**
 * Created by Nick on 21/7/2015.
 */

var GameObject = (function()
{
    var GameObject = {};

    GameObject.init = function(x, y, w, h)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        return this;
    };

    GameObject.render = function(ctx)
    {

    };

    return GameObject;
})();