// login page
exports.LoginPage = function() {
	
	loginPage = {
		button : Ti.UI.createButton({
			title : 'Take me to the beer',
			bottom : '30dp',
			height : '39dp',
			width : '191dp'
		}),
		view : Ti.UI.createView({
			layout: 'absolute',
			width : '100%',
			height : '100%',
			top : '0dp',
			left : '0dp',
			right : '0dp',
			backgroundColor : 'transparent'
		})
	};
	
	
	
	// face book login button
	loginPage.view.add(loginPage.button);
	
	
	
	loginPage.button.addEventListener('click', function() {
		// close the login window and the open the tabGroup
		Ti.App.fireEvent('app:login')
	});
	
	// return the view of the page
	return loginPage.view;
};