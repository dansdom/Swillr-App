// Swillr Mobile App


// deep brown: #1E0B02
// medium brown : #561F06
// dark blue: #063D56
// medium blue : #096590
// very light color : #F4DDD2

// Facebook app ID: 382696298430425
Ti.Facebook.appid = "382696298430425";
Titanium.Facebook.permissions = ["publish_stream", "email", "offline_access", "user_interests", "user_birthday", "user_activities", "user_hometown", "user_location", "user_relationships", "user_relationship_details", "friends_location", "friends_birthday", "friends_hometown", "friends_relationships", "friends_relationship_details", "publish_actions"];
// hide the status bar
if (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad') {
	Ti.UI.iPhone.statusBarHidden = true;
}
	
// the app goes into a self running closure - be gone global vars!
(function() {
	
	// call the push notifications module
	var platform = Ti.Platform.name;
	if (platform != 'android') {
	  var Apns = require('libs/pushNotifications').Apns;
	  var apns = new Apns();
	}
	
	// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	Ti.UI.setBackgroundColor('#090300');
	
	// define the main windows for the applications and their navGroup pages
	var Windows = require('ui/windows').Windows;
	var windows = new Windows();
	
	// create the navigation groups
	var Nav = require('ui/nav').Nav;
	var nav = new Nav(windows);
	
	// define the tabs that control these pages
	var Tabs = require('ui/tabs').Tabs;
	var tabs = new Tabs(windows, nav);
	
	// add the first level of content for the 3 navigation windows
	// each module returns a view, 
	// and then will add new pages to the navigational group as required
	// wrapping this in a function I can call when login happens 
	var DefaultViews = require('ui/addDefaultViews').DefaultViews;
	new DefaultViews(windows, nav, tabs);
	
	// make the login page and then open it
	var LoginPage = require('views/login/login').LoginPage;
	// I need to test whether the user is logged in or not
	
	var isLoggedIn = Ti.Facebook.getLoggedIn();
	if (isLoggedIn == true) {
					
		// create the default views
		//new DefaultViews(windows, nav, tabs);
	} 
	else {
		windows.login.add(new LoginPage);
		windows.login.open();
	}
	
	
	// *** global event handling ***
	// Facebook Login: close login screen and open tabGroup
	Ti.Facebook.addEventListener('login', function(e) {
	    if (e.success) {
	    	//Ti.API.log(e);
	    	// make a call to the API to tell it that the user has logged in.
	    	//var tokenUrl = 'http://staging.flikgift.com/api/login/token:' + e.uid + '.json';
	    	//Ti.API.log(tokenUrl);
	    	//var tokenData = new Request('GET', tokenUrl);
			
	    	// I'd like to do the geolocation here before moving on to the flik tab
			var Geo = require('libs/geolocation').Geo;
			var geo = Geo(tabs, windows);
			// create the default views
			//new DefaultViews(windows, nav, tabs);
	       
	    } else if (e.error) {
	        alert("there was an error logging in: " + e.error);
	    } else if (e.cancelled) {
	        alert("You must login to access this app");
	    }
	});
	
	// I will probably need functions for the other 2 windows at some point too
	// this event empties the flik window stack when the flik tab is opened
	Ti.App.addEventListener('app:login', function() {
		// cycle through the stack and close all the windows
		Ti.API.log('logging in');
		
		windows.login.close();
		//new DefaultViews(windows, nav, tabs);
		tabs.tabGroup.open();
	});
	
})();
// end of app code :P