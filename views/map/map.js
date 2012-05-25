// login page
exports.Map = function(nav, tabs, geo, data) {
	
	//Ti.API.log(geo);
	//Ti.API.log(data.venues);
	//geo.latitude = -33.88583526611328;
	//geo.longitude = 151.214178466797;
	
	
	mapView = Titanium.Map.createView({
		top : 0,
		left : 0,
		height : '100%',
		width : '100%',
		mapType : Titanium.Map.STANDARD_TYPE,
		region : {latitude : geo.latitude, longitude : geo.longitude, latitudeDelta : 0.002, longitudeDelta : 0.002},
		animate : true,
		regionFit : true,
		userLocation : true
	});
	
	constructPin = function(venue) {
		// get the image type
		var eventLength = venue.events.length - 1;
		//Ti.API.log(venue.events[eventLength]);
		var imageType;
		switch (venue.events[eventLength].pin)
		{
			case 'emptyBeer':
				imageType = 'img/pin/beer-empty.png';
				break;
			case 'dregsBeer':
				imageType = 'img/pin/beer-dregs.png';
				break;
			case 'halfBeer':
				imageType = 'img/pin/beer-half.png';
				break;
			case 'fullBeer':
				imageType = 'img/pin/beer-full.png';
				break;
			default :
				imageType = 'img/pin/beer-full.png';	
		}
		
		var pin = Titanium.Map.createAnnotation({
			latitude : venue.latitude,
			longitude : venue.longitude,
			title : venue.title,
			subtitle : venue.address,
			pincolor : Titanium.Map.ANNOTATION_BLUE,
			image : imageType,
			animate : false,
			rightButton : Titanium.UI.iPhone.SystemButton.DISCLOSURE,
			myid : venue.id // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
		});
		
		// add event handling for the pin
		pin.addEventListener('click', function(e) {
			if (e.clicksource == 'rightButton')
			{
				e.map.deselectAnnotation(e.annotation);
				Ti.API.log(e);
				var Place = require('views/map/place').Place;
				var place = new Place(nav, tabs, venue);
				nav.map.open(place);
				nav.mapWindowStack.push(place);	
				
				// create a new page and display the information in it
			}
		});
		return pin;
	};
	
	addPins = function(data) {
				
		var venues = data.venues;
		var venueLength = data.venues.length;
		var pins = [];
		// construct the pins and them add them to the map
		for (var i = 0; i < venueLength; i++)
		{
			var pin = constructPin(venues[i]);
			pins.push(pin);
		}
		
		// add the pins to the map
		mapView.addAnnotations(pins);
	};
	
	addPins(data);
	
	var Geo = require('libs/geolocation').Geo;
	geo = Geo();
	var updateUserPosition = function(position) {
		if (position) {
			mapView.setLocation({latitude: position.latitude, longitude:position.longitude});
		}
	};
	
	Ti.App.addEventListener('app:update.map', function(){
		// this function rebuilds the map
		Ti.API.log('making map');
		// remove all the pins on the map
		mapView.removeAllAnnotations();
		// get the new pins
		var Request = require('libs/httpRequest').HttpRequest;
		var venuesToday = 'http://swillr.com/venues/lookup/day.json';
		var dataToday = new Request('GET', venuesToday, null, addPins);
	});
	
	/*
	Ti.Geolocation.addEventListener('location', function(){
    	//geo = Geo();
    	Ti.API.log(Ti.Geolocation.accuracy);
	});
	*/
	
	Ti.App.addEventListener('app:center.map', function(){
		Ti.API.log('centering map');
		var coords = Geo(updateUserPosition);
	});
		
	// return the view of the page
	return mapView;
};