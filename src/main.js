//var sessions = 'http://www.mobileconference.nl/schedule.json&mobile=true&loadother=true';

$(document).ready(function() {
	$.getJSON('/data/sessions.json', function(data) {
		var items = [];
		$.each(data.sessions, function(key, val) {
			$.each(val, function(){
				$.each(this, function(key, val){
					items.push("<li>" + JSON.stringify(val) + '</li>');
				});
			});
		});

		$('<ul/>', {
			'class': 'my-new-list',
			html: items.join('')
		}).appendTo('#content');
	});
});