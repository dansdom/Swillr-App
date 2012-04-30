//  Geolocation module
exports.Geo = function(callback) {
	
	Ti.API.log('getting geolocation');
	
	Ti.Geolocation.purpose = "GPS user coordinates";
	Ti.Geolocation.distanceFilter = 10; // set the granularity of the location event
 
	var coords = Ti.Geolocation.getCurrentPosition(function(e) {
		
		var position = {};  // this will hold the position coordinates
		//Ti.API.log('getting current position');
		
		if (!e.success || e.error) {
			// manage the error
			alert('Could not get your position. You need to allow location services so we can send you gift cards for your area.');
			position = false;  // return a false value
			return;
		}
		else {
			position.longitude = e.coords.longitude;
			position.latitude = e.coords.latitude;
			position.altitude = e.coords.altitude;
			position.heading = e.coords.heading;
			position.accuracy = e.coords.accuracy;
			position.speed = e.coords.speed;
			position.timestamp = e.coords.timestamp;
			position.altitudeAccuracy = e.coords.altitudeAccuracy;
			// we use the above data the way we need it
			//openApp(position);
		}
		//Ti.API.log(position);
		callback(position);
		
	});
	
};