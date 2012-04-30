// this script creates a text box where you send send your friend a message
exports.TextBox = function() {
	
	var textBox = {
		view : Ti.UI.createView({
			top : '0dp',
			left : '0dp',
			height : 'auto',
			width : 'auto'
		}),
		field : Ti.UI.createTextArea({
			height : 46,
			width : 198,
			top : '10dp',
			left : '0dp',
			bottom : '0dp',
			right : '0dp',
			color : '#666',
			borderWidth : 0,
			borderRadius : 5,
			backgroundImage : 'img/textbox.png',
			backgroundColor : 'transparent'
		}),
		createView : function() {
			this.view.add(this.field);
		}
	};
	
	// create the view - adding to a view just for later design
	textBox.createView();
	// return the textbox view
	return textBox.view;
};