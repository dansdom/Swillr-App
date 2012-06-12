// this script creates the login and windows for the main screen, 
// as well as the navigational screens that are their containers
exports.Windows = function() {
	
	// info button with popup box
	//var InfoButton = require('ui/infoButton').InfoButton;
	//var infoButton = new InfoButton();
	
	var addButton = Titanium.UI.createButton({
		title : 'Add Venue',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	addButton.addEventListener('click', function() {
		Ti.App.fireEvent('app:new.venue');
	});
	
	var locateBtn = Titanium.UI.createButton({
		title : '',
		height : '55dp',
		image : 'img/light_locate.png',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	locateBtn.addEventListener('click', function() {
		Ti.App.fireEvent('app:center.map');
	});
	
	var updateMapBtn = Titanium.UI.createButton({
		title : 'Update Times',
		height : '55dp',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	updateMapBtn.addEventListener('click', function() {
		Ti.App.fireEvent('app:update.map');
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
		    backgroundImage : 'img/bg2.png',
		    backgroundRepeat : true
		}),
		navWindowVenues : Ti.UI.createWindow({
			navBarHidden : true,  
		    title : 'venues',
		    backgroundImage : 'img/bg2.png',
		    backgroundRepeat : true
		}),
		map : Ti.UI.createWindow({
			title : 'Map', 
			rightNavButton : locateBtn,
			leftNavButton : updateMapBtn,
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