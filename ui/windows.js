// this script creates the login and windows for the main screen, 
// as well as the navigational screens that are their containers
exports.Windows = function() {
	
	// info button with popup box
	var InfoButton = require('ui/infoButton').InfoButton;
	var infoButton = new InfoButton();
	
	var addButton = Titanium.UI.createButton({
		title : 'Add',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	// include the titleControl script
	//var TitleStyle = require('ui/titleStyle').TitleControl;
	
	var windows = {
		login :  Ti.UI.createWindow({  
		    title : 'Login',
		    backgroundImage : 'img/bg.png',
		    backgroundRepeat : true,
		    width : '100%'		    
		}),
		navWindowMap : Ti.UI.createWindow({ 
			navBarHidden : true, 
		    title : 'map',
		    backgroundImage : 'im/bg.png',
		    backgroundRepeat : true
		}),
		navWindowVenues : Ti.UI.createWindow({
			navBarHidden : true,  
		    title : 'venues',
		    backgroundImage : 'im/bg.png',
		    backgroundRepeat : true
		}),
		map : Ti.UI.createWindow({
			title : 'Happy Hour Map', 
			rightNavButton : infoButton,
			barColor: '#1E0B02'
			//titleControl : new TitleStyle('Happy Hour Map')
		}),
		venues : Ti.UI.createWindow({
			title : 'Venues',
			rightNavButton : addButton,
			barColor: '#1E0B02'
			//titleControl : new TitleStyle('Venues')
		})
	};
	// return the default windows
	return windows;
};