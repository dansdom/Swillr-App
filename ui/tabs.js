// this script creates the tabs for the main screen. 
// each tab has a navWindow assigned to control the navigational structure
exports.Tabs = function(windows, nav) {
	
	// define the tabs for the tab group
	var tabs = {
		map : Ti.UI.createTab({  
		    icon : 'img/light/light_locate.png',
		    title : 'Map',
		    window : windows.navWindowMap
		}),
		venues : Ti.UI.createTab({  
		    icon : 'img/light/light_list.png',
		    title : 'Venues',
		    window : windows.navWindowVenues
		}),
		// create tab group
		tabGroup : Ti.UI.createTabGroup(),
		addTabEvents : function() {
			this.tabGroup.addEventListener('focus', function(e) {
				
				//Ti.API.log(e.index);
				// kill the flik stack
				//var KillFlik = require('ui/killStack').flikStack;
				//var killFlik = new KillFlik(nav);
				
				/*
				// this appears to be a nice little 'dirty' hack for android, 
				// I may implement this later if the above code doesn't work on android
				setTimeout(function() {
					Ti.API.log('clicked on a tab');
					Ti.API.log(tabs.tabGroup.activeTab.title);
				}, 100);
				*/				
			});
		},
		addTabs : function() {
			this.tabGroup.addTab(this.map);  
			this.tabGroup.addTab(this.venues);	
			this.tabGroup.setActiveTab(this.map);	
			this.addTabEvents();		
		}
	};	
	
	// add the tabs to the tabGroup
	tabs.addTabs();
	// return the tabs
	return tabs;
};