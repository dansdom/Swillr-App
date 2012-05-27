// this script kills the navigation stacks for each tabGroup

// kill the 'venues' stack
exports.venueStack = function(nav) {
	
	if (nav.venuesWindowStack.length > 0) {
		//Ti.API.log('this is the stack');
		//Ti.API.log(nav.venuesWindowStack);
		for (var i = 0; i < nav.venuesWindowStack.length; i++) {
			nav.venues.close(nav.venuesWindowStack[i]);
			Ti.API.log(i);
		}
		// empty the stack object
		nav.venuesWindowStack = [];
		Ti.API.log('removed stack');
	}
};

exports.venueRedrawStack = function(nav) {
	
	if (nav.venuesWindowStack.length > 0) {
		//Ti.API.log('this is the stack');
		//Ti.API.log(nav.venuesWindowStack);
		for (var i = 1; i < nav.venuesWindowStack.length; i++) {
			nav.venues.close(nav.venuesWindowStack[i]);
			Ti.API.log(i);
		}
		// empty the stack object
		nav.venuesWindowStack = [nav.venuesWindowStack[0]];
		Ti.API.log('removed stack');
	}
};

/*
	// if I want to simulate the back button functionality
	var lastWindow = nav.venuesWindowStack.length - 1;
	// take the last window off the stack
	nav.venues.close(nav.venuesWindowStack[lastWindow])
	nav.venuesWindowStack.pop(nav.venuesWindowStack[lastWindow]);
*/