var Map = (function()
{
    var Map = {};

    Map.init = function(x, y, w, h)
    {
        this.mapRect = Object.create(Rectangle).init(x, y, w, h);

        this.tileW = 100;
        this.tileH = 100;
        
        this.potionW = 55;
        this.potionH = 55;

        this.mapTilesSprites = [];
        this.mapPotionsSprites = [];
        
        this.mapTilesObjs = [];
        this.mapPotionsObjs = [];

        this.currentMapArr = [];

        return this;
    };

    Map.updateMap = function(camera) {
        GameScreen.layers["earthLayer"].removeChildren();

        for (var i = 0; i < this.mapTilesObjs.length; i++) {
            if (this.mapTilesObjs[i].x >= camera.viewX &&
                this.mapTilesObjs[i].x < camera.viewX + camera.viewW &&
                this.mapTilesObjs[i].y > camera.viewY &&
                this.mapTilesObjs[i].y < camera.viewY + camera.viewW)
            {
                this.mapTilesSprites[i].setX(this.mapTilesObjs[i].x - camera.viewX);
                this.mapTilesSprites[i].setY(this.mapTilesObjs[i].y - camera.viewY);
                GameScreen.layers["earthLayer"].add(this.mapTilesSprites[i]);               
            }
            else {
                this.mapTilesSprites[i].setY(this.mapTilesObjs[i].y);
                this.mapTilesSprites[i].setX(this.mapTilesObjs[i].x);
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
                    pushIntoMapPotionObjs.call(this, j * this.potionW, i * this.potionH, this.potionW, this.potionW, "velocity");
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'v', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
        [1, 1, 2, 2, 2, 2, 3, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1]
    ];

    Map.arrMap2 = [

    ];

    return Map;
})();