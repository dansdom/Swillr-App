// this script creates a 'pull to refresh' widget on a table view 
// http://developer.appcelerator.com/blog/2010/05/how-to-create-a-tweetie-like-pull-to-refresh-table.html
exports.PullToRefresh = function(tableView, refreshStart, refreshEnd) {

	// create the views needed for the refresh window 
	var refreshView = {
		view : Ti.UI.createView({
			backgroundColor : "#dad6cc",
			width : 320,
			height : 60
		}),
		border : Ti.UI.createView({
			backgroundColor:"#c6c1b3",
			height : 2,
			bottom : 0
		}),
		arrow : Ti.UI.createView({
			backgroundImage : "img/pullArrow.png",
			width : 50,
			height : 50,
			bottom : 10,
			left : 20
		}),
		statusLabel : Ti.UI.createLabel({
			text : "Pull to reload",		
			left : '80dp',
			width : 'auto',
			bottom : '30dp',
			height : "auto",
			color : "#545454",
			textAlign : "left",
			font : {fontSize : 14, fontWeight : "bold"},
			shadowColor : "#eee",
			shadowOffset : {x : 0, y : 1}
		}),
		lastUpdatedLabel : Ti.UI.createLabel({
			text : "Last Updated: " + formatDate(),		
			left : '80dp',
			width : 'auto',
			bottom : '15dp',
			height : "auto",
			color : "#545454",
			textAlign : "center",
			font : {fontSize : 12},
			shadowColor : "#eee",
			shadowOffset : {x : 0, y : 1}
		}),
		actInd : Titanium.UI.createActivityIndicator({
			left : 20,
			bottom : 13,
			width : 30,
			height : 30
		}),
		createView : function() {
			this.view.add(this.border);
			this.view.add(this.arrow);
			this.view.add(this.statusLabel);
			this.view.add(this.lastUpdatedLabel);
			this.view.add(this.actInd);
		}
	};
	refreshView.createView();
	
	// add a format date funtion
	function formatDate() {
		var d = new Date;
		var datestr = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
		if (d.getHours() >= 12) {
			datestr += ' ' + (d.getHours() == 12 ? 
			d.getHours() : d.getHours() - 12) + ':' +
			d.getMinutes() + ' PM';
		}
		else {
			datestr += ' ' + d.getHours() + ':' + d.getMinutes() + ' AM';
		}
		return datestr;
	};
	
	// add the headerPullView to the header of the table
	tableView.headerPullView = refreshView.view;
	
	// add event listeners for the tableView
	tableView.addEventListener('scroll',function(e) {
		var offset = e.contentOffset.y;
		if (offset <= -65.0 && !pulling) {
			var t = Ti.UI.create2DMatrix();
			t = t.rotate(-180);
			pulling = true;
			refreshView.arrow.animate({transform : t, duration : 180});
			refreshView.statusLabel.text = "Release to refresh...";
		}
		else if (pulling && offset > -65.0 && offset < 0) {
			pulling = false;
			var t = Ti.UI.create2DMatrix();
			refreshView.arrow.animate({transform : t, duration : 180});
			refreshView.statusLabel.text = "Pull down to refresh...";
		}
	});
	
	tableView.addEventListener('scrollEnd',function(e) {
		if (pulling && !reloading && e.contentOffset.y <= -65.0) {
			reloading = true;
			pulling = false;
			refreshView.arrow.hide();
			refreshView.actInd.show();
			refreshView.statusLabel.text = "Reloading...";
			tableView.setContentInsets({top : 60}, {animated : true});
			refreshView.arrow.transform = Ti.UI.create2DMatrix();
			beginReloading();
		}
	});
	 
	var pulling = false;
	var reloading = false; 
	
	// these are the loading functions
	// the request function will need to be called from the beginLoading function
	function beginReloading() {
		// just mock out the reload
		//setTimeout(endReloading, 2000);
		refreshStart(endReloading);
	};
	 
	function endReloading() {
		//var lastRow = 0;
		// simulate loading 
		//for (var c = lastRow; c < lastRow + 5; c++) {
		//	tableView.appendRow({title : " Row " + c});
		//}
		//lastRow += 5;
	 
		// when you're done, just reset
		tableView.setContentInsets({top : 0}, {animated : true});
		reloading = false;
		refreshView.lastUpdatedLabel.text = "Last Updated: " + formatDate();
		refreshView.statusLabel.text = "Pull down to refresh...";
		refreshView.actInd.hide();
		refreshView.arrow.show();
	};
};