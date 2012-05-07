//  Geolocation module
// http://screencasts.org/topics.json
exports.HttpRequest = function(type, url, data, callback, args) {
	
	//Ti.API.log(type + ', ' + url + ', ' + callback + ', ' + args);
	
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			//Ti.API.log('http request success');
			//Ti.API.info("Received text: " + this.responseText);
			var responseData = JSON.parse(this.responseText);
			// do call back function here
			callback(responseData, args);
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			//Ti.API.debug(e.error);
			alert('there was an error getting the data from the server. url: ' + url);
		},
		timeout : 60000  /* in milliseconds */
	});
	
	Ti.API.log('is there any data?');
	
	// Prepare the connection.
	client.open(type, url);
	
	// I will need to set the request header here if I need it
	if (!data) {
		client.send();
	}
	else {
		// this is only sending JSON data for now. I'm not about to extend it to other data types
		// if you want to send encoded form data then be a man and construct your url
		client.setRequestHeader("Content-Type","application/json; charset=utf-8");
		client.send(data);
	}

	// Send the request.
};