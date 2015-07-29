/**
 * Created by Nick on 21/7/2015.
 */


var GameScreen = (function(parent)
{
    var GameScreen = {},
        player,
        ivoNPC, donchoNPC, npcWinCounter,
        renderer,
        monsterSprite, mapSprite, ivoSprite, donchoSprite,
        gameMap,
        camera,
        trySprite,
        tryObj = {x: 700, y: 400, w:50, h: 50},
        collisionE;

    GameScreen.loadGraphics = function() {
        //console.log('loading graphics of the GameScreen');
    };

    GameScreen.init = function()
    {
        parent.init.call(this);
        player = Object.create(Player).init(350, 100, 90, 100);
        renderer = Object.create(RenderEngine).init();
        ivoNPC = Object.create(NPC).init(210, 300, 90, 100);
        donchoNPC = Object.create(NPC).init(140, 380, 90, 100);
        npcWinCounter = 0;
        
        gameMap = Object.create(Map).init(0, 0, 3000, 2000);
        camera = Object.create(Camera).init(0, 0, /*viewPort W and H*/ 700, 480, gameMap.mapRect.width, gameMap.mapRect.height);
        collisionE = Object.create(Collision).init();


        createSprites();
        createLayers();

        gameMap.loadMap(renderer);
        camera.follow(player, GameScreen.stage.getWidth()/2, GameScreen.stage.getHeight()/2);

        startSpriteAnims();
        //loadMap("SpriteSheets/grass.png");

        return this;
    };

    GameScreen.update = function()
    {
        
        player.update();
        gameMap.updateMap(camera, "earthLayer", gameMap.mapTilesObjs, gameMap.mapTilesSprites);
        gameMap.updateMap(camera, "potionsLayer", gameMap.mapPotionsObjs, gameMap.mapPotionsSprites);
        ivoNPC.update(gameMap.mapTilesObjs);
        donchoNPC.update(gameMap.mapTilesObjs);
        camera.update();
        
        mapSprite.setX(-camera.viewX);
        mapSprite.setY(-camera.viewY);

        handlePlayerGroundColl();
        updateNPCSprite();

        renderer.render(this);
        //renderer.animate(player.x, player.y, layerToUpdate);
        //console.log('=======', player.x, player.y)
        //mapSprite.crop({x: camera.viewX, y: camera.viewY, width: camera.viewW, height: camera.viewH});

        parent.update.call(this);
    };
    
    function updateNPCSprite()
    {
        GameScreen.layers["NPCLayer"].removeChildren();

        if(ifWithinViewport(ivoNPC))
        {
            GameScreen.layers["NPCLayer"].add(ivoSprite);
            GameScreen.layers["NPCLayer"].add(donchoSprite);

            ivoSprite.setX(ivoNPC.x - camera.viewX);
            ivoSprite.setY(ivoNPC.y - camera.viewY);

            donchoSprite.setX(donchoNPC.x - camera.viewX);
            donchoSprite.setY(donchoNPC.y - camera.viewY);
        }
        else {
            ivoSprite.setX(ivoNPC.x);
            ivoSprite.setY(ivoNPC.y);

            donchoSprite.setX(donchoNPC.x);
            donchoSprite.setY(donchoNPC.y);
        }
    }

    function handlePlayerGroundColl() {
        for (var i = 0, len = gameMap.mapTilesObjs.length; i < len; i++) {
            collisionE.collision(player, gameMap.mapTilesObjs[i]);
            collisionE.collision(ivoNPC, gameMap.mapTilesObjs[i]);
            collisionE.collision(donchoNPC, gameMap.mapTilesObjs[i]);
        }

        //test code
        // if (tryObj.x > camera.viewX && tryObj.x < camera.viewX + camera.viewW) {
        //     trySprite.setX(700 - camera.viewX);
        // }
        // else trySprite.setX(tryObj.x);
    }

    function startSpriteAnims() {
        monsterSprite.start();
    }

    function createSprites() {
        ivoSprite = renderer.addSprite("SpriteSheets/ivaylo_kenov.png", ivoNPC.x, ivoNPC.y, ivoNPC.w, ivoNPC.h);
        donchoSprite = renderer.addSprite("SpriteSheets/doncho_minkov.png", donchoNPC.x, donchoNPC.y, donchoNPC.w, donchoNPC.h);
        monsterSprite = renderer.createBlobSprite("SpriteSheets/normal_walk.png", player.x, player.y);
        mapSprite = renderer.addSprite("SpriteSheets/map.png", 0, 0, gameMap.mapRect.width, gameMap.mapRect.h);
        monsterSprite = renderer.createBlobSprite("SpriteSheets/normal_walk.png", GameScreen.stage.getWidth()/2, GameScreen.stage.getHeight()/2);
    }

    function createLayers() {
        renderer.addLayer("mapLayer", GameScreen.stage, [mapSprite], GameScreen.layers);
        renderer.addLayer("monsterLayer", GameScreen.stage, [monsterSprite], GameScreen.layers);
        renderer.addLayer("NPCLayer", GameScreen.stage, [ivoSprite, donchoSprite], GameScreen.layers);
    }

    function ifWithinViewport(obj) {
        return (obj.x > camera.viewX &&
        obj.x < camera.viewX + camera.viewW &&
        obj.y > camera.viewY &&
        obj.y < camera.viewY + camera.viewH)
    }

    return GameScreen;
})(Screen);