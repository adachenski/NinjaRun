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
        this.xDeadZone = xDeadZone;
        this.yDeadZone = yDeadZone;
    };

    Camera.update = function()
    {
        if(this.followedObj == null) {
            throw new Error("followedObj is null")
        }
        else {
            if (this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH) {
                console.log(this.followedObj.x, this.viewX, "viewW = ", this.viewW)
                if (this.followedObj.x - this.viewX + this.xDeadZone >= this.viewW) {
                    this.viewX = this.followedObj.x - (this.viewW  - this.xDeadZone);
                }
                else if (this.followedObj.x - this.xDeadZone < this.viewX   ) {
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

        if(!this.viewPortRect.ifWithin(this.worldRect))
        {
            console.log("inside")
            if(this.viewPortRect.left < this.worldRect.left) {
                this.viewX = this.worldRect.left;
            }
            if (this.viewPortRect.top < this.worldRect.top) {
                this.viewY = this.worldRect.top;
            }
            if (this.viewPortRect.right > this.worldRect.right) {
                this.viewX = this.worldRect.right - this.viewW;
            }
            if (this.viewPortRect.bottom > this.worldRect.bottom) {
                this.viewY = this.worldRect.bottom - this.viewH;
            }
        }
    };




    return Camera;
})();