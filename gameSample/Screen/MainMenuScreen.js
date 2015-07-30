/**
 * Created by Nick on 22/7/2015.
 */

var MainMenuScreen = (function (parent) {
    var MainMenuScreen = {},
        renderE = Object.create(RenderEngine).init(),
        clickCounter = 0;



    MainMenuScreen.init = function()
    {
        parent.init.call(this);

        return this;
    };

    MainMenuScreen.update = function()
    {

        var startBut = this.layers["startButtonLayer"].find('Image')[0];

        startBut.on('mouseup', function() {
            if(clickCounter++ == 1) ScreenManager.changeToScreen(GameScreen);
        });



        renderE.render(this);
    };



    MainMenuScreen.loadGraphics = function()
    {
        var startButtSprite = renderE.addSprite("SpriteSheets/startButton.png", 300, 300, 200, 150);
        renderE.addLayer("startButtonLayer", this.stage, [startButtSprite], this.layers);
    };

    return MainMenuScreen;
})(Screen);