var InputHandlerEngine = (function InputHandlerEngine(){
	var inputHandlerEngine = {
		init: function() 
		{
			return this;
		},
		handleKeyboardInput: function()
		{
<<<<<<< HEAD
=======
			var moves = [];
			window.addEventListener('keydown', function(e){
				if(e.keyCode === 37) {
					moves.push('left');
				} else if (e.keyCode === 38) {
					moves.push('up');
				} else if (e.keyCode === 39) {
					moves.push('right');
				}
				if(e.keyCode == 40) moves.push('down');
			});
			//console.log(moves)
			return moves;
>>>>>>> nickBranch
		},
		handleMouseInput: function()
		{
			//TODO: handle menu screen input
		}
	};
	return inputHandlerEngine;
}());