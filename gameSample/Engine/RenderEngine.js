/**
 * Created by Nick on 22/7/2015.
 */

var RenderEngine = (function () {
    var RenderEngine = {};

    RenderEngine.init = function () {
        return this;
    };

    RenderEngine.addSprite = function (path, x, y, w, h)
    {
        var imgObj = new Image(),
            sprite;
        imgObj.src = path;

        sprite = new Kinetic.Image({
            x: x,
            y: y,
            image: imgObj,
            width: w,
            height: h
        });

        return sprite;
    };

    RenderEngine.createAnimatoins = function()
    {
        var animations = {};



        return animations;
    };

    //RenderEngine.addAnimation(animName, frames, startX, startY, w, h)
    //{
    //    var anim = {};// = {'moveLeft': [{x: ,y: , w: , h: }]};
    //
    //    for (var i = 0; i < frames; i++) {
    //        anim[animName][i] = {x: ((startX + w)*i) , y: startY, width: w, height: h}
    //    }
    //
    //    return anim;
    //};


    RenderEngine.createBlobSprite = function (path, x, y)
    {
        var imgObj = new Image(),
            blob;
        imgObj.src = path;

        blob = new Kinetic.Sprite({
            x: x,
            y: y,
            image: imgObj,
            animation: 'idle',
            animations: GameAnimObjs.playerAnims,
            frameRate: 11,
            index: 0
        });
        return blob;
    };

    RenderEngine.addLayer = function(key, stage, spritesObjArr, layers)
    {
        var layer = new Kinetic.Layer();

        for(var itemInd in spritesObjArr) {
            layer.add(spritesObjArr[itemInd]);
        }

        stage.add(layer);
        layers[key] = layer;
        return layers;
    };

    RenderEngine.addAnimation = function()
    {

    };

    RenderEngine.animate = function(x, y, layerToUpdate)
    {
        var t = layerToUpdate.find('Sprite');
        if(t == 'undefined') layerToUpdate.find('Sprite');
        t.setX(x);
        t.setY(y);
    };

    RenderEngine.render = function(screen)
    {

        screen.stage.draw();
    };

    return RenderEngine;
})();
