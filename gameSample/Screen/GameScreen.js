var GameScreen = (function(parent)
{
    var GameScreen = {},
        player,
        ivoNPC, donchoNPC, npcWinCounter,
        renderer,
        playerSprite, mapSprite, ivoSprite, donchoSprite,
        gameMap,
        camera,
        collisionE,
        characters = [],
        announcer,
        prevDir;
        
    GameScreen.loadGraphics = function() {
        //console.log('loading graphics of the GameScreen');
    };

    GameScreen.init = function()
    {
        parent.init.call(this);
        
        player = Object.create(Player).init(350, 300, 60, 80, "You");
        ivoNPC = Object.create(NPC).init(210, 300, 90, 100, "Ivo");
        donchoNPC = Object.create(NPC).init(140, 380, 90, 100, "Doncho");
        
        renderer = Object.create(RenderEngine).init();
        announcer = Object.create(PotionsAnnouncer);
        announcer.clear();
        announcer.initialize();
        
        npcWinCounter = 0;
        
        characters.push(player);
        characters.push(ivoNPC);
        characters.push(donchoNPC);
        
        gameMap = Object.create(Map).init(0, 0, 12000, 500);
        camera = Object.create(Camera).init(0, 0, /*viewPort W and H*/ 700, 480, gameMap.mapRect.width, gameMap.mapRect.height);
        collisionE = Object.create(Collision).init();


        createSprites();
        createLayers();

        gameMap.loadMap(renderer);
        camera.follow(player, GameScreen.stage.getWidth()/2, GameScreen.stage.getHeight()/2);

        startSpriteAnims();

        return this;
    };

    GameScreen.update = function()
    {
        handlePotionsCollision();
        prevDir = player.direction;
        player.update();
        gameMap.updateMap(camera, "earthLayer", gameMap.mapTilesObjs, gameMap.mapTilesSprites);
        gameMap.updateMap(camera, "potionsLayer", gameMap.mapPotionsObjs, gameMap.mapPotionsSprites);
        ivoNPC.update(gameMap.mapTilesObjs);
        donchoNPC.update(gameMap.mapTilesObjs);
        camera.update();
        
        mapSprite.setX(-camera.viewX);

        handlePlayerGroundColl();
        
        updateNPCSprite();

        if(prevDir !== player.direction) handlePlayerAnim();

        renderer.render(this);

        winCheck();
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
        player.collisionDirection = '';
        ivoNPC.collisionDirection = '';
        donchoNPC.collisionDirection = '';
        for (var i = 0, len = gameMap.mapTilesObjs.length; i < len; i++) {
            player.collisionDirection += (collisionE.checkCollide(player, gameMap.mapTilesObjs[i]));
            ivoNPC.collisionDirection += (collisionE.checkCollide(ivoNPC, gameMap.mapTilesObjs[i]));
            donchoNPC.collisionDirection += (collisionE.checkCollide(donchoNPC, gameMap.mapTilesObjs[i]));
        }
    }
    
    function handlePotionsCollision(){
        applyBonuses(player);
        applyBonuses(ivoNPC);
        applyBonuses(donchoNPC);
    }

    function startSpriteAnims() {
        playerSprite.start();
    }

    function handlePlayerAnim()
    {
        console.log(player.direction);
        switch (player.direction)
        {
            case "left":
                playerSprite.setAnimation('walkLeft');

                break;
            case "right":
                playerSprite.setAnimation('walkRight');
                console.log(playerSprite)
                break;
            case "idle":
                playerSprite.setAnimation('idle');
                break;
        }
    }

    function createSprites() {
        ivoSprite = renderer.addSprite("SpriteSheets/ivaylo_kenov.png", ivoNPC.x, ivoNPC.y, ivoNPC.w, ivoNPC.h);
        donchoSprite = renderer.addSprite("SpriteSheets/doncho_minkov.png", donchoNPC.x, donchoNPC.y, donchoNPC.w, donchoNPC.h);
       // monsterSprite = renderer.createBlobSprite("SpriteSheets/normal_walk.png", player.x, player.y);
        mapSprite = renderer.addSprite("SpriteSheets/map.png", 0, 0, gameMap.mapRect.width, gameMap.mapRect.height);
        playerSprite = renderer.createBlobSprite("SpriteSheets/ninjaSprite.png", GameScreen.stage.getWidth()/2, GameScreen.stage.getHeight()/2);
    }

    function createLayers() {
        renderer.addLayer("mapLayer", GameScreen.stage, [mapSprite], GameScreen.layers);
        renderer.addLayer("playerLayer", GameScreen.stage, [playerSprite], GameScreen.layers);
        renderer.addLayer("NPCLayer", GameScreen.stage, [ivoSprite, donchoSprite], GameScreen.layers);
    }

    function ifWithinViewport(obj) {

        //return (obj.x + obj.w > camera.viewX &&
        //obj.x < camera.viewX + camera.viewW &&
        //obj.y + obj.h > camera.viewY &&
        //obj.y < camera.viewY + camera.viewH)

        return true;
    }

    function winCheck()
    {
        if (ifWin(player))
        {
            ScreenManager.changeToScreen(WinScreen);
            announcer.announceWinner(player.name);
        } 
        if (ifWin(donchoNPC))
        {
           ScreenManager.changeToScreen(LoseScreen); 
           announcer.announceWinner(donchoNPC.name);
        } 
        if (ifWin(ivoNPC))
        {
            ScreenManager.changeToScreen(LoseScreen);
            announcer.announceWinner(ivoNPC.name);
        } 
    }

    function ifWin(obj) {
        return (obj.x >= gameMap.finishPoint.x)
    }
    
    function applyBonuses(character) {
        for(var i = 0, len = gameMap.mapPotionsObjs.length; i < len; i += 1){
            if(collisionE.checkCollideWithPotions(character, gameMap.mapPotionsObjs[i]) != '')
            {
                switch(gameMap.mapPotionsObjs[i].type)
                {
                    case 'velocitySpeedPlayer':
                        gameMap.mapPotionsObjs.splice(i, 1);
                        gameMap.mapPotionsSprites.splice(i,1);
                        character.speedUp();
                        announcer.announce(character.name + ' used speed');
                        break;
                    case 'velocitySlowEnemies':
                        gameMap.mapPotionsObjs.splice(i, 1);
                        gameMap.mapPotionsSprites.splice(i,1);
                        character.slow();
                        announcer.announce(character.name + ' used slow');
                        break;
                    case 'freezePotion':
                        gameMap.mapPotionsObjs.splice(i, 1);
                        gameMap.mapPotionsSprites.splice(i,1);
                        characters.forEach(function(char){
                           if(character != char){
                               char.freeze();
                           } 
                        });
                        announcer.announce(character.name + ' used freeze');
                        break;
                     case 'setBackPotion':
                        gameMap.mapPotionsObjs.splice(i, 1);
                        gameMap.mapPotionsSprites.splice(i,1);
                        characters.forEach(function(char){
                           if(character != char){
                               char.setBack();
                           } 
                        });
                        announcer.announce(character.name + ' used pull');
                        break;
                }
                break;
            }
        }
    }

    return GameScreen;
})(Screen);