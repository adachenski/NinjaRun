/**
 * Created by Nick on 21/7/2015.
 */


var GameScreen = (function(parent)
{
    var GameScreen = {},
        player,
        IHEngine;

    GameScreen.loadGraphics = function()
    {
        //console.log('loading graphics of the GameScreen');
    };

    GameScreen.init = function(w, h)
    {
        parent.init.call(this, w, h);

        player = Object.create(Player).init(100, 100, 50, 50);
        IHEngine = Object.create(InputHandlerEngine).init();

        return this;
    };

    GameScreen.update = function()
    {
        var moves = IHEngine.handleKeyboardInput();
        
        player.update(moves);

        parent.update.call(this);
    };

    GameScreen.render = function(ctx)
    {
        player.render(ctx);

        parent.render(ctx);
    };


    return GameScreen;
})(Screen);