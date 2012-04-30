//  Geolocation module
// http://screencasts.org/topics.json
exports.HttpRequest = function(type, url, callback, args) {
	
	//Ti.API.log(type + ', ' + url + ', ' + callback + ', ' + args);
	
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			//Ti.API.log('http request success');
			//Ti.API.info("Received text: " + this.responseText);
			var data = JSON.parse(this.responseText);
			// do call back function here
			callback(data, args);
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			//Ti.API.debug(e.error);
			alert('there was an error getting the data from the server. url: ' + url);
		},
		timeout : 10000  /* in milliseconds */
	});
	
	// Prepare the connection.
	client.open(type, url);
	
	// I will need to set the request header here if I need it
	
	// Send the request.
	client.send();
};