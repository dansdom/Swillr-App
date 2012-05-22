// login page
exports.LoginPage = function() {
	
	loginPage = {
		logo : Ti.UI.createImageView({
			image : 'img/three-beers-large.png',
			top : '10dp',
			height : 240,
			width : 249
		}),
		text1 : Ti.UI.createLabel({
			text : 'We\'ve built an app to help you and your community find pubs with happy hours in your town!',
			height : 'auto',
			top : '10dp',
			left : '20dp',
			right : '20dp',
			textAlign : 'center'
		}),
		text2 : Ti.UI.createLabel({
			text : 'If you can\'t find your favourite pub or happy hour, be a good neighbour and simply add them to the app.',
			height : 'auto',
			top : '10dp',
			left : '20dp',
			right : '20dp',
			textAlign : 'center'
		}),
		button : Ti.UI.createButton({
			title : 'Take me to the beer',
			top : '20dp',
			height : '39dp',
			width : '191dp',
			font : {fontWeight : 'bold', fontSize : '16dp'}
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
			this.view.add(this.text1);
			this.view.add(this.text2);
			this.view.add(this.button);
		}
	};
	
	// create the view
	loginPage.createView();
	
	
	
	loginPage.button.addEventListener('click', function() {
		// close the login window and the open the tabGroup
		Ti.App.fireEvent('app:login');
	});
	
	// return the view of the page
	return loginPage.view;
};