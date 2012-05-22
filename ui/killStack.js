// this script kills the navigation stacks for each tabGroup

// kill the 'venues' stack
exports.venueStack = function(nav) {
	
	if (nav.venuesWindowStack.length > 0) {
		var stackLength = nav.venuesWindowStack.length -1;
		while (stackLength >= 0) {
			//nav.venues.close(nav.venuesWindowStack[i]);
			nav.venues.close(nav.venuesWindowStack[stackLength])
			nav.venuesWindowStack.pop(nav.venuesWindowStack[stackLength]);
			stackLength--;
		};
	}
};

/*
	// if I want to simulate the back button functionality
	var lastWindow = nav.venuesWindowStack.length - 1;
	// take the last window off the stack
	nav.venues.close(nav.venuesWindowStack[lastWindow])
	nav.venuesWindowStack.pop(nav.venuesWindowStack[lastWindow]);
*/