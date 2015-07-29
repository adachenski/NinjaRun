var Player = (function (parent) {
    var Player = {};

    var CONSTS = {
        SCREEN_WIDTH: 640,
        SCREEN_HEIGHT: 480
    };

    Player.init = function (x, y, w, h) {

        parent.init.call(Player, x, y, w, h);
        Player.Key = {
            _pressed: {},
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            SPACE: 32,

            isDown: function (keyCode) {
                return this._pressed[keyCode];
            },

            onKeyDown: function (e) {
                this._pressed[e.keyCode] = true;
            },

            onKeyUp: function (e) {
                Player.isRunning = false;
                delete this._pressed[e.keyCode];
            }
        };

        return this;
    };

    Player.update = function () {
        var velocityX = this.runVel,
            velocityY = 10,
            currentX = Player.x,
            currentY = Player.y,
            maxJump = 30;


        window.addEventListener('keyup', function (e) {
            Player.Key.onKeyUp(e);
        }, false);

        window.addEventListener('keydown', function (e) {
            Player.Key.onKeyDown(e);
        }, false);


        function animateLeft() {
            Player.x -= velocityX;
        }
        function animateUp() {
            Player.y -= velocityY;
        }
        function animateRight() {
            Player.x += velocityX;
        }
        function animateDown() {
            Player.y += velocityY;
        }

        function animateJump() {

        }

        if (Player.Key.isDown(Player.Key.UP)) {
            animateUp()
        }
        if (Player.Key.isDown(Player.Key.LEFT)) {
            Player.isRunning = true;
            animateLeft()
        }
        if (Player.Key.isDown(Player.Key.RIGHT)) {
            Player.isRunning = true;
            animateRight()
        }
        if (Player.Key.isDown(Player.Key.DOWN)) {
            animateDown()
        }
        if (Player.Key.isDown(Player.Key.SPACE)) {
            this.hasJumped = true;
            this.grounded = false;
        }
        //console.log('_________________',this.hasJumped, Player.grounded)
        parent.jump.call(this);
        parent.gravity.call(this);
        parent.accelerate.call(Player);
    };


    return Player;
})(Character);
