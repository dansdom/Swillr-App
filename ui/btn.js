// this script creates a standard button on the page
// event handling to be added in the view script
// 1. "value"		- the text for the button
// 2. "callback" 	- the callback function when the button is clicked 
exports.Btn = function(value, callback) {
	
	var btn = {
		view : Ti.UI.createView({
			layout : 'vertical',
			height: 'auto',
			top : '0dp',
			left : '10dp',
			right : '10dp',
			bottom : '10dp',
			backgroundColor : 'transparent'
		}),
		button : Ti.UI.createButton({
			height : '40dp',
			borderWidth : 0,
			backgroundColor : 'transparent',
			style : Ti.UI.iPhone.SystemButtonStyle.PLAIN
			//backgroundSelectedColor : 'red'
		}),
		label : Ti.UI.createLabel({
			text : value,
			font : {fontSize : 20, fontFamily: 'Museo', fontWeight : 'bold'},
			color : '#000',
			highlightedColor : '#C8B9B2',
			highlightedBackgroundColor : '#C8B9B2',
			backgroundColor : 'red',
			shadowColor : '#666',
			shadowOffset : {x:0, y:1},
			height : '100%',
			textAlign : 'center',
			borderRadius : '15dp',
			borderWidth : 1
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