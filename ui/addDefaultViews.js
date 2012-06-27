
// this script creates the default layouts for the tabgroup
exports.DefaultViews = function(windows, nav, tabs) {
	// get the rquest object
	var Request = require('libs/httpRequest').HttpRequest;
	var venuesToday = 'http://swillr.com/venues/lookup/day.json';
	var venuesAll = 'http://swillr.com/venues.json';
	
	
	getTodaysEvents = function(data) {
		makeMapView = function(position) {
			var map = require('views/map/map').Map;
			windows.map.add(new map(nav, tabs, position, data));
		};
		//Ti.API.log('making the map ..');
		// I need to put an alert to ask people for their location
		var Geo = require('libs/geolocation').Geo;
		var geo = Geo(makeMapView);
	};
	var dataToday = new Request('GET', venuesToday, null, getTodaysEvents);
	
	
	getAllVenues = function(data) {
		//Ti.API.log('got venues');
		var venueList = require('views/venues/venueList').VenueList;
		windows.venues.add(new venueList(nav, tabs, windows, data));
	};
	//Ti.API.log('about to get venue data');
	var dataAll = new Request('GET', venuesAll, null, getAllVenues);
	
};