/**
 * Created by Nick on 21/7/2015.
 */


var GameScreen = (function(parent)
{
    var GameScreen = {},
        player,
        map,
        inputHandler = Object.create(InputHandlerEngine).init(),
        renderer = Object.create(RenderEngine).init(),
       // maxX = this.stage.getWidth(),
        monsterSprite,
        playerMoves = inputHandler.handleKeyboardInput(),
        bottomElement,
        bottomPath = [];


    GameScreen.loadGraphics = function()
    {
        //console.log('loading graphics of the GameScreen');
    };

    GameScreen.init = function()
    {
        parent.init.call(this);

        player = Object.create(Player).init(100, 100, 50, 50);
        map = Object.create(Map).init(0, 0, 640, 480);
        
        createSprites();
        createLayers();

        startSpriteAnims();

        return this;
    };

    GameScreen.update = function()
    {
        var layerToUpdateMonster = this.layers["monsterLayer"],
            layerToUpdateMap = this.layers["Map"],
            maximalX = this.stage.getWidth(),
            minimalX = 0,
            maximalY = this.stage.getHeight(),
            minimalY = 0;
            
        player.update(playerMoves, maximalX, minimalX, maximalY, minimalY);
        console.log(playerMoves);
        renderer.render(this);
        renderer.animate(player.x, player.y, layerToUpdateMonster);

        //map.update(playerMoves, maximalX, minimalX, maximalY, minimalY);
        //renderer.render(this);
        //renderer.animate(player.x, player.y, layerToUpdateMap);


        parent.update.call(this);
        playerMoves = inputHandler.handleKeyboardInput();
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
        for (var i = 0; i < 20; i+=1) {
            bottomElement = renderer.addSprite("SpriteSheets/BottomElement.jpg", 0 + i * 40, 100, 40, 80);
            bottomPath.push(bottomElement);
        }

        monsterSprite = renderer.createBlobSprite("SpriteSheets/monster.png", player.x, player.y);
    }

    function createLayers() {
        renderer.addLayer("Map", GameScreen.stage, bottomPath, GameScreen.layers);
        renderer.addLayer("monsterLayer", GameScreen.stage, [monsterSprite], GameScreen.layers);
    }


    return GameScreen;
})(Screen);