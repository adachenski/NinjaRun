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
							  '<span class="playerSpecialty">' + specialty + '</span> <br>' +
							  '<span class="veryEffective"> And it\'s very effective! </span>';
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
	
	PotionsAnnouncer.announceWinner = function(winner)
	{
		var announcer = document.getElementById('announcer');
		
		announcer.innerHTML = '<span id="announcerText">Announcer:</span><br><br>' +
							  '<span class="playerName">' + winner + '</span>' +
							  '<span class="playerSpecialy"> won</span>';
	}
	
	return PotionsAnnouncer;
})();