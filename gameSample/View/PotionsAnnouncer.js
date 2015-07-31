var PotionsAnnouncer = (function(){
	var PotionsAnnouncer = {};
	
	PotionsAnnouncer.announce = function(message)
	{
		var announcer = document.getElementById('announcer'),
			words = message.split(' '),
			name = words[0],
			specialty = words[2];
			
		announcer.innerHTML = '<span id="announcerText">Announcer:</span><br><br>' +
							  '<span class="playerName">' + name + '</span>' + ' used ' +
							  '<span class="playerSpecialty">' + specialty + '</span>';
	}
	
	PotionsAnnouncer.initialize = function()
	{
		var announcer = document.getElementById('announcer');
		
		announcer.innerHTML = '<span id="announcerText">Announcer:</span><br><br>';
	}
	
	PotionsAnnouncer.clear = function(message)
	{
		var announcer = document.getElementById('announcer');
		
		announcer.innerHTML = '';
	}
	
	return PotionsAnnouncer;
})();