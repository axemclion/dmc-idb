//var sessions = 'http://www.mobileconference.nl/schedule.json&mobile=true&loadother=true';

$(document).ready(function() {
	$.getJSON('../data/sessions.json', function(data) {
		var items = [];
		$.each(data.sessions, function(key, val) {
			$.each(val, function() {
				$.each(this, function(key, val) {
					items.push(val);
				});
			});
		});

		function addItems(i) {
			// SAVE TO Database
			$.indexedDB('dmc').objectStore('sessions', true).add(items[i]).always(function() {
				console.log(arguments);
				if (i < items.length){
					addItems(i+1);
				}
			});
		}

		addItems(0);

		$('<ul/>', {
			'class': 'my-new-list',
			html: items.join('')
		}).appendTo('#content');
		window.items = items;
	});
});