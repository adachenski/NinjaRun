/**
 * Created by Nick on 21/7/2015.
 */


var GameScreen = (function(parent)
{
    var GameScreen = {},
        player,
        inputHandle,
        tweetySprite,
        tweetySprite2;

    renderE = Object.create(RenderEngine).init();

    GameScreen.loadGraphics = function()
    {
        //console.log('loading graphics of the GameScreen');
    };

    GameScreen.init = function()
    {
        parent.init.call(this);

        player = Object.create(Player).init(100, 100, 50, 50);
        inputHandler = Object.create(InputHandler).init();

        createSprites();
        createLayers();
        return this;
    };

    GameScreen.update = function()
    {
        var moves = inputHandler.handleKeyboardInput();
        player.update(moves);
        renderE.render(this);

        //console.log(this.layers);

        var layerToUpdate = this.layers["playerLayer"];
        renderE.animate(player.x, player.y, layerToUpdate);

        parent.update.call(this);
    };

    GameScreen.render = function(ctx)
    {
        player.render(ctx);

        for(var key in layers) {
            if(layers.hasOwnProperty(key)) {
                layers[key].draw();
            }
        }
        parent.render(ctx);
    };


    function createSprites() {
        tweetySprite2 = renderE.addSprite("SpriteSheets/Tweety.png", 200, 100, 100, 100);
        tweetySprite = renderE.addSprite("SpriteSheets/Tweety.png", player.x, player.y, 100, 100);
    }

    function createLayers() {
        renderE.addLayer("playerLayer", GameScreen.stage, [tweetySprite], GameScreen.layers);
        renderE.addLayer("npcLayer", GameScreen.stage, [tweetySprite2], GameScreen.layers);

    }


    return GameScreen;
})(Screen);