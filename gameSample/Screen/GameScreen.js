/**
 * Created by Nick on 21/7/2015.
 */


var GameScreen = (function(parent)
{
    var GameScreen = {},
        player,
        inputHandler = Object.create(InputHandlerEngine).init(),
        renderer = Object.create(RenderEngine).init(),
        monsterSprite,
        mapSprite,
        gameMap,
        camera,
        //canvas = document.getElementById("mycanvas"),
        //ctx = canvas.getContext("2d"),
        mapImg,
        playerMoves = inputHandler.handleKeyboardInput();

    GameScreen.loadGraphics = function() {
        //console.log('loading graphics of the GameScreen');
    };

    GameScreen.init = function()
    {
        parent.init.call(this);

        player = Object.create(Player).init(100, 100, 50, 50);
        gameMap = Object.create(Map).init(0, 0, 2000, 1000);

        camera = Object.create(Camera)
            .init(0, 0, /*viewPort W and H*/500, 300, gameMap.w, gameMap.h);

        camera.follow(player, 0, 0);

        mapImg = new Image();
        mapImg.src = "SpriteSheets/map.png";

        createSprites();

        createLayers();



        startSpriteAnims();

        return this;
    };

    GameScreen.update = function()
    {
        var layerToUpdate = this.layers["monsterLayer"],
            maximalX = this.stage.getWidth(),
            minimalX = 0,
            maximalY = this.stage.getHeight(),
            minimalY = 0;

        player.update(playerMoves, maximalX, minimalX, maximalY, minimalY);

        //console.log(camera.followedObj);
        //debugger;
        camera.update();
        //draw(camera.viewX, camera.viewY);
        mapSprite.crop({x: camera.viewX, y: camera.viewY, width: 640, height: 480});
        renderer.render(this);
        renderer.animate(player.x, player.y, layerToUpdate);
        
        parent.update.call(this);
        playerMoves = inputHandler.handleKeyboardInput();
    };

    function draw (viewX, viewY) {

        var sx, sy, dx, dy;
        var sWidth, sHeight, dWidth, dHeight;

        sx = viewX;
        sy = viewY;

        // dimensions of cropped image
        sWidth = 640;
        sHeight = 480;

        // if cropped image is smaller than canvas we need to change the source dimensions
        if (mapImg.width - sx < sWidth) {
            sWidth = mapImg.width - sx;
        }
        if (mapImg.height - sy < sHeight) {
            sHeight = mapImg.height - sy;
        }

        // location on canvas to draw the croped image
        dx = 0;
        dy = 0;
        // match destination with source to not scale the image
        dWidth = sWidth;
        dHeight = sHeight;
        console.log(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

        //ctx.drawImage(mapImg, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
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
        //monsterSprite.start();
    }

    function createSprites() {
        mapSprite = renderer.addSprite("SpriteSheets/map.png", 0, 0, 2000, 1000);
        monsterSprite = renderer.createBlobSprite("SpriteSheets/monster.png", player.x, player.y);
    }

    function createLayers() {
        renderer.addLayer("mapLayer", GameScreen.stage, [mapSprite], GameScreen.layers);
        renderer.addLayer("monsterLayer", GameScreen.stage, [monsterSprite], GameScreen.layers);
    }


    return GameScreen;
})(Screen);