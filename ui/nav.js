// this script creates the nav groups for the main 3 screens, 
// and then adds them to the navigational windows
exports.Nav = function(windows) {

	// define the tabs for the tab group
	var nav = {
		map : Ti.UI.iPhone.createNavigationGroup({
			// the window defined here should be the sub windows for the group - not the nav window
		    window : windows.map
		}),
		venues : Ti.UI.iPhone.createNavigationGroup({
			// the window defined here should be the sub windows for the group - not the nav window
		    window : windows.venues
		}),
		// I need to keep track of this navigation stack manually
		// not using friends or gifts now, but will probably need them later
		venuesWindowStack : [],
		mapWindowStack : []
	};
	
	windows.navWindowMap.add(nav.map);
	windows.navWindowVenues.add(nav.venues); 
	// return the nav
	return nav;
};