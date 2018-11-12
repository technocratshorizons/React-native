

import React, { Component } from 'react';
import {StyleSheet,Text,  View, StatusBar, AsyncStorage} from 'react-native';
import FeedBack from './src/Router';
import FCM, {FCMEvent} from "react-native-fcm";
export default class App extends Component{
  render() {
    return (
        
        <FeedBack/>
      
    )
  }

  componentDidMount() {
    FCM.requestPermissions(); 
    FCM.getFCMToken().then(token => {
     //alert(token);
      AsyncStorage.setItem('app_token',token);
    });
        
    FCM.getInitialNotification().then((notif: any) => {
      // for android/ios app killed state
      // alert(notif.notification)
      if (notif) {
      // alert('working');
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload 
      }
    });

    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif: any) => {
      this.sendRemote(notif)
      alert(notif)
        // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
        if (notif.opened_from_tray) {
          alert('working');
            // handling when app in foreground or background state for both ios and android
        }
    });

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      alert(token);
        // fcm token may not be available on first load, catch it here
    });
  }
 
    // This method display the notification on mobile screen.
    sendRemote(notif) {
      console.log('send');
      FCM.presentLocalNotification({
        title: 'demo noti',
        body: 'notif body',
        priority: "high",
        click_action: notif.click_action,
        show_in_foreground: true,
        local: true
      });
    }

    componentWillUnmount() {
      this.refreshUnsubscribe();
      this.notificationUnsubscribe();
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  }
 
});
