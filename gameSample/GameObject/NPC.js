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
        this.collisionDirection = '';
           
        return this;
    };

    NPC.update = function(map)
    {
        if (this.collisionDirection.indexOf('bot') == -1) {
            parent.gravity.call(this);
        }
        
        if(this.collisionDirection.indexOf('right') == -1) {
            this.x += 5;
        }
        
        parent.accelerate.call(this);
        
        for(var j = 0, len = map.length; j < len; j += 1) {
            if(map[j].type == 'brick') {
                if((this.x + this.w | 0) === map[j].x) {
                    this.hasJumped = true;
                    this.grounded = false;
                    this.startJumping = true;
                }
            }
        }
        
        if (this.startJumping) {
            parent.jump.call(this);
        }
    };

    NPC.render = function(ctx)
    {

    };

    return NPC;
})(Character);