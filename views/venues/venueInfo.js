// mopdule that generates the friends list
exports.VenueInfo = function(nav, tabs, location) {
	
	//Ti.API.log(location);
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
		barColor: '#1E0B02',
		backgroundImage : 'img/bg2.png',
		backgroundRepeat : true
	});
	
	var pageView = Ti.UI.createScrollView({
		layout : 'vertical',
		contentWidth: 'auto',
  		contentHeight: 'auto',
  		showVerticalScrollIndicator: true,
  		height : '100%',
  		width : '100%'
	})
	
	var place = {
		view : Ti.UI.createView({
			layout : 'vertical',
			width : '100%',
			height : 'auto',
			top : '5dp',
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
			var editBtn = Ti.UI.createButton({
				title : 'EDIT EVENT',
					width : '80dp',
					height : '20dp',
					top : '0dp',
					bottom : '3dp',
					right : '15dp',
					style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
					backgroundGradient: {
						type:'linear', 
						colors:[
							{color : '#C8B9B2', offset : 0},
							{color : '#7A5542', offset : 0.4},
							{color : '#7A5542', offset : 0.6}
					]},
					borderWidth : 1,
					borderColor : '#561F06',
					color : '#fff',
					borderRadius : '7dp',
					font : {fontSize : 10, fontWeight : 'bold'}
			});
			editBtn.addEventListener('click', function() {
				var EditEvent = require('views/venues/editEvent').EditEvent;
				var editEvent = new EditEvent(eventInfo);
				nav.venuesWindowStack.push(editEvent);
				nav.venues.open(editEvent);
			});
			pageView.add(editBtn);
			//Ti.API.log(eventInfo);
			var locationEvent = {
				view : Ti.UI.createView({
					layout : 'vertical',
					height : 'auto',
					//width : 'auto',
					backgroundColor : '#f8f8f8',
					top : '0dp',
					bottom : '10dp',
					left : '10dp',
					right : '10dp',
					borderRadius : '10dp',
					borderWidth : 1,
					borderColor : '#c8c8c8',
				}),
				timeView : Ti.UI.createView({
					layout : 'absolute',
					height : 'auto',
					width : '100%',
					left : 0,
					right : 0,
					top : '10dp',
					bottom : '0dp'
				}),
				hoursView : Ti.UI.createView({
					layout : 'horizontal',
					height : 'auto',
					width : 'auto',
					right : '10dp'					
				}),
				day : Ti.UI.createLabel({
					text : eventInfo.day + ' : ',
					height : 'auto',
					width : 'auto',
					left : '10dp',
					font : {fontWeight : 'bold', fontSize : 16}
				}),
				start : Ti.UI.createLabel({
					text : eventInfo.start,
					height : 'auto',
					width : 'auto',
					font : {fontFamily : 'News Cycle', fontSize : 15}
				}),
				end : Ti.UI.createLabel({
					text : eventInfo.end,
					height : 'auto',
					width : 'auto',
					font : {fontFamily : 'News Cycle', fontSize : 15}
				}),
				dash : Ti.UI.createLabel({
					text : ' - ',
					height : 'auto',
					width : 'auto',
					font : {fontFamily : 'News Cycle', fontSize : 15}
				}),
				addDealBtn : Ti.UI.createButton({
					title : 'ADD DEAL',
					width : '80dp',
					height : '20dp',
					top : '5dp',
					bottom : '10dp',
					left : '10dp',
					style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
					backgroundGradient: {
						type:'linear', 
						colors:[
							{color : '#C8B9B2', offset : 0},
							{color : '#7A5542', offset : 0.4},
							{color : '#7A5542', offset : 0.6}
					]},
					borderWidth : 1,
					borderColor : '#561F06',
					color : '#fff',
					borderRadius : '7dp',
					font : {fontSize : 10, fontWeight : 'bold'}
				}),
				createView : function() {
					this.timeView.add(this.day);
					this.hoursView.add(this.start);
					this.hoursView.add(this.dash);
					this.hoursView.add(this.end);
					this.timeView.add(this.hoursView);
					this.view.add(this.timeView);
					for (var j = 0; j < eventInfo.deals.length; j++)
					{
						Ti.API.log(eventInfo.deals[j]);
						var dealView = Ti.UI.createView({
							layout : 'absolute',
							height : '20dp',
							top : '6dp',
							bottom : '6dp',
							width : '100%'
						});
						var dealInfo = Ti.UI.createLabel({
							text : eventInfo.deals[j],
							height : '20dp',
							width : 'auto',
							left : '10dp',
							font : {fontFamily : 'News Cycle', fontSize : 16}
						});
						var removeBtn = Ti.UI.createButton({
							title : 'X',
							height : '24dp',							
							width : '24dp',
							top : '0dp',
							//left : '30dp',
							right : '10dp',
							style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
							backgroundGradient: {
								type:'linear', 
								colors:[
									{color : '#C8B9B2', offset : 0},
									{color : '#7A5542', offset : 0.4},
									{color : '#7A5542', offset : 0.6}
							]},
							borderWidth : 1,
							borderColor : '#561F06',
							color : '#fff',
							borderRadius : '7dp',
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
	// get the button code
	var Btn = require('ui/btn').Btn;
	
	addBtnEvent = function() {
		var AddEvent = require('views/venues/addEvent').AddEvent;
		var addEvent = new AddEvent(nav, tabs, location);
		nav.venuesWindowStack.push(addEvent);
		nav.venues.open(addEvent);
	};
	var addBtn = new Btn('add new event', addBtnEvent);
	pageView.add(addBtn.view);
	
	saveBtnEvent = function() {
		// I need to put a confirmation box in and then post some data
		var SaveEvent = require('libs/saveEvent').SaveEvent;
		new SaveEvent(location);
	};
	var saveBtn = new Btn('save venue', saveBtnEvent);
	pageView.add(saveBtn.view);
	
	
	page.add(pageView);
	
	// return the page
	return page;
	
};