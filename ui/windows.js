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
	var TitleStyle = require('ui/titleStyle').TitleControl;
	
	var windows = {
		login :  Ti.UI.createWindow({  
		    title : 'Login',
		    backgroundColor : '#eee',
		    width : '100%'		    
		}),
		navWindowMap : Ti.UI.createWindow({ 
			navBarHidden : true, 
		    title : 'map',
		    backgroundColor : 'red'
		}),
		navWindowVenues : Ti.UI.createWindow({
			navBarHidden : true,  
		    title : 'venues',
		    backgroundColor : 'green'
		}),
		map : Ti.UI.createWindow({
			title : 'Happy Hour Map', 
			rightNavButton : infoButton,
			barColor: '#000',
			backgroundColor : 'green',
			titleControl : new TitleStyle('Happy Hour Map')
		}),
		venues : Ti.UI.createWindow({
			title : 'Venues',
			rightNavButton : addButton,
			barColor: '#000',
			backgroundColor : 'blue',
			titleControl : new TitleStyle('Venues')
		})
	};
	// return the default windows
	return windows;
};