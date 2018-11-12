import React, { Component } from "react";
import { Share, SafeAreaView } from 'react-native';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import { Badge } from 'react-native-elements'
import { bindActionCreators } from 'redux';
import { logOutUser, removeDeviceToken } from '../Actions/AuthAction';
import { getAllNofication } from '../Actions/ChatAction';

// import { removeDeviceToken } from '../Actions/AuthAction';
import { connect } from 'react-redux';
import { CustomSpinner } from '../Common/CustomSpinner';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUserInfomation } from "../Actions/AppointmentActions";
import getStore from '../../src/Store';
let store = getStore()

import { Image, AsyncStorage, Platform, Dimensions, View, Text, FlatList, ImageBackground, ScrollView, TouchableOpacity } from "react-native";

const logo_app = require('../Assets/img/Login-screen-logo.png');
const header = require('../Assets/img/Sidebar/Sidebars-red-BG.png');
const Logo = require('../Assets/img/Sidebar/logo-Sidebar.png');
const Home = require('../Assets/img/Sidebar/Home-Sidebar.png');
const Schedule = require('../Assets/img/Sidebar/Schedule-of-Work-Sidebar.png');
const Repair = require('../Assets/img/Sidebar/Repair-Work-Sidebar.png');
const Kml = require('../Assets/img/Sidebar/Add-Kilometers-Sidebar.png');
const Contact_us = require('../Assets/img/Sidebar/Contact-Us-Sidebar.png');
const Payment = require('../Assets/img/Payment-icons/Payment.png');
const About_us = require('../Assets/img/Sidebar/About-Us-Sidebar.png');
const Call_us = require('../Assets/img/Sidebar/Call-the-Workshop-Sidebar.png');
const Logout = require('../Assets/img/Sidebar/Logout-Sidebar.png');
const User = require('../Assets/img/user.png');
const car = require('../Assets/img/Sidebar/car.png');
const Inbox = require('../Assets/img/Sidebar/inbox.png');
const invoice = require('../Assets/img/Sidebar/Invoice.png');
import * as firebase from "firebase";
import Communications from 'react-native-communications';
import * as SIDEBAR from '../Constant'

let url = "https://cita-taller.citroen.es/rdv-intervention.aspx?idpdv=0000044937&rrdi=026211X&acteurvn=026211X01&name=IREAUTO+2000%2c+S.L.U.&address=LAURA+GROTE+DE+LA+PUERTA%2c+21%7c--%7c38110%7cSANTA+CRUZ+DE+TENERIFE&phone=922235064&urlcontact=http%3a%2f%2fredoficial.citroen.es%2fsanta-cruz-de-tenerife-ireauto2000%2fnous-contacter%2fcontacts%2finfo-generales%2f&urlhome=http%3a%2f%2fredoficial.citroen.es%2fsanta-cruz-de-tenerife-ireauto2000&style=&lang=es-ES&Dealer=026211X01&DealerL=IREAUTO+2000%2c+S.L.U.&id=026211X&_ga=1.8851830.2116751267.1464693154"



const datas = [
  {
    name: `${SIDEBAR.HOME}`,
    route: "Home",
    icon: Home,
  },
  {
    name: `${SIDEBAR.REPAIR_WORK}`,
    route: "Repairwork",
    icon: Repair,
  },
  {
    name: `${SIDEBAR.SCHEDULE_APPOINTMENT}`,
    route: "Web",
    icon: Schedule,
  },
  // {
  //   name: `${SIDEBAR.INBOX}`,
  //   route: "Chat",
  //   icon: Inbox,
  // },
  // {
  //   name: `${SIDEBAR.MY_VEHICLES}`,
  //   route: "MyVehicles",
  //   icon: car,
  // },
  {
    name: `${SIDEBAR.MY_PAYMENTS}`,
    route: "Payments",
    icon: Payment,
  },
  {
    name: `${SIDEBAR.MY_PROFILE}`,
    route: "MyProfile",
    icon: User,
  },

  {
    name: `${SIDEBAR.CONTACT_US}`,
    route: "ContactUs",
    icon: Contact_us,
  },
  {
    name: `${SIDEBAR.ABOUT_US}`,
    route: "AboutUs",
    icon: About_us,
  },
  // {
  //   name: `${SIDEBAR.CALL_THE_WORKSHOP}`,
  //   //route: "HomeNavigation",
  //   icon: Call_us,
  // },
  {
    name: `${SIDEBAR.LOGOUT}`,
    route: "LoginExample",
    icon: Logout,
  },

];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      userName: '',
      result: '',
      isLoading: false,
      userInformation: [],
      contact: '',
      notification: null
    };
  }

  componentWillMount() {
    this.setState({
      notification: this.props.notificationCount
    })
    this.getData()
    this.getAllNofication()
  }

  getData() {
    getUserInfomation().then((res) => {
      console.log(res)
      this.setState({ userInformation: res, contact: res.contact })
    }).catch((err) => {
      console.log(err)
    })

  }

  getAllNofication() {
    // let userId = firebase.auth().currentUser.uid;
    // //getAllNofication(userId)

    // firebase.database().ref(`notifications`).orderByChild('uid').equalTo(userId).on("value", snapshot => {
    //   let totalNotification = []
    //   let totalCountForNotification = 0
    //   if (snapshot.exists()) {

    //     totalNotification = Object.values(snapshot.val())

    //     console.log("totalNotification", totalNotification)
    //     // totalCountForNotification = totalNotification.map((item, index) => {
    //     //     return item.clientCount
    //     // })
    //     for (var i = 0; i < totalNotification.length; i++) {
    //       let value = totalNotification[i]
    //       totalCountForNotification = totalCountForNotification + value.clientCount
    //     }
    //     this.props.dispatch({ type: 'NOTIFICATION_COUNT', notification_count: totalCountForNotification })
    //   }
    //   else {


    //   }
    // })
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps.user", nextProps.notificationCount)
    this.setState({
      notification: nextProps.notificationCount
    })

  }

  logOutUser = () => {
    // alert('working');
    this.props.navigation.navigate('LoginExample');
    // this.setState({ isLoading: true })
    // let userId = firebase.auth().currentUser.uid;
    // const { navigate } = this.props.navigation
    // firebase.auth().signOut().then(() => {
    //   removeDeviceToken(userId).then((res) => {
    //     AsyncStorage.removeItem('uid');
    //     navigate('LoginExample');
    //     console.log((res, "addPaymentDataaddPaymentData"))
    //   })
    // }).catch((error) => {
    //   this.setState({ isLoading: false })
    //   console.log(error)
    // });
  }


  logInUserNavigate() {
    //  this.props.navigation.navigate('Auth');
  }

  _keyExtractor = (item, index) => index + 'flatlist';
  _renderItemView = ({ item, index }) => {

    return (
      <TouchableOpacity onPress={
        (item.name == `${SIDEBAR.LOGOUT}`) ? () => this.logOutUser() : (item.name == `${SIDEBAR.CALL_THE_WORKSHOP}`) ?
          () => Communications.phonecall(this.state.contact, true) :
          (item.name == `${SIDEBAR.SCHEDULE_APPOINTMENT}`) ?
            () => this.props.navigation.navigate(item.route, { data: url }) :
            () => this.props.navigation.navigate(item.route)}
        activeOpacity={0.9} style={{ flex: 0.6, flexDirection: 'row', marginLeft: 15, paddingVertical: 15 }}
      >

        {/* <TouchableOpacity activeOpacity={0.9} style={{ flex: 0.6, flexDirection: 'row', marginLeft: 15, paddingVertical: 15 }} onPress={() => this.props.navigation.navigate(item.route)}> */}
        <View>
          <Image source={item.icon} style={{ width: 20, height: 20 }} />
        </View>

        <View style={{ marginLeft: 15, flexDirection: 'row' }}>
          <Text style={{ color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold' }}>{item.name}</Text>
          {(item.name) == `${SIDEBAR.INBOX}` && this.state.notification > 0 ?
            <Badge
              value={this.state.notification}
              textStyle={{ color: 'white' }}
              containerStyle={{ backgroundColor: '#3CD80D', borderRadius: 40, marginLeft: 5 }}
            /> :
            null
          }

        </View>

        {/* <View>
          <Badge
            value={this.state.notificationCount}
            textStyle={{ color: 'white' }}
            containerStyle={{ backgroundColor: '#3CD80D', borderRadius: 40 }}
          />
        </View> */}


      </TouchableOpacity >
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 0.5 }}>
              <ImageBackground
                source={header}
                style={{ width: '100%', height: '100%' }}
                resizeMode='stretch'
              >

                <Image source={logo_app} style={{ width: 110, height: 110, alignSelf: 'center', marginTop: 40 }} />

              </ImageBackground>

            </View>

            {this.state.isLoading && <CustomSpinner /> ?
              <CustomSpinner /> : null
            }



            <View style={{marginTop:10}}>
              <FlatList
                extraData={this.state.notification}
                data={datas}
                keyExtractor={this._keyExtractor.bind(this)}
                renderItem={this._renderItemView.bind(this)}
              />
            </View>


          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

// export default SideBar
function mapStateToProps(state) {
  return {
    notificationCount: state.Auth.notification_count
  }
}
//mapping dispatcheable actions to component
const mapDispathToProps = (dispatch) => {
  return bindActionCreators({ dispatch }, dispatch);
}
export default connect(mapStateToProps, mapDispathToProps)(SideBar)

const styles = {
  drawerImage: {
    height: 35,
    resizeMode: Image.resizeMode.contain,
    // position: "absolute",
    right: Platform.OS === "android" ? deviceWidth / 12 : deviceWidth / 10,
    marginTop: 20
    //top: Platform.OS === "android" ? 20 : 10,
    // width: 210,
    //  height: 25,
    //  resizeMode: "cover",

  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 20,
    color: '#fff'
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  }
};

