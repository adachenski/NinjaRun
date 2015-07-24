/**
 * Created by Nick on 22/7/2015.
 */

var RenderEngine = (function () {
    var RenderEngine = {};

    RenderEngine.init = function()
    {
        return this;
    };

    RenderEngine.addSprite = function(path, x, y, w, h)
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

    RenderEngine.addLayer = function(key, stage, spritesObjArr, layers){
        console.log(stage);
        var layer = new Kinetic.Layer();

        for(var itemInd in spritesObjArr) {
            layer.add(spritesObjArr[itemInd]);
        }

        stage.add(layer);
        layers[key] = layer;
        return layers;
    };

    RenderEngine.addAnimation = function(frames, startX, startY, w, h)
    {

    };

    RenderEngine.animate = function(x, y, layerToUpdate)
    {
        var t = layerToUpdate.find('Image');
        t.setX(x);
        t.setY(y);
    };

    RenderEngine.render = function(screen)
    {
        screen.stage.draw();

    };

    return RenderEngine;
})();
