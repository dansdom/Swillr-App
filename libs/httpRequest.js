//  Geolocation module
// http://screencasts.org/topics.json
exports.HttpRequest = function(type, url, data, callback, args) {
	
	//Ti.API.log(type + ', ' + url + ', ' + callback + ', ' + args);
	
	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			//Ti.API.log('http request success');
			//Ti.API.info(this.responseText.length);
			if (this.responseText.length > 1) {
				var responseData = JSON.parse(this.responseText);
			} 
			// do call back function here
			//Ti.API.log('about to do callback');
			callback(responseData, args);
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			//Ti.API.debug(e.error);
			alert('there was an error getting the data from the server. url: ' + url);
			// just sending back a false value, then I can do stuff back on the page view if I need to.
			callback(false);
		},
		timeout : 60000  /* in milliseconds */
	});
	
	// Prepare the connection.
	client.open(type, url);
	// This sends the user agent data back to the server
	client.setRequestHeader('User-Agent', Ti.userAgent);
	
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