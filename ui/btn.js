// this script creates a standard button on the page
// event handling to be added in the view script
// 1. "value"		- the text for the button
// 2. "callback" 	- the callback function when the button is clicked 
exports.Btn = function(value, callback, btnWidth, btnHeight) {
	
	var btn = {
		view : Ti.UI.createView({
			layout : 'horizontal',
			height: btnHeight || '40dp',
			width : btnWidth || '250dp',
			top : '20dp',
			left : 'auto',
			right : 'auto'
		}),
		button : Ti.UI.createButton({
			title : '',
			top : '0dp',
			height : '100%',
			width : '100%',
			border : 1,
			borderColor : '#561F06',
			borderRadius : '10dp',
			style : Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
			backgroundColor : 'transparent',
			backgroundGradient: {
				type:'linear',
				colors:[
					{color : '#fcf1e3', offset : 0},
					{color : '#fcf1e3', offset : 0.2},
					{color : '#cf9836', offset : 0.8},
					{color : '#cf9836', offset : 1.0}
			]}
		}),
		label : Ti.UI.createLabel({
			text : value,
			font : {fontWeight : 'bold', fontSize : '16dp'},
			color : '#561F06',
			height : '100%',
			width : '100%',
			textAlign : 'center',
			shadowColor : '#fff',
			shadowOffset : {x:0, y:1}
		}),
		addButtonEvent : function() {
			if (typeof callback == 'function') {
				this.button.addEventListener('click', function() {
					btn.label.setColor('#561F06');
					Ti.API.log('clicked my button');
					callback();
				});
			}
			this.button.addEventListener('touchstart', function() {
				btn.button.setBackgroundGradient({
					type:'linear',
					colors:[
						{color : '#fcf1e3', offset : 0},
						{color : '#cf9836', offset : 0.4},
						{color : '#561F06', offset : 1.0}
				]});
				btn.label.setShadowColor('#1E0B02');
				btn.label.setColor('#fff');
			});
			this.button.addEventListener('touchend', function() {
				btn.button.setBackgroundGradient({
					type:'linear',
					colors:[
						{color : '#fcf1e3', offset : 0},
						{color : '#fcf1e3', offset : 0.2},
						{color : '#cf9836', offset : 0.8},
						{color : '#cf9836', offset : 1.0}
				]});
				btn.label.setShadowColor('#fff');
				btn.label.setColor('#561F06');
			});
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