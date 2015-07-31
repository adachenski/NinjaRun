var Player = (function (parent) {
    var Player = {};

    var CONSTS = {
        SCREEN_WIDTH: 640,
        SCREEN_HEIGHT: 480
    };

    Player.init = function (x, y, w, h, name) {

        parent.init.call(Player, x, y, w, h, name);
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
                delete this._pressed[e.keyCode];
            }
        };

        this.collisionDirection = '';
        this.isRunning = false;

        return this;
    };

    Player.update = function () {
        this.direction = 'idle';
        this.isRunning = false;
         window.addEventListener('keyup', function (e) {
            Player.Key.onKeyUp(e);
        }, false);

        window.addEventListener('keydown', function (e) {
            Player.Key.onKeyDown(e);
        }, false);


        function animateLeft() {
            this.direction = 'left';
            this.x -= this.runVel;
        }
        function animateRight() {
            this.direction = 'right';
            this.x += this.runVel;
        }
        //function animateDown() {
        //    //Player.y += velocityY;
        //}
        //function animateUp() {
        //    //Player.y -= velocityY;
        //}
        function animateJump() {

        }

        if (this.Key.isDown(this.Key.UP) && this.collisionDirection.indexOf('top') == -1) {
        }
        if (this.Key.isDown(this.Key.LEFT) && this.collisionDirection.indexOf('left') == -1) {
            this.isRunning = true;
            animateLeft.call(this);
        }
        if (this.Key.isDown(this.Key.RIGHT) && this.collisionDirection.indexOf('right') == -1) {
            this.isRunning = true;
            animateRight.call(this)
        }

        if (this.Key.isDown(this.Key.SPACE) && this.grounded == true) {
            jumpSound.playclip();
            this.grounded = false;
            this.hasJumped = true;
            this.startJumping = true;
        }
        if(this.startJumping)
        {
            parent.jump.call(this);
        }

        if(this.collisionDirection.indexOf('bot') == -1)
        {
            parent.gravity.call(this);
        }
        else {
            this.grounded = true;
        }

        parent.accelerate.call(this);
    };

    Player.slow = function()
    {
        parent.slow.call(this);
    };
    
    Player.collideWith = function(obj2)
    {
        parent.collideWith.call(this, obj2);    
    };

    Player.speedUp = function()
    {
        parent.speedUp.call(this);
    };
    
    Player.freeze = function()
    {
        parent.freeze.call(this);
    };
    
    Player.setBack = function()
    {
        parent.setBack.call(this);
    };

    return Player;
})(Character);
