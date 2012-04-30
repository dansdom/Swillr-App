// this script creates the information box popup
exports.InfoButton = function() {
	
	// create the right buttons for the root windows
	var infoButton = Titanium.UI.createButton({
		title : 'info',
		style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	var message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum blandit sapien id nulla elementum ultricies.\n\nCras molestie dictum lectus, et facilisis urna congue id? Aenean eu quam a tortor accumsan rutrum?\n\nDuis suscipit auctor hendrerit. Phasellus dapibus, urna ac facilisis luctus, lacus libero pretium nisi, vitae imperdiet erat dolor eu est. Donec porta nibh eu lorem hendrerit commodo. Nulla vel molestie ipsum. Etiam suscipit tellus eget purus ornare ac iaculis nibh pharetra. Phasellus eget turpis non sapien vehicula suscipit? Quisque in massa orci.';
	
	infoButton.addEventListener('click', function(e) {
		var dialog = Ti.UI.createAlertDialog({
		    cancel: 0,
		    buttonNames: ['O.K.'],
		    message: message,
		    title: 'information'
		  }).show();
	});
	// return the button
	return infoButton;
};