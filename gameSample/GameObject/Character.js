/**
 * Created by Nick on 27/7/2015.
 */

var Character = (function (parent) {

    var Character = {},
        jumpSpeed = 0;

    Character.init = function(x, y, w, h)
    {
        parent.init.call(this, x, y, w, h);
        this.hasJumped = false;
        this.grounded = true;


        return this;
    };

    Character.gravity = function()
    {
        this.y += 2;
    };

    Character.jump = function()
    {
        //console.log('==',this.hasJumped)
        //console.log('_____________________________________________')
        this.y += jumpSpeed;
        console.log(Player.y, jumpSpeed);
        if(this.hasJumped === true && this.grounded === false)
        {
            //console.log('daaa')
            //this.hasJumped = false;

            jumpSpeed = -10;

            if(jumpSpeed <= -15) {
                this.hasJumped = false;
            }
            //
            //setTimeout(function() {
            //    jumpSpeed = 0;
            //    console.log('BACK')
            //    this.hasJumped = false;
            //}, 500);
        }

        if(this.hasJumped === false && this.grounded === false) {
            jumpSpeed += 2;
        }

    };

    return Character;
})(GameObject);
