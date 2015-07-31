/**
 * Created by Nick on 29/7/2015.
 */
var WinScreen = (function (parent) {
    var WinScreen = {},
        renderE,
        clickCounter = 0,
        newGameButtonSprite;

    WinScreen.init = function () {
        parent.init.call(this);

        renderE = Object.create(RenderEngine).init();

        this.loadGraphics();

        return this;
    };

    WinScreen.update = function () {
        var newGameButt = parent.findInLayers.call(this, "newGameButton", "Image");
        newGameButt.on('mouseup', function () {
            if (clickCounter++ == 1) ScreenManager.changeToScreen(GameScreen);
        });
        clickCounter = 0;


        renderE.render(this);
    };


    WinScreen.loadGraphics = function () {
        newGameButtonSprite = renderE.addSprite("SpriteSheets/newGameButton.png", 200, 200, 200, 150);

        renderE.addLayer("newGameButton", this.stage, [newGameButtonSprite], this.layers);
    };

    return WinScreen;
})(Screen);