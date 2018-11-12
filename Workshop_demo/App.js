import React, { Component } from 'react'
import { View, AsyncStorage, Text, Platform, ActivityIndicator, Dimensions } from 'react-native'
import { Provider } from 'react-redux'
import { createRootNavigator } from './src/Routes'
import * as firebase from 'firebase'
import getStore from './src/Store';
import Splash from './src/Components/Splash';
import { NavigationActions } from 'react-navigation';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, } from 'react-native-fcm';
import { userStatusCheck, getUserExits } from './src/Actions/AuthAction';
import * as APPMESSAGE from './src/Constant';


const { width, height } = Dimensions.get('window')
let store = getStore()


export const config = {
  apiKey: "AIzaSyAoBO2jAi85IP89nXLp4NPfE5Z3eEzNfQQ",
  authDomain: "ireauto-d6a52.firebaseapp.com",
  databaseURL: "https://ireauto-d6a52.firebaseio.com",
  projectId: "ireauto-d6a52",
  storageBucket: "ireauto-d6a52.appspot.com",
  messagingSenderId: "806835719059"
};
firebase.initializeApp(config);

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      SignedIn: false,


    }

    console.disableYellowBox = true;
  }

  componentDidMount() {
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
    //       let navigateAction = NavigationActions.navigate({
    //         routeName: 'RepairWorkDetail',
    //         params: { orderNumber: notif.id }
    //         //params: { orderNumber: notif.id },
    //       });
    //       store.dispatch(navigateAction)

    //       //this.props.navigation.navigate('RepairWorkDetail', { orderNumber: notif.id })
    //       return;
    //     }
    //   }
    // })

    // FCM.on(FCMEvent.RefreshToken, token => {
    //   console.log("TOKEN (refreshUnsubscribe)", token);
    // });



    setTimeout(() => {

      firebase.auth().onAuthStateChanged((user) => {
        console.log(firebase.auth().currentUser, "jkhjkhkjhk")

        if (user) {

          this.setState({
            SignedIn: true,
            loading: false
          })
          getUserExits(user.uid).then((res) => {
            if (res && res.status && res.status == "Active") {
              this.setState({
                SignedIn: true,
                loading: false
              })

            } else {

              firebase.auth().signOut().then(() => {
                this.setState({
                  SignedIn: false,
                  loading: false
                }, () => alert(`${APPMESSAGE.INACTIVE_ACCOUNT}`))
              }).catch((error) => {
                this.setState({
                  SignedIn: false,
                  loading: false
                })
              });
            }
          }).catch((err) => {

            this.setState({
              SignedIn: false,
              loading: false
            })
          })
        }

        else {

          this.setState({
            SignedIn: false,
            loading: false
          })
        }
      })
    }, 100);


    //notification
  }


  render() {
    const Layout = createRootNavigator(this.state.SignedIn);
    if (this.state.loading) {

      return (
        <Splash />

      )
    }

    else {
      // const Layout = createRootNavigator();
      return (
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            <Layout />
          </View>
        </Provider>
      );
    }
  }
}
