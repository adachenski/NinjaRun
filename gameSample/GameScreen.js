/**
 * Created by Nick on 21/7/2015.
 */


var GameScreen = (function(parent)
{
    var GameScreen = {},
        player,
        inputHandler,
        renderE = Object.create(RenderEngine).init("sprites/Tweety.png", 100, 100);

    GameScreen.loadGraphics = function()
    {
        //console.log('loading graphics of the GameScreen');
    };

    GameScreen.init = function()
    {
        parent.init.call(this);

        player = Object.create(Player).init(100, 100, 50, 50);
        inputHandler = Object.create(InputHandler).init();

        return this;
    };

    GameScreen.update = function()
    {
        var moves = inputHandler.handleKeyboardInput();
        player.update(moves);
        renderE.animate();
        renderE.render();

        parent.update.call(this);
    };

    GameScreen.render = function(ctx)
    {
        player.render(ctx);

        parent.render(ctx);
    };


    return GameScreen;
})(Screen);