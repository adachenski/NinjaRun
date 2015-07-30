var Map = (function()
{
    var Map = {};

    Map.init = function(x, y, w, h)
    {
        this.mapRect = Object.create(Rectangle).init(x, y, w, h);

        this.tileW = 100;
        this.tileH = 100;
        
        this.potionW = 50;
        this.potionH = 50;

        this.mapTilesSprites = [];
        this.mapPotionsSprites = [];
        
        this.mapTilesObjs = [];
        this.mapPotionsObjs = [];

        this.currentMapArr = [];
        this.finishPoint = {};
        setCurrentMapArr.call(this);


        return this;
    };

    function setCurrentMapArr()
    {
        if(GameConsts.chosenMap == "map1") this.currentMapArr = Map.arrMap1;
        if (GameConsts.chosenMap == "map2") this.currentMapArr = Map.arrMap2;
    }

    function setFinishPoint()
    {
        var maxX = 0;
        for(var i = 0, len = this.mapTilesObjs.length; i < len; i++)
        {
            if(maxX < this.mapTilesObjs[i].x) maxX = this.mapTilesObjs[i].x;
        }

        this.finishPoint.x =  maxX;
    }

    Map.updateMap = function(camera, layer, mapObjs, mapSprites) {
        GameScreen.layers[layer].removeChildren();

        for (var i = 0; i < mapObjs.length; i++) {
            if (mapObjs[i].x + mapObjs[i].w >= camera.viewX &&
                mapObjs[i].x < camera.viewX + camera.viewW &&
                mapObjs[i].y > camera.viewY &&
                mapObjs[i].y < camera.viewY + camera.viewW)
            {
                mapSprites[i].setX(mapObjs[i].x - camera.viewX);
                mapSprites[i].setY(mapObjs[i].y - camera.viewY);
                GameScreen.layers[layer].add(mapSprites[i]);               
            }
            else {
                mapSprites[i].setY(mapObjs[i].y);
                mapSprites[i].setX(mapObjs[i].x);
            }
        }
    };

    Map.loadMap = function(renderer) {
        function pushIntoMapTilesObjs(x, y, w, h, type) {
            this.mapTilesObjs.push({
                x: x,
                y: y,
                w: w,
                h: h,
                type: type
            });
        }
        
        function pushIntoMapPotionObjs(x, y, w, h, type) {
            this.mapPotionsObjs.push({
                x: x,
                y: y,
                w: w,
                h: h,
                type: type
            });
        }

        for (var i = 0; i < this.currentMapArr.length; i++) {
            for (var j = 0; j < this.currentMapArr[i].length; j++) {
                var tileSpriteToAdd = null,
                    potionSpriteToAdd = null;
                    
                if (this.currentMapArr[i][j] == 1) {
                    tileSpriteToAdd = renderer.addSprite(GameConsts.grassTilePath, j * this.tileW, i * this.tileH, this.tileW, this.tileH);
                    pushIntoMapTilesObjs.call(this, j * this.tileW, i * this.tileH, this.tileW, this.tileH, "grass");
                }
                else if (this.currentMapArr[i][j] == 2) {
                    tileSpriteToAdd = renderer.addSprite(GameConsts.brickTilePath, j * this.tileW, this.tileH, this.tileW, this.tileH);
                    pushIntoMapTilesObjs.call(this, j * this.tileW, i * this.tileH, this.tileW, this.tileH, "brick");
                }
                else if (this.currentMapArr[i][j] == 3) {
                    tileSpriteToAdd = renderer.addSprite(GameConsts.waterTilePath, j * this.tileW, this.tileH, this.tileW, this.tileH);
                    pushIntoMapTilesObjs.call(this, j * this.tileW, i * this.tileH, this.tileW, this.tileH, "water");
                }
                else if(this.currentMapArr[i][j] == 'v') {
                    potionSpriteToAdd = renderer.addSprite(GameConsts.velocityPotion, j * this.potionW, this.potionH, this.potionW, this.potionH);
                    pushIntoMapPotionObjs.call(this, (j * this.potionW) * 2, (i * this.potionH) * 2, this.potionW, this.potionW, "velocitySpeedPlayer");
                }
                else if(this.currentMapArr[i][j] == 's') {
                    potionSpriteToAdd = renderer.addSprite(GameConsts.slowerEnemiesPotion, j * this.potionW, this.potionH, this.potionW, this.potionH);
                    pushIntoMapPotionObjs.call(this, (j * this.potionW) * 2, (i * this.potionH) * 2, this.potionW, this.potionW, "velocitySlowEnemies");
                }
                if (tileSpriteToAdd !== null) this.mapTilesSprites.push(tileSpriteToAdd);
                if (potionSpriteToAdd !== null) this.mapPotionsSprites.push(potionSpriteToAdd);
            }
        }
        renderer.addLayer("earthLayer", GameScreen.stage, this.mapTilesSprites, GameScreen.layers);
        renderer.addLayer("potionsLayer", GameScreen.stage, this.mapPotionsSprites, GameScreen.layers);
        setFinishPoint.call(this);
    };

    Map.arrMap1 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 'v', 0, 0, 2, 2, 2, 0, 0, 2, 0, 'v', 2, 0, 0, 0, 0, 0, 0, 0, 's', 0, 0, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    Map.arrMap2 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 3, 0, 0, 2, 0, 0, 3, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    ];

    return Map;
})();