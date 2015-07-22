
var InputHandler = (function inputHandler() {
    var inputHandler = {};

    inputHandler.init = function ()
    {
        inputHandler.moves = [];
        return this;
    };

    inputHandler.handleKeyboardInput = function()
    {
        inputHandler.moves = [];

        document.onkeydown = function (e) {

            switch (e.keyCode) {
                case 37: //left
                    console.log('left');
                    inputHandler.moves.push('left');
                    break;
                case 38: //up
                    //inputHandler.moves.push('left');
                    //console.log('up')
                    break;
                case 39: //right
                    inputHandler.moves.push('right');
                    console.log('right');
                    break;
                case 40: //down
                    console.log('down');
                    break;
            }

        };



        //
        //document.addEventListener('keydown', function (event) {
        //    //debugger;
        //
        //    if (event.keyCode == 37) {
        //        moves.push('left');
        //        //console.log('Left was pressed');
        //    }
        //    if (event.keyCode == 39) {
        //        moves.push('right');
        //        //console.log('in the func ' + moves);
        //        //console.log('Right was pressed');
        //    }
        //});
        return inputHandler.moves;
    };

    return inputHandler;
})();