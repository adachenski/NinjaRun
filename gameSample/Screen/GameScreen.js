/**
 * Created by Nick on 21/7/2015.
 */


var GameScreen = (function(parent)
{
    var GameScreen = {},
        player,
        inputHandler,
        renderer,
        tweetySprite,
        tweetySprite2,
        monsterSprite;


    GameScreen.loadGraphics = function()
    {
        //console.log('loading graphics of the GameScreen');
    };

    GameScreen.init = function()
    {
        parent.init.call(this);

        inputHandler = Object.create(InputHandlerEngine).init();
        renderer = Object.create(RenderEngine).init();
        player = Object.create(Player).init(100, 100, 50, 50);


        createSprites();
        createLayers();

        startSpriteAnims();

        return this;
    };

    GameScreen.update = function()
    {
        var moves = inputHandler.handleKeyboardInput();
        player.update();

        renderer.render(this);

        //var layerToUpdate = this.layers["playerLayer"];
        //renderer.animate(player.x, player.y, layerToUpdate);

        parent.update.call(this);
    };

    //GameScreen.render = function(ctx)
    //{
    //    player.render(ctx);
    //
    //    for(var key in layers) {
    //        if(layers.hasOwnProperty(key)) {
    //
    //            layers[key].draw();
    //        }
    //    }
    //    parent.render(ctx);
    //};

    function startSpriteAnims()
    {
        monsterSprite.start();
    }

    function createSprites() {
        tweetySprite2 = renderer.addSprite("SpriteSheets/Tweety.png", 200, 100, 100, 100);
        tweetySprite = renderer.addSprite("SpriteSheets/Tweety.png", player.x, player.y, 100, 100);

        monsterSprite = renderer.createBlobSprite("SpriteSheets/monster.png", player.x, player.y);
    }

    function createLayers() {
        renderer.addLayer("playerLayer", GameScreen.stage, [tweetySprite], GameScreen.layers);
        renderer.addLayer("npcLayer", GameScreen.stage, [tweetySprite2], GameScreen.layers);

        renderer.addLayer("monsterLayer", GameScreen.stage, [monsterSprite], GameScreen.layers);
    }


    return GameScreen;
})(Screen);