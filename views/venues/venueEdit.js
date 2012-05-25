// mopdule that generates the friends list
exports.VenueEdit = function(nav, tabs, location) {
	
	//Ti.API.log('this is the location');
	//Ti.API.log(location);
	
	// if it's a new venue, then define some empty values
	if (!location) {
		var location = {
			title : '',
			address : '',
			suburb : ''
		};
	}
	
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
		{title : 'Title:', type : 'text', id : 'title', value : location.title},
		{title : 'Address:', type : 'text', id : 'address', value : location.address},
		{title : 'Suburb:', type : 'text', id : 'suburb', value : location.suburb},
		//{title : 'State:', type : 'picker', id : 'state', value : 'NSW', data : ['NSW', 'VIC', 'QLD', 'SA', 'NT', 'ACT', 'WA', 'TAS']},
		{title : 'Save Venue', type : 'submit', id : 'saveVenue'}
	];
	
	var venueForm = venueForm.createForm({
		style : venueForm.STYLE_LABEL,
		fields : venueFields,
		width : 'auto'
	});
	
	venueForm.addEventListener('saveVenue', function(e) {
		//Ti.API.log(e);
		location.address = e.values.address || location.address;
		location.suburb = e.values.suburb || location.suburb;
		location.title = e.values.title || location.title;
		// I think I have to do my data handling here, and pass the processed data to the event
		//alert('saving venue');
		e.location = location;
		Ti.API.log('save venue info');
		Ti.API.log(e);
		Ti.API.log(location);
		Ti.App.fireEvent('app:redraw.venue', e);
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