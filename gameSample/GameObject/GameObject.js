/**
 * Created by Nick on 21/7/2015.
 */

var GameObject = (function()
{
    var GameObject = {};

    GameObject.init = function(x, y, w, h)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        return this;
    };
	
	GameObject.collideWith = function(anotherGameObj)
    {
        var gameObjLeft= this.x,
            gameObjRight = gameObjLeft+ this.w,
            gameObjTop = this.y,
            gameObjBottom = gameObjTop + this.h;

        var anotherGameObjLeft = anotherGameObj.x,
            anotherGameObjRight = anotherGameObjLeft + anotherGameObj.w,
            anotherGameObjTop = anotherGameObj.y,
            anotherGameObjBottom = anotherGameObjTop + anotherGameObj.h;

        var anotherObjRightWithinGameObj = (gameObjLeft < anotherGameObjRight && anotherGameObjRight < gameObjRight),
            anotherObjLeftWithinGameObj = (gameObjLeft < anotherGameObjLeft && anotherGameObjLeft < gameObjRight),
            anotherObjTopWithinGameObj = (anotherGameObjBottom < gameObjTop && gameObjTop < anotherGameObjTop),
            anotherObjBottomWithinGameObj = (anotherGameObjBottom < gameObjBottom && gameObjBottom < anotherGameObjTop);

        // Player left or right side is between both left and right sides of the npc
        if(anotherObjRightWithinGameObj || anotherObjLeftWithinGameObj)
        {
            // NPC top or bottom side is between both the top and down player sides
            if(anotherObjBottomWithinGameObj || anotherObjTopWithinGameObj)
            {
                return true;
            }
        }
        
        return false;
    };

    GameObject.render = function(ctx)
    {

    };

    return GameObject;
})();