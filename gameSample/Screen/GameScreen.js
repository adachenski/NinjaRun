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
        mapImg,
        playerMoves = inputHandler.handleKeyboardInput(),
        trySprite,
        tryObj = {x: 700, y: 400, w:50, h: 50},
        collisionE,
        npc1;

    GameScreen.loadGraphics = function() {
        //console.log('loading graphics of the GameScreen');
    };

    GameScreen.init = function()
    {
        parent.init.call(this);

        player = Object.create(Player).init(300, 100, 90, 100);
        gameMap = Object.create(Map).init(0, 0, 2000, 1000);
        camera = Object.create(Camera).init(0, 0, /*viewPort W and H*/600, 480, gameMap.mapRect.width, gameMap.mapRect.height);
        collisionE = Object.create(Collision).init();

        npc1 = Object.create(NPC).init(100, 100, 100, 100);
        console.log(npc1);

        camera.follow(player, GameScreen.stage.getWidth()/2, GameScreen.stage.getHeight()/2);

        createSprites();
        createLayers();
        startSpriteAnims();
        loadMap("SpriteSheets/grass.png");

        return this;
    };

    GameScreen.update = function()
    {
        var layerToUpdate = this.layers["monsterLayer"];

        handlePlayerGroundColl();

        player.update(playerMoves);
        camera.update();
        updateMap();

        //console.log('=======', player.x, player.y)
        //mapSprite.crop({x: camera.viewX, y: camera.viewY, width: camera.viewW, height: camera.viewH});
        mapSprite.setX(-camera.viewX);
        mapSprite.setY(-camera.viewY);


        renderer.render(this);
        //renderer.animate(player.x, player.y, layerToUpdate);

        parent.update.call(this);
        playerMoves = inputHandler.handleKeyboardInput();
    };

    function updateMap()
    {
        GameScreen.layers["earthLayer"].removeChildren();

        for(var i = 0; i < gameMap.mapTilesObjs.length; i++)
        {
            //console.log(gameMap.mapTiles[i].getX(), camera.viewX);
            if(gameMap.mapTilesObjs[i].x >= camera.viewX  &&
                gameMap.mapTilesObjs[i].x < camera.viewX + camera.viewW &&
                gameMap.mapTilesObjs[i].y > camera.viewY &&
                gameMap.mapTilesObjs[i].y < camera.viewY + camera.viewW)
            {
                gameMap.mapTilesSprites[i].setX(gameMap.mapTilesObjs[i].x - camera.viewX);
                gameMap.mapTilesSprites[i].setY(gameMap.mapTilesObjs[i].y - camera.viewY);
                GameScreen.layers["earthLayer"].add(gameMap.mapTilesSprites[i]);
            }
            else
            {
                gameMap.mapTilesSprites[i].setY(gameMap.mapTilesObjs[i].y);
                gameMap.mapTilesSprites[i].setX(gameMap.mapTilesObjs[i].x);
            }
        }
    }

    function loadMap(earthTilePath)
    {
        var mapTileArray = [];
        for (var i = 0; i < Map.array.length; i++) {
            for (var j = 0; j < Map.array[i].length; j++) {
                if (Map.array[i][j] == 1) {

                    var eartTileSprite = renderer.addSprite(earthTilePath, j * gameMap.tileW, 500, gameMap.tileW*2, gameMap.tileH);
                    gameMap.mapTilesObjs.push({x: j * gameMap.tileW, y: i * gameMap.tileH, w: gameMap.tileW, h: gameMap.tileH });
                    gameMap.mapTilesSprites.push(eartTileSprite);
                }
            }
        }
        renderer.addLayer("earthLayer", GameScreen.stage, gameMap.mapTilesSprites, GameScreen.layers);
    }

    function handlePlayerGroundColl() {
        for (var i = 0, len = gameMap.mapTilesObjs.length; i < len; i++) {
            collisionE.collision(player, gameMap.mapTilesObjs[i]);
        }

        //test code
        if (tryObj.x > camera.viewX && tryObj.x < camera.viewX + camera.viewW) {
            trySprite.setX(700 - camera.viewX);
        }
        else trySprite.setX(tryObj.x);
    }

    function startSpriteAnims()
    {
        monsterSprite.start();
    }

    function createSprites() {
        mapSprite = renderer.addSprite("SpriteSheets/map.png", 0, 0, 2000, 1000);
        monsterSprite = renderer.createBlobSprite("SpriteSheets/monster.png", GameScreen.stage.getWidth()/2, GameScreen.stage.getHeight()/2);
        trySprite = renderer.addSprite("SpriteSheets/tweety.png", 700, 300, 150, 150, 700);
    }

    function createLayers() {
        renderer.addLayer("mapLayer", GameScreen.stage, [mapSprite], GameScreen.layers);
        renderer.addLayer("monsterLayer", GameScreen.stage, [monsterSprite], GameScreen.layers);
        renderer.addLayer("tryLayer", GameScreen.stage, [trySprite], GameScreen.layers);
    }


    function draw(viewX, viewY) {

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

    return GameScreen;
})(Screen);