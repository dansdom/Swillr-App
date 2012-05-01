// mopdule that generates the friends list
exports.VenueInfo = function(nav, tabs, location) {
	
	Ti.API.log(location);
	
	var editButton = Titanium.UI.createButton({
		title : 'Edit Venue',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	editButton.addEventListener('click', function() {

		// go to the edit page
		var VenueEdit = require('views/venues/venueEdit').VenueEdit;
		var venueEdit = new VenueEdit(nav, tabs, location);
		nav.venuesWindowStack.push(venueEdit);
		nav.venues.open(venueEdit);
	});
	
	var page = Ti.UI.createWindow({
		title : 'Venue Info',
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
			top : '0dp',
			bottom : '10dp'
		}),
		title : Ti.UI.createLabel({
			text : location.title,
			height : 'auto',
			width : 'auto',
			font : {fontFamily : 'News Cycle', fontSize : 22}
		}),
		address : Ti.UI.createLabel({
			text : location.address,
			height : 'auto',
			width : 'auto',
			top : '-8dp',
			font : {fontFamily : 'News Cycle', fontSize : 14}
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
	if (location.events)
	{
		for (var i = 0; i < location.events.length; i++)
		{
			
			var eventInfo = location.events[i];
			//Ti.API.log(eventInfo);
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
				timeView : Ti.UI.createView({
					layout : 'horizontal',
					height : 'auto',
					width : '100%',
					left : '40dp',
					right : 0,
					top : '5dp',
					bottom : '0dp',
					font : {fontFamily : 'News Cycle', fontSize : 24}
				}),
				day : Ti.UI.createLabel({
					text : eventInfo.day + ' : ',
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
				dash : Ti.UI.createLabel({
					text : ' - ',
					height : 'auto',
					width : 'auto'
				}),
				addDealBtn : Ti.UI.createButton({
					title : 'Add Deal',
					//left : '50dp',
					//right : '50dp',
					width : '140dp',
					height : '25dp',
					top : '10dp',
					bottom : '10dp',
					left : '20dp'
				}),
				createView : function() {
					this.timeView.add(this.day);
					this.timeView.add(this.start);
					this.timeView.add(this.dash);
					this.timeView.add(this.end);
					this.view.add(this.timeView);
					for (var j = 0; j < eventInfo.deals.length; j++)
					{
						Ti.API.log(eventInfo.deals[j]);
						var dealView = Ti.UI.createView({
							layout : 'absolute',
							height : '15dp',
							top : '6dp',
							bottom : '6dp',
							width : '100%'
						});
						var dealInfo = Ti.UI.createLabel({
							text : eventInfo.deals[j],
							height : '20dp',
							width : 'auto',
							left : '20dp',
							font : {fontFamily : 'News Cycle', fontSize : 16}
						});
						var removeBtn = Ti.UI.createButton({
							title : 'X',
							height : '22dp',							
							width : '22dp',
							top : '0dp',
							//left : '30dp',
							right : '10dp',
							font : {fontWeight : 'bold'}
						});
						removeBtn.addEventListener('click', function() {
							alert('do you want to remove this event?');
						});
						dealView.add(dealInfo);
						dealView.add(removeBtn);
						this.view.add(dealView);					
					};
					this.view.add(this.addDealBtn);
					this.addDealBtn.addEventListener('click', function() {
						// go to the add deal page
						var AddDeal = require('views/venues/addDeal').AddDeal;
						var addDeal = new AddDeal(nav, tabs, location);
						nav.venuesWindowStack.push(addDeal);
						nav.venues.open(addDeal);
					});
				}
			};
			locationEvent.createView();
			pageView.add(locationEvent.view);
			
		};
	}
	
	// add new event button
	var addBtn = Ti.UI.createButton({
		title : 'add new event',
		left : '10dp',
		right : '10dp',
		top : '10dp',
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