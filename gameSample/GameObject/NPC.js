/**
 * Created by Nick on 22/7/2015.
 */

var NPC = (function(parent)
{
    var NPC = {};

    NPC.init = function(x, y, w, h)
    {
        parent.init.call(this, x, y, w, h);

        return this;
    };

    NPC.update = function()
    {

    };

    NPC.render = function(ctx)
    {

    };

    return NPC;
})(Character);