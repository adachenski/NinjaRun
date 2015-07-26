/**
 * Created by Nick on 25/7/2015.
 */

var Camera = (function() {
    var Camera = {};

    var AXIS = {
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical",
        BOTH: "both",
        NONE: "none"
    };

    Camera.init = function(viewX, viewY, viewW, viewH, worldW, worldH)
    {
        this.viewX = viewX || 0;
        this.viewY = viewY || 0;
        this.viewW = viewW || 0;
        this.viewH = viewH || 0;

        this.axis = AXIS.BOTH;

        this.followedObj = null;

        this.xDeadZone = 0;
        this.yDeadZone = 0;

        this.viewPortRect = Object.create(Rectangle)
            .init(this.viewX, this.viewY, this.viewW, this.viewH);

        this.worldRect = Object.create(Rectangle)
            .init(0, 0, worldW, worldH);

        return this;
    };

    Camera.follow = function (gameObj, xDeadZone, yDeadZone) {
        this.followedObj = gameObj;
    };

    Camera.update = function()
    {
        if(this.followedObj == null) {
            throw new Error("followedObj is null")
        }
        else {
            if (this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH) {
                console.log('INSIDE')
                if (this.followedObj.x - this.viewX + this.xDeadZone > this.viewW/2) {
                    console.log('FIRST')
                    this.viewX = this.followedObj.x - (this.viewW / 2 - this.xDeadZone);
                }
                else if (this.followedObj.x - this.xDeadZone < this.viewX) {
                    this.viewX = this.followedObj.x - this.xDeadZone;
                }
            }
            if (this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH) {
                if (this.followedObj.y - this.viewY + this.yDeadZone > this.viewH)
                    this.viewY = this.followedObj.y - (this.viewH - this.yDeadZone);
                else if (this.followedObj.y - this.yDeadZone < this.viewY)
                    this.viewY = this.followedObj.y - this.yDeadZone;
            }
        }

        this.viewPortRect.set(this.viewX, this.viewY);

    };




    return Camera;
})();