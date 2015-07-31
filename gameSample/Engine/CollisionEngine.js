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

    CollisionE.ifCollidingWithTile = function(obj1, obj2)
    {
        var obj1Left = obj1.x,
            obj1Right = obj1.x + obj1.w,
            obj1Top = obj1.y,
            obj1Bot = obj1.y + obj1.h;

        var obj2Left = obj2.x,
            obj2Right = obj2.x + obj2.w,
            obj2Top = obj2.y,
            obj2Bot = obj2.y + obj2.h;


        if(obj1Bot == obj2Top)
        {
            if((obj1Left >= obj2Left && obj1Left <= obj2Right) || (obj1Right >= obj2Left && obj1Right <= obj2Right))
            {
                //obj1.grounded = true;
                return "bot";
            }
        }

        if(obj1Left >= obj2Left && obj1Left <= obj2Right)
        {
            if((obj1Bot >= obj2Top && obj1Bot <= obj2Bot) || (obj1Top >= obj2Top && obj1Top <= obj2Bot))
            {
                return "left";
            }
        }

        if(obj1Right >= obj2Left && obj1Right <= obj2Right)
        {
            if((obj1Bot >= obj2Top && obj1Bot <= obj2Bot) || (obj1Top >= obj2Top && obj1Top <= obj2Bot))
            {
                return "right";
            }
        }

        return '';
        //console.log("===", obj1.x, obj1.y, obj2.x, obj2.w);
        //if(((obj1Left >= obj2Left && obj1Left <= obj2Right) || (obj1Right >= obj2Left && obj1Right <= obj2Right))
        //  && ((obj1Bot >= obj2Top && obj1Bot <= obj2Bot) || (obj1Top >= obj2Top && obj1Top <= obj2Bot)))
        //{
        //  return true;
        //}
        //else return false;
    };

    return CollisionE;
})();
