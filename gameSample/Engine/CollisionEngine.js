/**
 * Created by Nick on 27/7/2015.
 */

var Collision = (function() {
    var CollisionE = {};

    CollisionE.init = function()
    {
        return this;
    };

    CollisionE.collision = function(obj1, obj2)
    {
        //console.log(obj1.x, obj1.y, obj2.x, obj2.y)
        //console.log(obj1.w, obj1.h, obj2.w, obj2.h)
        if(this.ifColliding(obj1, obj2))
        {
            obj1.y = obj2.y - obj1.h;
            //obj1.grounded = true;
        }
    };

    CollisionE.ifColliding = function(obj1, obj2)
    {
        //console.log("===", obj1.x, obj1.y, obj2.x, obj2.w);
        if(obj1.x /*+ /!*obj1.w*!/ */>= obj2.x &&
            obj1.x <= obj2.x + obj2.w &&
            obj1.y + obj1.h >= obj2.y &&
            obj1.y + obj1.h <= obj2.y + obj2.h)
        {
            //console.log('true')
            return true;
        }
        else return false;
    };

    return CollisionE;
})();
