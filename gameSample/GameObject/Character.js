/**
 * Created by Nick on 27/7/2015.
 */

var Character = (function (parent) {

    var Character = {};

    Character.init = function(x, y, w, h, name)
    {
        parent.init.call(this, x, y, w, h, name);
        this.hasJumped = false;
        this.grounded = true;
        this.isRunning = false;
        this.startJumping = false;
        
        this.accelerationSpeed = GameConsts.accelerationSpeed;
        this.slowSpeed = GameConsts.slowSpeed;
        this.runVel = GameConsts.runVel;
        this.slowedRunVel = GameConsts.slowedRunVel;
        this.speedRunVel = GameConsts.speedRunVel;
        this.maxRunVel = GameConsts.maxRunVel;
        this.jumpVel = GameConsts.jumpVel;

        return this;
    };

    Character.gravity = function()
    {
        this.y += 10;
    };

    Character.jump = function()
    {
        this.y += this.jumpVel;

        if(this.hasJumped == true && this.grounded == false)
        {
            this.jumpVel -= 10;

            if(this.jumpVel <= -70) {
                this.hasJumped = false;
            }
        }

        if(this.hasJumped == false && this.grounded == false) {
            this.jumpVel = 0;
        }
        if(this.jumpVel > 20) {
            this.jumpVel = 0;
            //this.grounded = true;
        }
      //  if(this.grounded == true) this.jumpSpeed = 0;
    };
    
    Character.accelerate = function()
    {
        if(this.isRunning) {
            if(this.runVel <= this.maxRunVel) {
                this.runVel += this.accelerationSpeed;
            }
        } 
        else 
        {
            this.runVel = GameConsts.runVel;
        }
        
        if(this.runVel > this.maxRunVel)
        {
            this.runVel -= this.slowSpeed;
        }
    }
    
    Character.slow = function()
    {
        this.runVel = this.slowedRunVel;
    }
    
    Character.speedUp = function()
    {
        this.runVel = this.speedRunVel;
    }
    
    Character.freeze = function()
    {
        this.runVel = 0;
    }
    
    Character.setBack = function()
    {
        this.runVel = -4;
    }

    Character.collideWith = function(obj2)
    {
        parent.collideWith.call(this, obj2);    
    }
    
    return Character;
})(GameObject);
