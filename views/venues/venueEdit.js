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
		barColor: '#000',
		backgroundColor : '#ddd'
	});
	
	var pageView = Ti.UI.createScrollView({
		layout : 'vertical',
		contentWidth: 'auto',
  		contentHeight: 'auto',
  		showVerticalScrollIndicator: true,
  		height : '100%',
  		width : '100%',	
		backgroundColor : '#ccc'
	})
	
	var place = {
		view : Ti.UI.createView({
			layout : 'vertical',
			width : '100%',
			height : 'auto',
			top : '10dp',
			bottom : '10dp'
		}),
		titleLabel : Ti.UI.createLabel({
			text : 'Title:',
			height : 'auto',
			width : '100%',
			textAlign : 'left'
		}),
		titleField : Ti.UI.createTextField({
        	color : '#336699',
        	height : 30,
        	top : 5,
        	bottom : 5,
        	left : 0,
        	width : 250,
        	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		}),
		addressLabel : Ti.UI.createLabel({
			text : 'Address:',
			height : 'auto',
			width : '100%',
			textAlign : 'left'
		}),
		addressField : Ti.UI.createTextArea({
        	color : '#336699',
        	height : 60,
        	top : 5,
        	bottom : 5,
        	left : 0,
        	width : 250,
        	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		}),
		suburbLabel : Ti.UI.createLabel({
			text : 'Suburb:',
			height : 'auto',
			width : '100%',
			textAlign : 'left'
		}),
		suburbField : Ti.UI.createTextField({
        	color : '#336699',
        	height : 30,
        	top : 5,
        	bottom : 5,
        	left : 0,
        	width : 250,
        	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		}),
		stateLabel : Ti.UI.createLabel({
			text : 'State:',
			height : 'auto',
			width : '100%',
			textAlign : 'left'
		}),
		stateField : Ti.UI.createTextField({
        	color : '#336699',
        	height : 30,
        	top : 5,
        	bottom : 5,
        	left : 0,
        	width : 250,
        	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		}),
		createView : function() {
			this.view.add(this.titleLabel);
			this.view.add(this.titleField);
			this.view.add(this.addressLabel);
			this.view.add(this.addressField);
			this.view.add(this.suburbLabel);
			this.view.add(this.suburbField);
			this.view.add(this.stateLabel);
			this.view.add(this.stateField);
		}
	};
	place.createView();
	// add the view to the page
	pageView.add(place.view);
	
	
	// add new event button
	var saveBtn = Ti.UI.createButton({
		title : 'Update Venue',
		left : '10dp',
		right : '10dp',
		top : '20dp',
		bottom : '20dp',
		height : '40dp'
	});
	pageView.add(saveBtn);
	
	// button event listeners
	cancelButton.addEventListener('click', function() {
		// cancel the edit action and remove it from the stack
		nav.venuesWindowStack.pop(page);
		nav.venues.close(page);
	});
	
	saveBtn.addEventListener('click', function() {
		Ti.API.log('do save action here');
	});
	
	page.add(pageView);
	// return the page
	return page;
	
};