// Get details from Facebook Graph Api
// note: I haven't tested this module yet. so it may need further development 
exports.FbDetails = function(url, args, callback) {
	
	var userDetails = null;
	var isLoggedIn = Ti.Facebook.getLoggedIn();
	
	if (isLoggedIn == true) {
		// get the users facebook details
		Ti.Facebook.requestWithGraphPath(Ti.Facebook.uid + '/' + url, args, 'GET', function(e) {
			if (e.success) {
				//Ti.API.log('success');
				//Ti.API.log(e);
				userDetails = e;
				// if there is a callback function then fire it
				if (typeof callback == 'function') {
					callback();
				}
			} else if (e.error) {
				//Ti.API.log(e.error);
			} else {
				//Ti.API.log('Unknown response');
			}
		});
	}
	else {
		// ask the user to log in
		Ti.Facebook.authorize();
	}
	
	// return the user details
	return userDetails;
};