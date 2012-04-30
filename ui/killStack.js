// this script kills the navigation stacks for each tabGroup

// kill the 'flik' stack
exports.flikStack = function(nav) {

	if (nav.flikWindowStack.length > 0) {
		//Ti.API.log('this is the stack');
		//Ti.API.log(nav.flikWindowStack);
		for (var i = 0; i < nav.flikWindowStack.length; i++)
		{
			nav.flik.close(nav.flikWindowStack[i]);
		}
		// empty the stack object
		nav.flikWindowStack = [];
		//Ti.API.log('removing stack');
	}
	
};

// kill the 'gifts' stack
exports.giftsStack = function(nav) {

	if (nav.giftsWindowStack.length > 0) {
		//Ti.API.log('this is the stack');
		//Ti.API.log(nav.giftsWindowStack);
		for (var i = 0; i < nav.giftsWindowStack.length; i++)
		{
			nav.gifts.close(nav.giftsWindowStack[i]);
		}
		// empty the stack object
		nav.giftsWindowStack = [];
		//Ti.API.log('removing stack');
	}
	
};

// kill the 'friends' stack
exports.friendsStack = function(nav) {

	if (nav.friendsWindowStack.length > 0) {
		//Ti.API.log('this is the stack');
		//Ti.API.log(nav.friendsWindowStack);
		for (var i = 0; i < nav.friendsWindowStack.length; i++)
		{
			nav.friends.close(nav.friendsWindowStack[i]);
		}
		// empty the stack object
		nav.friendsWindowStack = [];
		//Ti.API.log('removing stack');
	}
	
};

/*
	// if I want to simulate the back button functionality
	var lastWindow = nav.flikWindowStack.length - 1;
	// take the last window off the stack
	nav.flik.close(nav.flikWindowStack[lastWindow])
	nav.flikWindowStack.pop(nav.flikWindowStack[lastWindow]);
*/