/**
 * Created by Nick on 22/7/2015.
 */

var RenderEngine = (function () {
    var RenderEngine = {};

    RenderEngine.init = function(path, x, y)
    {
        this.stage = new PIXI.Stage(0x66FF99);
        this.renderer = PIXI.autoDetectRenderer(500, 500);
        document.body.appendChild(this.renderer.view);

        this.texture= PIXI.Texture.fromImage(path);
        this.spriteSheet = new PIXI.Sprite(this.texture);
        this.spriteSheet.x = x;
        this.spriteSheet.y = y;
        this.stage.addChild(this.spriteSheet);
        return this;
    };

    RenderEngine.addAnimation = function(frames, startX, startY, w, h)
    {

    };

    RenderEngine.animate = function()
    {
        this.spriteSheet.x += 1;
    };


    RenderEngine.render = function(ctx)
    {
        this.renderer.render(this.stage);
    };

    return RenderEngine;
})();
