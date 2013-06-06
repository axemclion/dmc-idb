//var sessions = 'http://www.mobileconference.nl/schedule.json&mobile=true&loadother=true';

$(document).ready(function() {
	$(document).trigger('displayData');
	$.getJSON('../data1/sessions.json').done(function(data) {
		writeData(data, function(){
			// TODO: Write better logic to check if the data has changed
			$(document).trigger('displayData');
		});
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
	var ul = $('<ul>');
	$.indexedDB('dmc').objectStore('sessions').each(function(data) {
		$('<li>').html(showSession(data.value)).appendTo(ul);
	});
	$('#content').append(ul);
});

function showSession(s) {
	return s.day + " " + s.time + " - " + s.title;
}