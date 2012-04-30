// login slider view
exports.Slider = function() {
	
	// bit of weirdness here. Titanium doesn't like me calling this slides as 
	// children of an objectso I can't wrap this stuff up neatly
	var slideA = Ti.UI.createView({
			height : '100%',
			width : '100%',
			top : '0dp',
			backgroundColor : 'transparent'
	});
	
	var	slideB = Ti.UI.createView({
			height : '100%',
			width : '100%',
			top : '0dp',
			backgroundColor : 'transparent'
	});
	
	var	slideC = Ti.UI.createView({
			height : '100%',
			width : '100%',
			top : '0dp',
			backgroundColor : 'transparent'
	});
	
	var slideAImg = Ti.UI.createImageView({
		image : 'img/slide1.png',
		height : 'auto',
		width: 'auto',
		top : '20dp'
	});
	
	var slideBImg = Ti.UI.createImageView({
		image : 'img/slide2.png',
		height : 'auto',
		width: 'auto',
		top : '20dp'
	});
	
	var slideCImg = Ti.UI.createImageView({
		image : 'img/slide3.png',
		height : 'auto',
		width: 'auto',
		top : '20dp'
	});
	
	slideA.add(slideAImg);
	slideB.add(slideBImg);
	slideC.add(slideCImg);
	
	var	slider = Ti.UI.createScrollableView({
			showPagingControl : true,
			width : '100%',
			height : '390dp',
			top : '0dp',
			left : '100%',
			backgroundColor : 'transparent',
			views : [slideA, slideB, slideC],
			pagingControlColor : 'transparent',
			zindex : 2
	});
	// return the slider
	return slider;
};