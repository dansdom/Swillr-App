// edit event module
exports.EditEvent = function(nav, tabs, eventInfo, location, eventIndex) {
	
	Ti.API.log(location);
	var cancelButton = Titanium.UI.createButton({
		title : 'Cancel',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	var page = Ti.UI.createWindow({
		title : 'Edit Event',
		backButtonTitle : 'back',
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
		{title : 'Day:', type : 'picker', id : 'day', value : eventInfo.day, data : ['Monay', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']},
		{title : 'Start:', type : 'time', id : 'start', value : eventInfo.start},
		{title : 'End:', type : 'time', id : 'end', value : eventInfo.end},
		{title : 'Edit Event', type : 'submit', id : 'saveEvent'}
	];
	
	var eventForm = eventForm.createForm({
		style : eventForm.STYLE_LABEL,
		fields : eventFields,
		width : 'auto'
	});
	
	eventForm.addEventListener('saveEvent', function(e) {
		//Ti.API.log(e);
		//alert('saving event');
		
		location.events[eventIndex].day = e.values.day;
		location.events[eventIndex].start = e.values.start;
		location.events[eventIndex].end = e.values.end;
		e.location = location;
		Ti.App.fireEvent('app:redraw.venue', e);
	});
	
	pageView.add(eventForm);
	
	// button event listeners
	cancelButton.addEventListener('click', function() {
		// cancel the edit action and remove it from the stack
		nav.venuesWindowStack.pop(page);
		nav.venues.close(page);
	});
	
	page.add(pageView);
	// return the page
	return page;
	
};