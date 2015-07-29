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

        return this;
    };

    Map.updateMap = function(camera, layer, mapObjs, mapSprites) {
        GameScreen.layers[layer].removeChildren();

        for (var i = 0; i < mapObjs.length; i++) {
            if (mapObjs[i].x >= camera.viewX &&
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
    }

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

        for (var i = 0; i < Map.arrMap1.length; i++) {
            for (var j = 0; j < Map.arrMap1[i].length; j++) {
                var tileSpriteToAdd = null,
                    potionSpriteToAdd = null;
                    
                if (Map.arrMap1[i][j] == 1) {
                    tileSpriteToAdd = renderer.addSprite(GameConsts.grassTilePath, j * this.tileW, i * this.tileH, this.tileW, this.tileH);
                    pushIntoMapTilesObjs.call(this, j * this.tileW, i * this.tileH, this.tileW, this.tileH, "grass");
                }
                else if (Map.arrMap1[i][j] == 2) {
                    tileSpriteToAdd = renderer.addSprite(GameConsts.brickTilePath, j * this.tileW, this.tileH, this.tileW, this.tileH);
                    pushIntoMapTilesObjs.call(this, j * this.tileW, i * this.tileH, this.tileW, this.tileH, "brick");
                }
                else if (Map.arrMap1[i][j] == 3) {
                    tileSpriteToAdd = renderer.addSprite(GameConsts.waterTilePath, j * this.tileW, this.tileH, this.tileW, this.tileH);
                    pushIntoMapTilesObjs.call(this, j * this.tileW, i * this.tileH, this.tileW, this.tileH, "water");
                }
                else if(Map.arrMap1[i][j] == 'v') {
                    potionSpriteToAdd = renderer.addSprite(GameConsts.velocityPotion, j * this.potionW, this.potionH, this.potionW, this.potionH);
                    pushIntoMapPotionObjs.call(this, (j * this.potionW) * 2, (i * this.potionH) * 2, this.potionW, this.potionW, "velocity");
                }
                else if(Map.arrMap1[i][j] == 's') {
                    potionSpriteToAdd = renderer.addSprite(GameConsts.slowerEnemiesPotion, j * this.potionW, this.potionH, this.potionW, this.potionH);
                    pushIntoMapPotionObjs.call(this, (j * this.potionW) * 2, (i * this.potionH) * 2, this.potionW, this.potionW, "velocity");
                }
                if (tileSpriteToAdd !== null) this.mapTilesSprites.push(tileSpriteToAdd);
                if (potionSpriteToAdd !== null) this.mapPotionsSprites.push(potionSpriteToAdd);
            }
        }
        //console.log(this.mapTilesSprites);
        renderer.addLayer("earthLayer", GameScreen.stage, this.mapTilesSprites, GameScreen.layers);
        renderer.addLayer("potionsLayer", GameScreen.stage, this.mapPotionsSprites, GameScreen.layers);
    }

    Map.arrMap1 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 'v', 0, 0, 2, 2, 2, 0, 0, 2, 0, 'v', 2, 0, 0, 0, 0, 0, 0, 0, 's', 0, 0, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    Map.arrMap2 = [

    ];

    return Map;
})();