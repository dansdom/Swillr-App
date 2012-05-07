// mopdule that generates the friends list
exports.AddDeal = function(nav, tabs, location) {
	
	//Ti.API.log(location);
	var cancelButton = Titanium.UI.createButton({
		title : 'Cancel',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	var page = Ti.UI.createWindow({
		title : 'Add Deal',
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
	})
	
	
	// add the form to the page
	var dealForm = require('libs/forms');
	var dealFields = [
		{title : 'Title:', type : 'text', id : 'title'},
		{title : 'Save Deal', type : 'submit', id : 'createDeal'}		
	];
	
	var dealForm = dealForm.createForm({
		style : dealForm.STYLE_LABEL,
		fields : dealFields,
		width : 'auto'
	});
	
	dealForm.addEventListener('createDeal', function(e) {
		Ti.API.log(e);
		alert('saving deal');
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