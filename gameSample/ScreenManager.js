/**
 * Created by Nick on 21/7/2015.
 */

var ScreenManager = (function () {

    var canvas,
        ctx,
        ScreenManager = {},
        currentScreen,
        delta = Date.now(),
        lastFrameTimeMs = 0,
        maxFps = 60,
        lay,
        r;

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (function () {
            return window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                    window.setTimeout(callback, 1000 / 60);
                }
        })();
    }

    ScreenManager.init = function () {

        currentScreen = MainMenuScreen;

        currentScreen.init();
        currentScreen.loadGraphics();

        //setGetCanvas();
        return this;
    };

    ScreenManager.update = function (timestamp) {

        if(timestamp < lastFrameTimeMs + (1000 / maxFps)) {
            requestAnimationFrame(ScreenManager.update);
            return;
        }

        delta = timestamp - lastFrameTimeMs;
        lastFrameTimeMs = timestamp;

        currentScreen.update(delta);
        ScreenManager.render(ctx);

        window.requestAnimationFrame(ScreenManager.update);
    };

    ScreenManager.render = function (ctx) {
        //clearCanvas(ctx);

        //currentScreen.stage.draw();
    };

    ScreenManager.changeToScreen = function (Screen) {
        currentScreen = Screen;
        currentScreen.init();

    };

    function clearCanvas(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function setGetCanvas() {
        canvas = document.getElementById('gameCanvas');
        //canvas.width = 640;
        //canvas.height = 480;
        ctx = canvas.getContext('2d');
    }

    return ScreenManager;
}());

