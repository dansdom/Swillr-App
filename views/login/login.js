// login page
exports.LoginPage = function() {
	
	loginPage = {
		logo : Ti.UI.createImageView({
			image : 'img/three-beers-large.png',
			top : '10dp',
			height : 240,
			width : 249
		}),
		header : Ti.UI.createLabel({
			text : 'Swillr',
			height : '120dp',
			top : '-160dp',
			left : 0,
			right : 0,
			textAlign : 'center',
			font : {fontFamily : 'PT Banana Split', fontSize : 80},
			color : '#2F4773', 
			shadowOffset : {x : -2, y : -1},
			shadowColor : '#fff' 
		}),
		text1 : Ti.UI.createLabel({
			text : 'We\'ve built an app to help you and',
			height : 'auto',
			top : '40dp',
			left : '20dp',
			right : '20dp',
			textAlign : 'center',
			color : '#1E0B02',
			font : {fontFamily : 'News Cycle', fontSize : 19}
		}),
		text2 : Ti.UI.createLabel({
			text : 'your community find pubs with',
			height : 'auto',
			top : '-10dp',
			left : '20dp',
			right : '20dp',
			textAlign : 'center',
			color : '#1E0B02',
			font : {fontFamily : 'News Cycle', fontSize : 19}
		}),
		text3 : Ti.UI.createLabel({
			text : 'happy hours in your town!',
			height : 'auto',
			top : '-10dp',
			left : '20dp',
			right : '20dp',
			textAlign : 'center',
			color : '#1E0B02',
			font : {fontFamily : 'News Cycle', fontSize : 19}
		}),
		text4 : Ti.UI.createLabel({
			text : 'If you can\'t find your favourite pub',
			height : 'auto',
			top : '5dp',
			left : '20dp',
			right : '20dp',
			textAlign : 'center',
			color : '#1E0B02',
			font : {fontFamily : 'News Cycle', fontSize : 19}
		}),
		text5 : Ti.UI.createLabel({
			text : 'or happy hour, be a good neighbour',
			height : 'auto',
			top : '-10dp',
			left : '20dp',
			right : '20dp',
			textAlign : 'center',
			color : '#1E0B02',
			font : {fontFamily : 'News Cycle', fontSize : 19}
		}),
		text6 : Ti.UI.createLabel({
			text : 'and simply add them to the app.',
			height : 'auto',
			top : '-10dp',
			left : '20dp',
			right : '20dp',
			textAlign : 'center',
			color : '#1E0B02',
			font : {fontFamily : 'News Cycle', fontSize : 19}
		}),
		view : Ti.UI.createView({
			layout: 'vertical',
			width : '100%',
			height : '100%',
			top : '0dp',
			left : '0dp',
			right : '0dp',
			backgroundColor : 'transparent'
		}),
		createView : function() {
			this.view.add(this.logo);
			this.view.add(this.header);
			this.view.add(this.text1);
			this.view.add(this.text2);
			this.view.add(this.text3);
			this.view.add(this.text4);
			this.view.add(this.text5);
			this.view.add(this.text6);
		}
	};
	
	// create the view
	loginPage.createView();
	
	var loginEvent = function() {
		// close the login window and the open the tabGroup
		Ti.App.fireEvent('app:login');
	};
	
	var LoginButton = require('ui/btn').Btn;
	var loginButton = new LoginButton('Take me to the beer', loginEvent);
	loginPage.view.add(loginButton.view);
	
	// return the view of the page
	return loginPage.view;
};