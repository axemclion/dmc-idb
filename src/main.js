//var sessions = 'http://www.mobileconference.nl/schedule.json&mobile=true&loadother=true';

$(document).ready(function() {
	$(document).trigger('displayData');
	$.getJSON('../data/sessions.json').done(function(data) {
		// TODO: Write better logic to check if the data has changed
		//$.indexedDB('dmc').objectStore('sessions').clear().then(function(){
			writeData(data, function() {
				$(document).trigger('displayData');
			});
		//});
	});
});


function writeData(data, callback) {
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
			if (i < items.length) {
				addItems(i + 1);
			} else {
				// Called when all data is written
				callback();
			}
		});
	}
	addItems(0);
}


$(document).on('displayData', function() {
	var ul = $('<ul class="talks">');
	$.indexedDB('dmc').objectStore('sessions').each(function(data) {
		$('<li>').html(showSession(data.value)).appendTo(ul);
	});
	$('#content').append(ul);
});

function showSession(s) {
	try {
        var speakers = '';
        if (s.speakers.length > 0) {
            for (var i = 0; i < s.speakers.length; i++) {
                speakers = s.speakers[i].name + '<br>';
            }
        }

		return "<span class=\"label label-info\">" + s.day + " " + s.time + "</span> - <strong>" + s.title + "</strong><br>" + speakers;
	} catch (e) {
		console.log(s);
	}
}