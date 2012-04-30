//////////////////////push_notifications.js///////////////////////
// https://gist.github.com/1208144
exports.Apns = function() {
  //var pref = require('preferences').preferences;
  //Ti.API.log('doing notifications');
  Ti.Network.registerForPushNotifications({
    types: [
        Ti.Network.NOTIFICATION_TYPE_BADGE,
        Ti.Network.NOTIFICATION_TYPE_ALERT,
        Ti.Network.NOTIFICATION_TYPE_SOUND
    ],
    success:function(e)
    {
        var deviceToken = e.deviceToken;
        Ti.API.info("Push notification device token is: " + deviceToken);
        Ti.API.info("Push notification types: " + Ti.Network.remoteNotificationTypes);
        Ti.API.info("Push notification enabled: " + Ti.Network.remoteNotificationsEnabled);
        /*
        var http = Ti.Network.createHTTPClient();
        http.onload = function(){
          // do nothing.
        };
        http.open('GET', pref.apns_url + "?deviceuid=" + escape(Titanium.Platform.id) + "&devicetoken=" + escape(e.deviceToken));
        http.send();
        */
    },
    error:function(e)
    {
        Ti.API.info("Error during registration: "+e.error);
    },
    callback:function(e)
    {
        // called when a push notification is received.
      Ti.Media.vibrate();
      var data = JSON.parse(e.data);
      var badge = data.badge;
      if(badge > 0){
        Ti.UI.iPhone.appBadge = badge;
      }
      var message = data.message;
      if(message != ''){
        var my_alert = Ti.UI.createAlertDialog({title:'', message:message});
        my_alert.show();
      }
    }
  }); 
  return this;
};