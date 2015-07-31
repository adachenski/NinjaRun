/**
 * Created by Nick on 29/7/2015.
 */

var LoseScreen = (function (parent) {
    var LoseScreen = {},
        renderE = Object.create(RenderEngine).init(),
        clickCounter = 0,
        backgroundSprite,
        mainMenuButtonSprite;


    LoseScreen.init = function () {
        parent.init.call(this);

        this.loadGraphics();

        return this;
    };

    LoseScreen.update = function () {
        mainMenuButtonSprite.on('mouseup', function () {
            if (clickCounter++ == 1) ScreenManager.changeToScreen(MainMenuScreen);
        });
        clickCounter = 0;

        renderE.render(this);
    };


    LoseScreen.loadGraphics = function () {
        mainMenuButtonSprite = renderE.addSprite("SpriteSheets/mainMenuButton.png", 200, 200, 200, 150);
        backgroundSprite = renderE.addSprite("SpriteSheets/loseScreenBackground.png", 0, 0, this.stage.width, this.stage.height);

        renderE.addLayer("loseBackgroundLayer", this.stage, [backgroundSprite], this.layers);
        renderE.addLayer("mainMenuButtonLayer", this.stage, [mainMenuButtonSprite], this.layers);
    };

    return LoseScreen;
})(Screen);