// mopdule that generates the friends list
exports.AddEvent = function(nav, tabs, location) {
	
	Ti.API.log(location);
	var cancelButton = Titanium.UI.createButton({
		title : 'Cancel',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	var page = Ti.UI.createWindow({
		title : 'Add Event',
		backButtonTitle : 'Back',
		rightNavButton : cancelButton,
		barColor: '#1E0B02'
	});
	
	var pageView = Ti.UI.createScrollView({
		//layout : 'vertical',
		contentWidth: 'auto',
  		contentHeight: 'auto',
  		showVerticalScrollIndicator: true,
  		height : '100%',
  		width : '100%'
	});
	
	// add the form to the page
	var eventForm = require('libs/forms');
	var eventFields = [
		{title : 'Day:', type : 'picker', id : 'day', data : ['Monay', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']},
		{title : 'Start:', type : 'time', id : 'start'},
		{title : 'End:', type : 'time', id : 'end'},
		{title : 'Create Event', type : 'submit', id : 'createEvent'}
	];
	
	var eventForm = eventForm.createForm({
		style : eventForm.STYLE_LABEL,
		fields : eventFields,
		width : 'auto'
	});
	
	eventForm.addEventListener('createEvent', function(e) {
		//Ti.API.log(location);
		
		// save the new location data
		// each filed needs a value
		if (!e.values.day || !e.values.end || !e.values.start) {
			alert('All fields must be filled out to save this event');
		}
		else {
			//alert('Saving event');
			var newEvent = {
				day : e.values.day,
				start : e.values.start,
				end : e.values.end
			}
			// check whether the location exists, if not then create a new event
			if (location) {
				if (location.events) {
					location.events.push(newEvent);
				}
				else {
					location.events = [newEvent];
				}
			}
			else {
				location = {
					events : [
						newEvent
					]
				}
			}
			e.location = location;
			Ti.App.fireEvent('app:redraw.venue', e);
		}
	});
	
	pageView.add(eventForm);
	
	// add event listeners for the buttons
	cancelButton.addEventListener('click', function() {
		// cancel the edit action and remove it from the stack
		nav.venuesWindowStack.pop(page);
		nav.venues.close(page);
	});
	
	page.add(pageView);
	// return the page
	return page;
	
};