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
        backgroundMusic.pause();
        mapTwoMusic.pause();
        renderE = Object.create(RenderEngine).init();
        this.loadGraphics();
        return this;
    };

    WinScreen.update = function () {
        var newGameButt = parent.findInLayers.call(this, "newGameButton", "Image");
        newGameButt.on('mouseup', function () {
            if (clickCounter++ == 1) ScreenManager.changeToScreen(MainMenuScreen);
            clicksound.playclip();
        });
        clickCounter = 0;     
        renderE.render(this);
    };

    WinScreen.loadGraphics = function () {
        newGameButtonSprite = renderE.addSprite("SpriteSheets/home_button.png", 200, 200, 200, 100);
        var grassSprite = renderE.addSprite("SpriteSheets/grass.png", 0, 360, 700, 120);
        var grassSpriteUp = renderE.addSprite("SpriteSheets/grassUp.png", 0, 0, 700, 120);
        renderE.addLayer("newGameButton", this.stage, [newGameButtonSprite], this.layers);
        renderE.addLayer("grassLayer", this.stage, [grassSprite], this.layers);
        renderE.addLayer("grassLayerUp", this.stage, [grassSpriteUp], this.layers);
    };

    return WinScreen;
})(Screen);