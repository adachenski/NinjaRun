/**
 * Created by Nick on 27/7/2015.
 */

var Character = (function (parent) {

    var Character = {};

    Character.init = function(x, y, w, h)
    {
        parent.init.call(this, x, y, w, h);
        this.hasJumped = false;
        this.grounded = false;
        this.isRunning = false;
        this.startJumping = false;
        
        this.runVel = GameConsts.runVel;
        this.maxRunVel = GameConsts.maxRunVel;
        this.jumpVel = GameConsts.jumpVel;

        return this;
    };

    Character.gravity = function()
    {
        this.y += GameConsts.gravity;
    };

    Character.jump = function()
    {
        this.y += this.jumpVel;

        if(this.hasJumped == true && this.grounded == false)
        {
            this.jumpVel -= GameConsts.jumpStep;

            if(this.jumpVel <= -GameConsts.maxJumpVel) {
                this.hasJumped = false;
            }
        }

        if(this.hasJumped == false && this.grounded == false) {
            this.jumpVel = 0;
        }

    };
    
    Character.accelerate = function()
    {
        if(this.isRunning) {
            if(this.runVel <= this.maxRunVel) {
                this.runVel += GameConsts.accelerationStep;
            }
        } else this.runVel = GameConsts.runVel;
    }

    return Character;
})(GameObject);
