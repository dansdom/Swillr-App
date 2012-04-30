
// this script creates the default layouts for the tabgroup
exports.DefaultViews = function(windows, nav, tabs) {
	// get the rquest object
	var Request = require('libs/httpRequest').HttpRequest;
	var venuesLookup = 'http://swillr.com/venues/lookup/day.json';
		
	getVenueData = function(data) {
		
		makeMapView = function(position) {
			var map = require('views/map/map').Map;
			windows.map.add(new map(nav, tabs, position, data));
		};
		
		//Ti.API.log('making the map ..');
		var Geo = require('libs/geolocation').Geo;
		var geo = Geo(makeMapView);
	
		var venueList = require('views/venues/venueList').VenueList;
		windows.venues.add(new venueList(nav, tabs, data));
		
		Ti.API.log('did window build');
	};
	var venueData = new Request('GET', venuesLookup, getVenueData);
	
};