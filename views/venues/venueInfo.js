// mopdule that generates the friends list
exports.VenueInfo = function(nav, tabs, location) {
	
	// remove all windows in the nav group
	
	
	Ti.API.log('building out the location');
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
	
	var backButton = Ti.UI.createButton({
		title : 'Venues',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	backButton.addEventListener('click', function() {
		// this is where the stack gets it ^^
		Ti.API.log('clicked the back button');
		//return false;
		var VenueList = require('ui/killStack').venueStack;
		var venueList = new VenueList(nav);
	});
	
	var page = Ti.UI.createWindow({
		title : 'Venue Info',
		leftNavButton : backButton,
		rightNavButton : editButton,
		barColor: '#1E0B02',
		backgroundImage : 'img/bg2.png',
		backgroundRepeat : true
	});
	
	var tableView = Ti.UI.createTableView({
		data : [],
		style: Ti.UI.iPhone.TableViewStyle.GROUPED,
		backgroundColor : 'transparent',
		separatorColor : '#ccc',
		left : '5dp',
		right : '5dp',
		top : '0dp',
		bottom : '0dp'
	});
	
	var tableData = [];
	
	var locationHeader = Ti.UI.createTableViewSection({
		height : '40dp'
	});
	
	locationHeader.headerView = Ti.UI.createView({
		layout : 'vertical',
		width : '100%',
		height : 'auto',
		top : '0dp',
		bottom : '0dp'
	});
	
	if (location) {
		var locationTitle = {
			title : Ti.UI.createLabel({
				text : location.title,
				height : 'auto',
				width : 'auto',
				top : 0,
				bottom: 0,
				font : {fontFamily : 'News Cycle', fontSize : 22},
				shadowColor : '#fff',
				shadowOffset : {x:0,y:1}
			}),
			address : Ti.UI.createLabel({
				text : location.address + ', ' + location.suburb,
				height : 'auto',
				width : 'auto',
				top : '-8dp',
				font : {fontFamily : 'News Cycle', fontSize : 14}
			}),
			createView : function() {
				locationHeader.headerView.add(this.title);
				locationHeader.headerView.add(this.address);
			}
		};
		locationTitle.createView();
		// add the view to the page
		tableData.push(locationHeader);
	
	
		// add each of the evnts for the place
		if (location.events)
		{
			for (var i = 0; i < location.events.length; i++)
			{
				var eventInfo = location.events[i];
				//Ti.API.log(eventInfo);
				// create the table view
				var eventSection = Ti.UI.createTableViewSection({
					borderRadius : '20dp',
					top : 0,
					bottom : 0,
					borderWidth : 1,
					borderColor : '#ccc',
					sectionIndex : i
				});
				
				// add the event header row
				var eventHeader = Ti.UI.createTableViewRow({
					//hasChild : true,
					className : 'event',
					eventData : eventInfo,
					height : 38,
					title : '',
					color : '#000',
					backgroundColor : '#fff',
					selectedBackgroundColor : '#C8B9B2'
				});
				var eventHeaderView = {
					view : Ti.UI.createView({
						layout : 'absolute',
						height : 38
					}),
					day : Ti.UI.createLabel({
						text : eventInfo.day + ' : ',
						height : 38,
						left : '10dp',
						font : {fontSize : 18}
					}),
					timeSlot : Ti.UI.createLabel({
						text : eventInfo.start + ' - ' + eventInfo.end,
						height : 38,
						right : '45dp',
						font : {fontFamily : 'News Cycle', fontSize : 15}
					}),
					rightButton : Ti.UI.createButton({
						style:Titanium.UI.iPhone.SystemButton.DISCLOSURE,
						right : '5dp'
					}),
					createView : function(eventInfo, index) {
						this.view.add(this.day);
						this.view.add(this.timeSlot);
						this.view.add(this.rightButton);
						this.view.addEventListener('click', function() {
							// need to fill these forms out
							var EditEvent = require('views/venues/editEvent').EditEvent;
							var editEvent = new EditEvent(nav, tabs, eventInfo, location, index);
							nav.venuesWindowStack.push(editEvent);
							nav.venues.open(editEvent);
						});	
					}
				};
				eventHeaderView.createView(eventInfo, i);
				eventHeader.add(eventHeaderView.view)
				eventSection.add(eventHeader);
				
				// cycle through the events and list each one of them
				if (eventInfo.deals) {
					for (var j = 0; j < eventInfo.deals.length; j++)
					{
						var deal = eventInfo.deals[j];
						// event info row
						//Ti.API.log(deal);
						var dealInfo = Ti.UI.createTableViewRow({
							className : 'event',
							dealData : deal,
							dealIndex : j,
							height : 38,
							title : '',
							color : '#000',
							backgroundColor : '#fff',
							selectedBackgroundColor : '#C8B9B2',
							editable : true
						});
						dealView = {
							view : Ti.UI.createLabel({
								layout : 'absolute',
								//height : 30,
								left : 0,
								height : 38
							}),
							desc : Ti.UI.createLabel({
								text : deal,
								height : 38,
								width : '100%',
								left : '10dp',
								textAlign : 'left',
								font : {fontFamily : 'News Cycle', fontSize : 16}
							}),
							createView : function(deal, eventIndex, dealIndex) {
								Ti.API.log(deal);
								Ti.API.log('I am adding a deal');
								this.view.add(this.desc);
								this.view.addEventListener('click', function() {
									// need to fill these forms out
									var EditDeal = require('views/venues/editDeal').EditDeal;
									var editDeal = new EditDeal(nav, tabs, deal, location, eventIndex, dealIndex);
									nav.venuesWindowStack.push(editDeal);
									nav.venues.open(editDeal);
								});
							}
						};
						dealView.createView(deal, i, j);
						dealInfo.add(dealView.view);
						eventSection.add(dealInfo);
					};
				}
				
				// add deal row
				var addDeal = Ti.UI.createTableViewRow({
					
					className : 'event',
					venueData : eventInfo,
					height : 38,
					title : '',
					backgroundColor : '#fff',
					selectedBackgroundColor : '#C8B9B2'
				});
				
				var addDealView = {
					view : Ti.UI.createView({
						layout : 'absolute'
					}),
					addLabel : Ti.UI.createLabel({
						text : 'Add Deal',
						height : 38,
						left : '10dp',
						font : {fontFamily : 'News Cycle', fontSize : 18},
						color : '#000'
					}),
					rightButton : Ti.UI.createButton({
						style:Titanium.UI.iPhone.SystemButton.CONTACT_ADD,
						right : '5dp'
					}),
					createView : function(index) {
						this.view.add(this.addLabel);
						this.view.add(this.rightButton);
						this.view.addEventListener('click', function() {
							// go to the add deal page
							var AddDeal = require('views/venues/addDeal').AddDeal;
							var addDeal = new AddDeal(nav, tabs, location, index);
							nav.venuesWindowStack.push(addDeal);
							nav.venues.open(addDeal);
						})
					}
				};
				addDealView.createView(i);
				addDeal.add(addDealView.view);
				eventSection.add(addDeal);
				//tableData.push(addDeal);
				tableData.push(eventSection);
			};
		}
	}
	
	var locationFooter = {
		section : Ti.UI.createTableViewSection({
			
		}),
		addBtn : Ti.UI.createTableViewRow({
			color : '#000',
			backgroundColor : '#fff',
			selectedBackgroundColor : '#C8B9B2'
		}),
		addBtnView : Ti.UI.createView({
			layout : 'absolute',
			height : '38dp'
		}),
		addBtnLabel : Ti.UI.createLabel({
			text : 'Add New Event'
		}),
		addBtnAction : Ti.UI.createButton({
			style:Titanium.UI.iPhone.SystemButton.CONTACT_ADD,
			right : '5dp'
		}),
		saveBtn : Ti.UI.createTableViewRow({
			color : '#000',
			backgroundColor : '#fff',
			selectedBackgroundColor : '#C8B9B2'
		}),
		saveBtnView : Ti.UI.createView({
			layout : 'absolute',
			height : '38dp'
		}),
		saveBtnLabel : Ti.UI.createLabel({
			text : 'Save event'
		}),
		saveBtnAction : Ti.UI.createButton({
			style:Titanium.UI.iPhone.SystemButton.CONTACT_ADD,
			right : '5dp'
		}),
		saveBtnView : Ti.UI.createView({
			layout : 'absolute',
			height : '38dp'
		}),
		createView : function() {
			this.addBtnView.add(this.addBtnLabel);
			this.addBtnView.add(this.addBtnAction);
			this.addBtn.add(this.addBtnView);
			this.saveBtnView.add(this.saveBtnLabel);
			this.saveBtnView.add(this.saveBtnAction);
			this.saveBtn.add(this.saveBtnView);
			this.section.add(this.addBtn);
			this.section.add(this.saveBtn);
			// add event listeners for both views
			this.addBtnView.addEventListener('click', function() {
				var AddEvent = require('views/venues/addEvent').AddEvent;
				var addEvent = new AddEvent(nav, tabs, location);
				nav.venuesWindowStack.push(addEvent);
				nav.venues.open(addEvent);
			});
			this.saveBtnView.addEventListener('click', function() {
				var SaveEvent = require('libs/saveEvent').SaveEvent;
				new SaveEvent(location);
			});
		}
	};
	locationFooter.createView();
	tableData.push(locationFooter.section);
	
	// delete event handling
	tableView.addEventListener('delete', function(e)
	{
		Titanium.API.info("row deleted = " + e.row.venueData +", index="+e.index+", event index="+e.section.sectionIndex+", e.source.index="+e.source.dealIndex);
		Ti.API.log(location);
		//do anything else you want to do, maybe you can permanently delete the row from your Database
		// modify the eventInfo object
		location.events[e.section.sectionIndex].deals.splice(e.source.dealIndex, 1);
		Ti.API.log(location);
	});
	
	// add the data to the table
	tableView.setData(tableData);
	
	// add event listener to update the location
	Ti.App.addEventListener('app:update.location', function(e) {
		Ti.API.log('the location has been updated');
		Ti.API.log(e);
		// need to call a function to redraw the location info
	});
	
	Ti.API.log('about to add the table to the page')
	page.add(tableView);
	
	// return the page
	return page;
	
};