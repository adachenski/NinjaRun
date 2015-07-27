/**
 * Created by Nick on 27/7/2015.
 */

var Character = (function (parent) {

    var Character = {},
        jumpSpeed = 10;

    Character.init = function(x, y, w, h)
    {
        parent.init.call(this, x, y, w, h);

        this.hasJumped = false;
        this.grounded = true;

        return this;
    };

    Character.gravity = function()
    {
        this.y += 1;
    };

    Character.jump = function()
    {
        console.log(this.hasJumped)
        if(this.hasJumped == false)
        {
            console.log('daaa')
            this.hasJumped = true;
            this.grounded = false;
            jumpSpeed = 10;
            this.y -= jumpSpeed;

            setTimeout(function() {
                jumpSpeed = 0;
                this.hasJumped = false;
            }, 2000);
        }

    };

    return Character;
})(GameObject);
