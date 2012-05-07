// mopdule that generates the friends list
exports.EditEvent = function(nav, tabs, event) {
	
	//Ti.API.log(location);
	var cancelButton = Titanium.UI.createButton({
		title : 'Cancel',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	var page = Ti.UI.createWindow({
		title : 'Edit Event',
		backButtonTitle : 'back',
		rightNavButton : cancelButton,
		barColor: '#1E0B02',
		backgroundImage : 'img/bg.png',
		backgroundRepeat : true
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
		{title : 'Create Event', type : 'submit', id : 'saveEvent'}
	];
	
	var eventForm = eventForm.createForm({
		style : eventForm.STYLE_LABEL,
		fields : eventFields,
		width : 'auto'
	});
	
	eventForm.addEventListener('saveEvent', function(e) {
		Ti.API.log(e);
		//alert('saving event');
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