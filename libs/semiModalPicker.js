var stringToDate = function(dateString) {
	dateString = dateString || '';
	var matches = /(\d+)\/(\d+)\/(\d+)/.exec(dateString);
	if (matches && matches.length >= 4) {
		return new Date(matches[3], matches[1] - 1, matches[2]);	
	}
	return new Date();
};

var dateToString = function(date) {
	return (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
};

var timeToString = function(time) {
	var timeString = time.toTimeString().split(' ')[0];
	var hourMin = timeString.substring(0, 5);
	return hourMin
};

exports.createSemiModalPicker = function(o) {
	var type = o.type === undefined ? Ti.UI.PICKER_TYPE_PLAIN : o.type;
	var modalWin = Ti.UI.createWindow({
		backgroundColor : 'transparent'
	});
	var overlay = Ti.UI.createView({
		backgroundColor : '#000',
		opacity : 0.6
	});
	var container = Ti.UI.createView({
		bottom : 0,
		layout : 'vertical',
		height : Ti.UI.SIZE
	});
	
	var picker = Ti.UI.createPicker({
		type: type,
		height: 'auto',
		selectionIndicator: true
	});
	
	if (type === Ti.UI.PICKER_TYPE_DATE || type === Ti.UI.PICKER_TYPE_TIME) {
		picker.value = stringToDate(o.value);
	 } else if (o.data) {
		for (var i in o.data) {
			picker.add(Ti.UI.createPickerRow({title:o.data[i]}));	
		}
	}
	picker.addEventListener('change', function(e) {});
	
	// using the custom button module
	var cancelEvent = function() {
		modalWin.close();
	};
	var Btn = require('ui/btn').Btn;
	var cancelBtn = new Btn('Cancel', cancelEvent, '80dp', '30dp');
	cancelBtn.view.setLeft(10);
	cancelBtn.view.setTop('auto');
	/*
	var cancel =  Titanium.UI.createButton({
		title:'Cancel',
		height: 30,
		width: 80,
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
		left: 10
	});
	cancel.addEventListener('click', function(e) {
		modalWin.close();
	});
	*/
	
	var doneEvent = function(e) {
		if (type === Ti.UI.PICKER_TYPE_DATE) {
			o.textField.value = dateToString(picker.value);
		} else if (type === Ti.UI.PICKER_TYPE_TIME) {
			o.textField.value = timeToString(picker.value);
		} else {
			o.textField.value = picker.getSelectedRow(0).title;	
		}
		modalWin.close();
	};
	
	// using the custom button module
	var Btn = require('ui/btn').Btn;
	var doneBtn = new Btn('Done', doneEvent, '80dp', '30dp');
	doneBtn.view.setRight(10);
	doneBtn.view.setTop('auto');
	/* 
	var done =  Titanium.UI.createButton({
		title:'Done',
		height: 30,
		width: 80,
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
		right: 10
	});
	
	done.addEventListener('click', function(e) {
		if (type === Ti.UI.PICKER_TYPE_DATE) {
			o.textField.value = dateToString(picker.value);
		} else if (type === Ti.UI.PICKER_TYPE_TIME) {
			o.textField.value = timeToString(picker.value);
		} else {
			o.textField.value = picker.getSelectedRow(0).title;	
		}
		modalWin.close();
	});
	*/
	 
	var spacer =  Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	 
	var toolbar = Ti.UI.createView({
		height: 43,
		backgroundColor: '#1E0B02'
	});
	 
	toolbar.add(cancelBtn.view);
	toolbar.add(doneBtn.view);
	container.add(toolbar);
	container.add(picker);
	modalWin.add(overlay);
	modalWin.add(container);
	
	return modalWin;
};