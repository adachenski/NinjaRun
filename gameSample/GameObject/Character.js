/**
 * Created by Nick on 27/7/2015.
 */

var Character = (function (parent) {

    var Character = {};

    Character.init = function(x, y, w, h)
    {
        parent.init.call(this, x, y, w, h);
        this.hasJumped = false;
        this.grounded = true;

        this.runVel = GameConsts.runVel;
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
        //console.log('==',this.hasJumped)
        //console.log('_____________________________________________')

        //console.log('===', this.y, this.hasJumped, this.grounded);

        this.y += this.jumpVel;

        if(this.hasJumped == true && this.grounded == false)
        {
            this.jumpVel -= 10;

            if(this.jumpVel <= -70) {
                this.hasJumped = false;
            }
        }

        if(this.hasJumped == false && this.grounded == false) {
        //    this.jumpSpeed += 2;
            this.jumpVel = 0;
        }
        if(this.jumpVel > 20) {
            this.jumpVel = 0;
            this.grounded = true;
        }
      //  if(this.grounded == true) this.jumpSpeed = 0;
    };

    return Character;
})(GameObject);
