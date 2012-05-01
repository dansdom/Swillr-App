// this script creates a text box where you send send your friend a message
exports.TitleControl = function(text) {
	
	// create the label
	var titleLabel = Titanium.UI.createLabel({
	    text : text,
	    textAlign : 'center',
	    font : {fontFamily : 'News Cycle', fontSize : 20, fontWeight : 'bold'},
	    color : '#fff',
	    shadowColor : '#ccc',
	    shadowOffset : {x : 0, y : 0}
	});
	var titleView = Ti.UI.createView({
		height : 30,
	    width : 200,
	    top : 0
	});
	titleView.add(titleLabel);
	// return the titleControl
	//Ti.API.log('adding view');
	return titleView;
};

