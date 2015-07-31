/*
 * Created by Nick on 30/7/2015.
 */


var SelectMapScreen = (function (parent) {
    var SelectMapScreen = {},
        renderE,
        clickCounter = 0,
        map1Sprite,
        map2Sprite;

    SelectMapScreen.init = function () {
        parent.init.call(this);
        renderE = Object.create(RenderEngine).init();

        this.loadGraphics();

        return this;
    };

    SelectMapScreen.update = function () {
        map1Sprite.on('mouseup', function () {
            GameConsts.chosenMap = "map1";
            ScreenManager.changeToScreen(GameScreen);
        });
        map2Sprite.on('mouseup', function () {
            GameConsts.chosenMap = "map2";
            ScreenManager.changeToScreen(GameScreen);
        });

        renderE.render(this);
    };


    SelectMapScreen.loadGraphics = function () {
        map1Sprite = renderE.addSprite("SpriteSheets/choosableMap1.png", 100, 200, 150, 150);
        map2Sprite = renderE.addSprite("SpriteSheets/choosableMap2.png", 300, 200, 150, 150);


        renderE.addLayer("selectMapLayer", this.stage, [map1Sprite, map2Sprite], this.layers);
    };

    return SelectMapScreen;
})(Screen);
