import React, { Component } from 'react'

import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView
} from 'react-native'
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType } from 'react-native-fcm';

const Splash_icon = require('../Assets/img/Login-screen-logo.png')
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class Splash extends Component {
  constructor(props) {
    super(props);
  }



  async componentWillMount() {
    //const { navigate } = this.props.navigation
   // console.log(this.props)
    //notification
    // FCM.requestPermissions({ badge: false, sound: true, alert: true });
    // FCM.getFCMToken().then(token => {
    //   console.log(token, "tokentokentokentoken")
    //   //update your fcm token on server.
    // });

    // FCM.on(FCMEvent.Notification, notif => {
    //   let payload = notif;
    //   let notification_payload = null;
    //   console.log("Notification", notif);
    //   if (notif.local_notification) {
    //     return;
    //   }
    //   if (notif.opened_from_tray) {
    //     console.log(notif, "notif")

    //     if (notif.type == "orderStatus") {
    //       console.log("notif.type", notif.type)
    //       navigate('RepairWorkDetail', { orderNumber: notif.id })
    //       return;
    //     }
    //     if (notif.type == "orderCreated") {
    //       console.log("notif.type", notif.type)
    //       navigate('Repairwork', { orderNumber: notif.id })
    //       return;
    //     }

    //     if (notif.type == "chat") {
    //       console.log("notif.type", notif.type)
    //       let item = {
    //         orderNumber: notif.id
    //       }
    //       navigate('Chatdetail', { item: item })
    //       return;
    //     }
    //   }
    // })
    // FCM.on(FCMEvent.RefreshToken, token => {
    //   console.log("TOKEN (refreshUnsubscribe)", token);
    // });
  }



  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{
          flex: 1,
          backgroundColor: '#ff3333', justifyContent: 'center', alignContent: 'center',
        }}>
          <Image source={Splash_icon} resizeMode="contain" style={{
            alignSelf: 'center',
            width: 100
          }} />
          {/* <Text style={{ fontSize: 24, color: '#fff', alignSelf: 'center' }}> Workshop</Text> */}
        </View>
      </SafeAreaView >
    );
  }
}
// function mapStateToProps(state) {
//   return {
//   }
// }
// //mapping dispatcheable actions to component
// const mapDispathToProps = (dispatch) => {
//   return bindActionCreators({}, dispatch);
// }
// export default connect(mapStateToProps, mapDispathToProps)(Splash)
export default Splash