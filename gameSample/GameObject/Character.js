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
        this.runVel = GameContants.runVel;
        this.maxRunVel = GameContants.maxRunVel;
        this.jumpVel = GameContants.jumpVel;

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
            //this.y -= 3;
            //console.log('DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
            //this.hasJumped = false;
            //debugger;
            this.jumpVel -= 5;

            if(this.jumpVel <= -50) {
                this.hasJumped = false;
            }

            //setTimeout(function() {
            //    jumpSpeed = 0;
            //    console.log('BACK')
            //    this.hasJumped = false;
            //}, 500);
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
