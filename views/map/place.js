// login page
exports.Place = function(nav, tabs, location) {
	
	Ti.API.log(location);
	
	var page = Ti.UI.createWindow({
		title : 'The Deal',
		backButtonTitle : 'back',
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
	
	if (location.events)
	{
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
					borderWidth : 1,
					borderColor : '#c8c8c8',
					backgroundColor : '#f8f8f8',
					top : '0dp',
					bottom : '10dp',
					left : '10dp',
					right : '10dp',
					borderRadius : '10dp',
					font : {fontFamily : 'News Cycle', fontSize : 26}
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
				timeDesc : Ti.UI.createLabel({
					text : eventInfo.timeDescription,
					height : 'auto',
					width : 'auto',
					bottom : '10dp',
					top : '-7dp',
					left : '10dp',
					font : {fontFamily : 'News Cycle', fontSize : 14}
				}),
				divider : Ti.UI.createView({
					layout : 'vertical',
					height : '15dp',
					width : '100%'
				}),
				createView : function() {
					this.timeView.add(this.day);
					this.hoursView.add(this.start);
					this.hoursView.add(this.dash);
					this.hoursView.add(this.end);
					this.timeView.add(this.hoursView);
					this.view.add(this.timeView);
					this.view.add(this.timeDesc);
					for (var j = 0; j < eventInfo.deals.length; j++)
					{
						var dealInfo = Ti.UI.createLabel({
							text : eventInfo.deals[j],
							height : 'auto',
							width : 'auto',
							left : '10dp',
							font : {fontFamily : 'News Cycle', fontSize : 20}
						});
						this.view.add(dealInfo);
					};
					this.view.add(this.divider);
				}
			};
			locationEvent.createView();
			pageView.add(locationEvent.view);
			
			
		};
	}
	
	page.add(pageView);
	// return the page
	return page;
};