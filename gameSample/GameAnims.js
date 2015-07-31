//var GameAnimObjs = (function() {
    var GameAnimObjs = {};

    GameAnimObjs.playerAnims = {
        idle: [

        ],
        walkRight: [
            8, 90, 65, 90,
            73, 90, 65, 90,
            144, 90, 65, 90,
            214, 90, 65, 90
        ],
        walkLeft: [
            8, 2, 65, 90,
            73, 2, 65, 90,
            144, 2, 65, 90,
            214, 2, 65, 90
        ],
        idle: [
            8, 90, 65, 119
        ],
        punch: [{
            x: 2,
            y: 138,
            width: 74,
            height: 122
        }, {
            x: 76,
            y: 138,
            width: 84,
            height: 122
        }, {
            x: 346,
            y: 138,
            width: 120,
            height: 122
        }]
    };

//    return GameAnimObjs;
//})();