/**
 * Created by Nick on 22/7/2015.
 */

var NPC = (function(parent)
{
    var NPC = {};

    NPC.init = function(x, y, w, h)
    {
        parent.init.call(this, x, y, w, h);
        this.isRunning = true;
        return this;
    };

    NPC.update = function()
    {
        this.x += this.runVel;
        parent.gravity.call(this);
        parent.accelerate.call(this);
    };

    NPC.render = function(ctx)
    {

    };

    return NPC;
})(Character);