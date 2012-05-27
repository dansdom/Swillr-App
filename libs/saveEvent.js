// this function will post the saved event back tot he server
exports.SaveEvent = function(location) {
	
	var Request = require('libs/httpRequest').HttpRequest;
	var url = 'http://swillr.com/update_venue_data';
	
	
	
	var confirmBtn = Ti.UI.createAlertDialog({
		cancel: 1,
		buttonNames: ['Save', 'Cancel'],
		message: 'Would you like to save this event?',
		title: 'Save Event'
	});
	confirmBtn.show();
	confirmBtn.addEventListener('click', function(e) {
		Ti.API.log(e);
		if (e.index == 0) {
			Ti.API.log('about to save');
			//need to encode the data first
			function sendResponse() {
				Ti.API.log('doing save callback');
				// create an alert saying that the data has been sent for moderation
				alert('The venue data has been successfully sent to the team for moderation.');
			};
			var sendData = new Request('POST', url, location, sendResponse);
		}
	});
	// return the user details
	// not returning anything, just sending data
	return true;
};