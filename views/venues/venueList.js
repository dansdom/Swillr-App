// mopdule that generates the friends list
exports.VenueList = function(nav, tabs, data) {

	// get the data for the friends
	//var list = require('data/contacts');
	//Ti.API.log('hitting venue list');
	//Ti.API.log(data.venues.length);
	// this is the search index that sits on the side of the page
	// index values are added for the first item of each letter which has the 'header' attribute
	var searchIndex = [];
		
	// the variable that holds the data for the table
	var tableData = [];
	var venueHeader;
	var indexCounter = 0;
	
	function addValueToIndex(letter, counter) {
		var indexItem = {'title' : letter, 'index' : counter};
		//Ti.API.log(indexItem);
		searchIndex.push(indexItem);
	};
	
	// data array to hold the sections of the table
	sectionData = [];
	
	//Ti.API.log(data.length);
	// cycle through the data and then create the item views for the venues
	for (var i = 0; i < data.venues.length; i++) {
		// get the first letter of each firstname
		Ti.API.log(data.venues[i]);
		var header = data.venues[i].title.charAt(0).toUpperCase();
		// if it's a new letter group, then add a header attribute and set the index on the searchIndex
		if (header != venueHeader) {
			var sectionNumber = indexCounter;
			// create a new section
			sectionData[sectionNumber] = Ti.UI.createTableViewSection({
				height : 'auto',
				width : 'auto',
				layout : 'vertical'
			});
			
			sectionData[sectionNumber].headerView = Ti.UI.createView({
				layout : 'absolute',
				backgroundColor : '#ddd',
				height : '22dp'
			});
			
			var topLine = Ti.UI.createView({
				height : '1dp',
				width : '100%',
				top : '0dp',
				backgroundColor : '#fff'
			});
			var headerLabel = Ti.UI.createLabel({
				text : header,
				backgroundColor : 'transparent',				
				color : '#fff',
				left : '10dp',
				height : 'auto',
				shadowColor : '#666',
				shadowOffset : {x:0, y:1},
				font : {fontWeight : 'bold', fontSize : '18dp', fontFamily : 'Helvetica Neue'}
			});
			var bottomLine = Ti.UI.createView({
				height : '1dp',
				width : '100%',
				bottom : '0dp',
				backgroundColor : '#c6c1b3'
			});
			
			sectionData[sectionNumber].headerView.add(topLine);
			sectionData[sectionNumber].headerView.add(headerLabel);
			sectionData[sectionNumber].headerView.add(bottomLine);
			
			indexCounter += 1;
			addValueToIndex(header, indexCounter);
			// assign this index to the searchIndex item
			venueHeader = header;
		}  // end of new section 'if' statement
		
		var venue = Ti.UI.createTableViewRow({
			hasChild : true,
			className : 'venue',
			venueData : data.venues[i],
			height : 50,
			title : '',
			fontSize : 24,
			color : '#000',
			backgroundColor : '#fff',
			selectedBackgroundColor : '#ddd'
		});

		// define the view for the list
		var venueView = {
			itemText : Ti.UI.createView({
				layout : 'vertical',
				width : 'auto',
				top : '0dp',
				left : '0dp',
				height : '50dp'
			}),
			from : Ti.UI.createLabel({
				text : data.venues[i].title,
				width : 'auto',
				height : 'auto',
				top : '10dp',
				left : '10dp',
				color : '#666',
				font : {fontWeight : 'bold', fontSize : '16dp', fontFamily : 'Museo'}
			}),
			message : Ti.UI.createLabel({
				text : data.venues[i].address,
				color : '#666',
				left : '10dp',
				top : '0dp',			
				font : {fontWeight : 'bold', fontSize : '12dp', fontFamily : 'Museo'},
				textAlign : 'left',
				width : 'auto',
				height : 'auto',
				backgroundColor : '#fff'
			}),
			view : Ti.UI.createView({
				layout : 'horizontal',
				height : 'auto',
				backgroundColor : '#fff'
			}),
			createView : function() {
				this.itemText.add(this.from);
				this.itemText.add(this.message);
				this.view.add(this.itemText);
			}
		};
		// create the view and then add it to the table
		venueView.createView();
		venue.add(venueView.view);
		sectionData[sectionNumber].add(venue);
	};
	
	// add search bar at the top of the page
	searchBar = Titanium.UI.createSearchBar({
		showCancel : false,
		hintText : 'Search for venues',
		barColor : '#dad6cc'
	});
	
	// note: 
	// 1. the filter attribute is what the search field will look at for each item
	// 2. the index is the defined list of items on the right hand side of the page
	tableView = Ti.UI.createTableView({
		data : [],
		search : searchBar,
		index : searchIndex,
		backgroundColor : 'transparent',
		filterAttribute: 'venueData',
		separatorColor : '#c6c1b3'
	});
	
	// add the data to the table
	tableView.setData(sectionData);
	
	// add event handling for the tableView
	tableView.addEventListener('click', function(e) {
		//Ti.API.log(e.row.friendData);
		// check whether it is a giftItem by checking the classname of the row
		if (e.row.className == 'venue') {
			
			// get the gifts data using the users facebook uid
			// this is the function that builds the page and then sorts out my stack
			var VenueInfo = require('views/venues/venueInfo').VenueInfo;
			var venueInfo = new VenueInfo(nav, tabs, e.row.venueData);
			nav.venuesWindowStack.push(venueInfo);
			nav.venues.open(venueInfo);
			
		}
		// friendTitle = e.row.friendData.title;
	});
	// return the table view
	return tableView;
};