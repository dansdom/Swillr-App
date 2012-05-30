// mopdule that generates the friends list
exports.EditDeal = function(nav, tabs, deal, location, eventIndex, dealIndex) {
	
	//Ti.API.log(index);
	var cancelButton = Titanium.UI.createButton({
		title : 'Cancel',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	var page = Ti.UI.createWindow({
		title : 'Edit Deal',
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
	})
	
	
	// add the form to the page
	var dealForm = require('libs/forms');
	var dealFields = [
		{title : 'Deal Description:', type : 'text', id : 'title', value : deal},
		{title : 'Save Deal', type : 'submit', id : 'editDeal'}		
	];
	
	var dealForm = dealForm.createForm({
		style : dealForm.STYLE_LABEL,
		fields : dealFields,
		width : 'auto'
	});
	
	dealForm.addEventListener('editDeal', function(e) {
		
		Ti.API.log(location.events[eventIndex].deals);
		//alert('saving deal');
		if (e.values.title) {
			if (location.events[eventIndex].deals) {
			//Ti.API.log(eventIndex);
				location.events[eventIndex].deals[dealIndex] = e.values.title;
			}
			else {
				location.events[eventIndex].deals = [e.values.title];
			}
		}
		//Ti.API.log(location);
		e.location = location;
		Ti.App.fireEvent('app:redraw.venue', e);
		
	});
	
	pageView.add(dealForm);
	
	
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