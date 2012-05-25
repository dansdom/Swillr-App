// this script kills the navigation stacks for each tabGroup

// kill the 'venues' stack
exports.venueStack = function(nav) {
	
	if (nav.venuesWindowStack.length > 0) {
		var stackIndex = nav.venuesWindowStack.length;
		while (stackIndex > 0) {
			stackIndex--;
			Ti.API.log(stackIndex);
			Ti.API.log(nav.venues);
			Ti.API.log(nav.venuesWindowStack);
			//nav.venues.close(nav.venuesWindowStack[i]);
			nav.venues.close(nav.venuesWindowStack[stackIndex]);
			//nav.venuesWindowStack.pop();
			
		};
		nav.venuesWindowStack = [];
	}
};

exports.venueRedrawStack = function(nav) {
	
	if (nav.venuesWindowStack.length > 0) {
		var stackIndex = nav.venuesWindowStack.length - 1;
		while (stackIndex > 1) {
			
			Ti.API.log(stackIndex);
			Ti.API.log(nav.venues);
			Ti.API.log(nav.venuesWindowStack);
			//nav.venues.close(nav.venuesWindowStack[i]);
			nav.venues.close(nav.venuesWindowStack[stackIndex]);
			//nav.venuesWindowStack.pop();
			stackIndex--;
		};
		nav.venuesWindowStack = [];
	}
};

/*
	// if I want to simulate the back button functionality
	var lastWindow = nav.venuesWindowStack.length - 1;
	// take the last window off the stack
	nav.venues.close(nav.venuesWindowStack[lastWindow])
	nav.venuesWindowStack.pop(nav.venuesWindowStack[lastWindow]);
*/