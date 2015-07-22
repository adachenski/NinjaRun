var InputHandlerEngine = (function InputHandlerEngine(){
	var inputHandlerEngine = {};
	
	inputHandlerEngine.init = function() 
	{
		inputHandlerEngine.moves = [];
		
		return this;
	};
	
	inputHandlerEngine.handleKeyboardInput = function()
	{
		document.onkeydown = function(e)
		{
			inputHandlerEngine.moves = [];
			
			switch (e.keyCode)
			{
				case (38 || 87): //arrow up or w
					console.log('up');
					inputHandlerEngine.moves.push('up');
					break;
				case (37 || 65): //arrow left or a
					console.log('left');
					inputHandlerEngine.moves.push('left');
					break;
				case (39 || 68): //arrow right or d
					console.log('right');
					inputHandlerEngine.moves.push('right');
					break;
				case (40 || 83): //arrow down or s
					console.log('down');
					inputHandlerEngine.moves.push('down');
					break;
				default:
					break;
			}
		} 
		
		return inputHandlerEngine.moves;
	};
	
	inputHandlerEngine.handleMouseInput = function()
	{
		//TODO: handle menu screen input
	};
	
	return inputHandlerEngine;
}());