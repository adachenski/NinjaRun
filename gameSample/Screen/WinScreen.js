/**
 * Created by Nick on 29/7/2015.
 */



var WinScreen = (function (parent) {
    var WinScreen = {},
        renderE = Object.create(RenderEngine).init(),
        clickCounter = 0;


    WinScreen.init = function () {
        parent.init.call(this);

        return this;
    };

    WinScreen.update = function () {

        var newGameButt = parent.findInLayers.call(this, "newGameButton", "Image");

        newGameButt.on('mouseup', function () {
            if (clickCounter++ == 1) ScreenManager.changeToScreen(GameScreen);
        });



        renderE.render(this);
    };


    WinScreen.loadGraphics = function () {
        var newGameButton = renderE.addSprite("SpriteSheets/newGameButton.png", 200, 200, 200, 150);
        renderE.addLayer("newGameButton", this.stage, [newGameButton], this.layers);
    };

    return WinScreen;
})(Screen);