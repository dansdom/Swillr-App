//  Countdown module for the receipt page
// will probably always be passing 15min into the function
var countDownLength = 15;

exports.CountDown = function(callback) {

	// this is the view for the clock
	expires = {
		view : Ti.UI.createView({
			layout : 'vertical',
			height : 'auto',
			width : 'auto',
			top : '0dp',
			right : '10dp',
			left : '5dp'
		}),
		titleText : Ti.UI.createLabel({
			text : 'Please show this to the cashier.',
			top : '30dp',
			height : 'auto',
			width : 'auto',
			font : {fontSize : 18, fontFamily : 'Museo'}
		}),
		codeView : Ti.UI.createView({
			layout : 'vertical',
			height : 'auto',
			top : '20dp'
		}),
		codeTitle : Ti.UI.createLabel({
			text : 'Coupon Code:',
			height : 'auto',
			font : {fontSize : 13, fontFamily : 'Museo'},
			color : '#aaa'
		}),
		codeValue : Ti.UI.createLabel({
			text : '123-456-789',
			height : 'auto',
			font : {fontSize : 18, fontFamily : 'Museo'}
		}),
		clockView : Ti.UI.createView({
			layout : 'vertical',
			height : 'auto',
			width : 'auto',
			left : '0dp',
			top : '20pd'
		}),
		clockLabel : Ti.UI.createLabel({
			text : 'Expires in:',
			height : 'auto',
			width : 'auto',
			left : '0dp',
			font : {fontSize : 13, fontFamily : 'Museo'},
			color : '#aaa'
		}),
		clock : Ti.UI.createLabel({
			text : countDownLength + ' : 00',
			height : 'auto',
			width : 'auto',
			left : '0dp',
			font : {fontSize : 18, fontFamily : 'Museo'}
		}),
		createView : function() {
			this.codeView.add(this.codeTitle);
			this.codeView.add(this.codeValue);
			this.clockView.add(this.clockLabel);
			this.clockView.add(this.clock);
			this.view.add(this.titleText);
			this.view.add(this.codeView);
			this.view.add(this.clockView);
		},
		timer : false
	};
	
	expires.createView();
	
	var currentDate = new Date();
	var currentTime = currentDate.getTime();
	var offerLength = countDownLength;  // 15 minutes for the offer to expire
	
	// convert time into UTC
	var endTime = Date.UTC(endTime);
	endTime = currentTime + (1000 * 60 * offerLength);  // add fifteen minutes to the current time
	var timeLeft = endTime - currentTime;
	//Ti.API.log(currentTime);
	//Ti.API.log(endTime);
	
	tick = function() {
		timeLeft -= 1000;
		var minutesLeft = Math.floor(timeLeft / (1000 * 60));
		var secondsLeft = (timeLeft / 1000) % 60;
		//Ti.API.log(minutesLeft + ' : ' + secondsLeft);
		if (secondsLeft < 10) {
			expires.clock.setText(minutesLeft + " : 0" + secondsLeft);
		}
		else {
			expires.clock.setText(minutesLeft + " : " + secondsLeft);
		}
		
		// clear the interval if the time has run out
		if (minutesLeft <= 0 && secondsLeft <= 0) {
			callback();
			//expires.clock.setText('your gift has expired');
			clearInterval(expires.timer);
		}
	};
	// I may need to set a loop so that every 10 sec it will check the time
	// I need to clear this timer when the user leaves the page too
	// if they come back then I will set it up again
	expires.timer = setInterval(function(){tick()}, 1000);
	
	return expires;
};