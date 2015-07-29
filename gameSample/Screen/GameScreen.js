/**
 * Created by Nick on 21/7/2015.
 */


var GameScreen = (function(parent)
{
    var GameScreen = {},
        player = Object.create(Player).init(100, 100, 50, 40),
        ivoNPC,
        ivoSprite,
        donchoNPC,
        donchoSprite,
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
<<<<<<< HEAD
        ivoNPC = Object.create(NPC).init(210, 200, 90, 100);
        donchoNPC = Object.create(NPC).init(140, 200, 90, 100);
        gameMap = Object.create(Map).init(0, 0, 2000, 1000);
=======
        gameMap = Object.create(Map).init(0, 0, 3000, 1000);
>>>>>>> nickBranch
        camera = Object.create(Camera).init(0, 0, /*viewPort W and H*/600, 480, gameMap.mapRect.width, gameMap.mapRect.height);
        collisionE = Object.create(Collision).init();

        npc1 = Object.create(NPC).init(100, 100, 100, 100);
        //console.log(npc1);

        camera.follow(player, GameScreen.stage.getWidth()/2, GameScreen.stage.getHeight()/2);

        createSprites();
        createLayers();
        startSpriteAnims();
        loadMap("SpriteSheets/grass.png");

        return this;
    };

    GameScreen.update = function()
    {
        var //layerToUpdate = this.layers["monsterLayer"],
            maximalX = this.stage.getWidth(),
            minimalX = 0,
            maximalY = this.stage.getHeight(),
            minimalY = 0;
          
        player.update();

        //var layerToUpdate = this.layers["monsterLayer"];

        handlePlayerGroundColl();
        gameMap.updateMap(camera);
        player.update(playerMoves);
        ivoNPC.update();
        donchoNPC.update();
        camera.update();
<<<<<<< HEAD
        updateMap();
        updateNPCSprite();
=======
>>>>>>> nickBranch

        //console.log('=======', player.x, player.y)
        //mapSprite.crop({x: camera.viewX, y: camera.viewY, width: camera.viewW, height: camera.viewH});
        mapSprite.setX(-camera.viewX);
        mapSprite.setY(-camera.viewY);

        renderer.render(this);
        //renderer.animate(player.x, player.y, layerToUpdate);

        parent.update.call(this);
    };
    
    function updateNPCSprite()
    {
            // console.log(camera.viewX, camera.viewY);
            // console.log(ivoNPC.x > camera.viewX);
            // console.log(ivoNPC.x < camera.viewX + camera.viewW);
            // console.log(ivoNPC.y > camera.viewY);
        
        GameScreen.layers["NPCLayer"].removeChildren();
        
        //console.log(ivoNPC.x, ivoSprite.getX());
        if(ivoNPC.x > camera.viewX && 
            ivoNPC.x < camera.viewX + camera.viewW &&
            ivoNPC.y > camera.viewY && 
            ivoNPC.y < camera.viewY + camera.viewH) 
            {
            GameScreen.layers["NPCLayer"].add(ivoSprite);
            GameScreen.layers["NPCLayer"].add(donchoSprite);
            ivoSprite.setX(ivoNPC.x - camera.viewX);
            donchoSprite.setX(donchoNPC.x - camera.viewX);
            
        } else {
            ivoSprite.setX(ivoNPC.x);
            donchoSprite.setX(donchoNPC.x);
        }
    }


    function loadMap(earthTilePath) {
        var mapTileArray = [];
        for (var i = 0; i < Map.arrMap1.length; i++) {
            for (var j = 0; j < Map.arrMap1[i].length; j++) {
                if (Map.arrMap1[i][j] == 1) {

                    var eartTileSprite = renderer.addSprite(earthTilePath, j * gameMap.tileW, 500, gameMap.tileW * 2, gameMap.tileH);
                    gameMap.mapTilesObjs.push({
                        x: j * gameMap.tileW,
                        y: i * gameMap.tileH,
                        w: gameMap.tileW,
                        h: gameMap.tileH
                    });
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
        ivoSprite = renderer.addSprite("SpriteSheets/ivaylo_kenov.png", ivoNPC.x, ivoNPC.y, ivoNPC.w, ivoNPC.h);
        donchoSprite = renderer.addSprite("SpriteSheets/doncho_minkov.png", donchoNPC.x, donchoNPC.y, donchoNPC.w, donchoNPC.h);
        monsterSprite = renderer.createBlobSprite("SpriteSheets/normal_walk.png", player.x, player.y);
        mapSprite = renderer.addSprite("SpriteSheets/map.png", 0, 0, gameMap.mapRect.width, gameMap.mapRect.h);
        console.log()
        monsterSprite = renderer.createBlobSprite("SpriteSheets/normal_walk.png", GameScreen.stage.getWidth()/2, GameScreen.stage.getHeight()/2);
        trySprite = renderer.addSprite("SpriteSheets/tweety.png", 700, 300, 150, 150, 700);
    }

    function createLayers() {
        renderer.addLayer("mapLayer", GameScreen.stage, [mapSprite], GameScreen.layers);
        renderer.addLayer("monsterLayer", GameScreen.stage, [monsterSprite], GameScreen.layers);
        renderer.addLayer("NPCLayer", GameScreen.stage, [ivoSprite, donchoSprite], GameScreen.layers);
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