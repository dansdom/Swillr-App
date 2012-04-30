// this script creates a standard button on the page
// event handling to be added in the view script
// 1. "value"		- the text for the button
// 2. "callback" 	- the callback function when the button is clicked 
exports.Btn = function(value, callback) {
	
	var btn = {
		view : Ti.UI.createView({
			layout : 'horizontal',
			height: 'auto',
			width : 'auto',
			top : '0dp',
			left : '0dp',
			right : '0dp'
		}),
		button : Ti.UI.createButton({
			height : '41dp',
			width : '251dp',
			left : 'auto',
			right : 'auto',
			backgroundImage : 'img/btn.png',
			backgroundSelectedImage : 'img/btn-active.png'
		}),
		label : Ti.UI.createLabel({
			text : value,
			font : {fontSize : 20, fontFamily: 'Museo', fontWeight : 'bold'},
			color : '#fff',
			highlightedColor : '#b54d26',
			shadowColor : '#666',
			shadowOffset : {x:0, y:1},
			height : 'auto',
			width : 'auto'
		}),
		addButtonEvent : function() {
			if (typeof callback == 'function') {
				this.button.addEventListener('click', function() {
					//Ti.API.log('clicked my button');
					callback();
				});
				this.button.addEventListener('touchstart', function() {
					btn.label.setShadowColor('#ccc');
				});
				this.button.addEventListener('touchend', function() {
					btn.label.setShadowColor('#666');
				});
			}
		},
		createView : function() {
			this.button.add(this.label);
			this.view.add(this.button);
			this.addButtonEvent();
		}
	};
	
	// create the view
	btn.createView();
	// return the view
	return btn;
};