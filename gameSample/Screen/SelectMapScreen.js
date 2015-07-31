/*
 * Created by Nick on 30/7/2015.
 */


var SelectMapScreen = (function (parent) {
    var SelectMapScreen = {},
        renderE,
        clickCounter = 0,
        map1Sprite,
        map2Sprite,
		backgroundNature;

    SelectMapScreen.init = function () {
        parent.init.call(this);
        renderE = Object.create(RenderEngine).init();

        this.loadGraphics();

        return this;
    };

    SelectMapScreen.update = function () {
        console.log('---')
        map1Sprite.on('mouseup', function () {
            GameConsts.chosenMap = "map1";
            ScreenManager.changeToScreen(GameScreen);
        });
        map2Sprite.on('mouseup', function () {
            GameConsts.chosenMap = "map2";
            console.log('MAP 2222222');
            ScreenManager.changeToScreen(GameScreen);
        });

        renderE.render(this);
    };


    SelectMapScreen.loadGraphics = function () {
        map1Sprite = renderE.addSprite("SpriteSheets/map1.png", 100, 200, 200, 200);
        map2Sprite = renderE.addSprite("SpriteSheets/map2.png", 350, 200, 200, 200);

        backgroundNature = renderE.addSprite("SpriteSheets/background1.jpg", 0, 0, 700, 480);

        renderE.addLayer("selectMapLayer", this.stage, [backgroundNature,map1Sprite, map2Sprite], this.layers);
    };

    return SelectMapScreen;
})(Screen);
