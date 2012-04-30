// mopdule that generates the friends list
exports.VenueInfo = function(nav, tabs, location) {
	
	//Ti.API.log(location);
	
	var editButton = Titanium.UI.createButton({
		title : 'Edit Venue',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	editButton.addEventListener('click', function() {

		// go to the edit page
		//Ti.API.log(location);
		var VenueEdit = require('views/venues/venueEdit').VenueEdit;
		var venueEdit = new VenueEdit(nav, tabs, location);
		nav.venuesWindowStack.push(venueEdit);
		nav.venues.open(venueEdit);
	});
	
	var page = Ti.UI.createWindow({
		title : 'The Deal',
		backButtonTitle : 'back',
		rightNavButton : editButton,
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
		title : Ti.UI.createLabel({
			text : location.title,
			height : 'auto',
			width : 'auto'
		}),
		address : Ti.UI.createLabel({
			text : location.address,
			height : 'auto',
			width : 'auto'
		}),
		createView : function() {
			this.view.add(this.title);
			this.view.add(this.address);
		}
	};
	place.createView();
	// add the view to the page
	pageView.add(place.view);
	
	// add each of the evnts for the place
	for (var i = 0; i < location.events.length; i++)
	{
		
		var eventInfo = location.events[i];
		Ti.API.log(eventInfo);
		var locationEvent = {
			view : Ti.UI.createView({
				layout : 'vertical',
				height : 'auto',
				//width : 'auto',
				backgroundColor : '#fff',
				top : '0dp',
				bottom : '10dp',
				left : '10dp',
				right : '10dp',
				borderRadius : '10dp'
			}),
			day : Ti.UI.createLabel({
				text : eventInfo.day,
				height : 'auto',
				width : 'auto'
			}),
			start : Ti.UI.createLabel({
				text : eventInfo.start,
				height : 'auto',
				width : 'auto'
			}),
			end : Ti.UI.createLabel({
				text : eventInfo.end,
				height : 'auto',
				width : 'auto'
			}),
			timeDesc : Ti.UI.createLabel({
				text : eventInfo.timeDescription,
				height : 'auto',
				width : 'auto'
			}),
			createView : function() {
				this.view.add(this.day);
				this.view.add(this.start);
				this.view.add(this.end);
				this.view.add(this.timeDesc);
				for (var j = 0; j < eventInfo.deals.length; j++)
				{
					var dealInfo = Ti.UI.createLabel({
						text : eventInfo.deals[j],
						height : 'auto',
						width : 'auto'
					});
					this.view.add(dealInfo);
				};
			}
		};
		locationEvent.createView();
		pageView.add(locationEvent.view);
		
	};
	
	// add new event button
	var addBtn = Ti.UI.createButton({
		title : 'add new event',
		left : '10dp',
		right : '10dp',
		top : '20dp',
		bottom : '20dp',
		height : '40dp'
	});
	addBtn.addEventListener('click', function() {
		var AddEvent = require('views/venues/addEvent').AddEvent;
		var addEvent = new AddEvent(nav, tabs, location);
		nav.venuesWindowStack.push(addEvent);
		nav.venues.open(addEvent);
	});
	pageView.add(addBtn);
	
	page.add(pageView);
	// return the page
	return page;
	
};