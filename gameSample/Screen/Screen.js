/**
 * Created by Nick on 21/7/2015.
 */


var Screen = (function () {
    var Screen = {};

    Screen.init = function()
    {
        this.stage = new Kinetic.Stage({
            container: 'screen-container',
            width: 700,
            height: 480
        });

        this.layers = {};

        return this;
    };

    Screen.findInLayers = function(layerToFind, type)
    {
        return this.layers[layerToFind].find(type)[0];
    };

    Screen.loadGraphics = function () {

    };

    Screen.unloadGraphics = function () {

    };

    Screen.update = function()
    {
       //console.log('screen update was called')
    };

    Screen.render = function(ctx)
    {

    };


    return Screen;
})();
