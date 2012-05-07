// mopdule that generates the friends list
exports.VenueEdit = function(nav, tabs, location) {
	
	//Ti.API.log(location);
	var cancelButton = Titanium.UI.createButton({
		title : 'Cancel',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	var page = Ti.UI.createWindow({
		title : 'Edit Venue',
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
	var venueForm = require('libs/forms');
	var venueFields = [
		{title : 'Title:', type : 'text', id : 'title'},
		{title : 'Address:', type : 'text', id : 'address'},
		{title : 'Suburb:', type : 'text', id : 'suburb'},
		{title : 'State:', type : 'picker', id : 'state', data : ['NSW', 'VIC', 'QLD', 'SA', 'NT', 'ACT', 'WA', 'TAS']},
		{title : 'Save Venue', type : 'submit', id : 'saveVenue'}
	];
	
	var venueForm = venueForm.createForm({
		style : venueForm.STYLE_LABEL,
		fields : venueFields,
		width : 'auto'
	});
	
	venueForm.addEventListener('saveVenue', function(e) {
		Ti.API.log(e);
		alert('saving venue');
	});
	
	pageView.add(venueForm);
	
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