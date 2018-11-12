import React, { Component } from 'react'

import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator, AsyncStorage,
  Dimensions,
  ScrollView,
  FlatList,
  StyleSheet,
  TextInput,
  SafeAreaView
} from 'react-native'
//import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../../Common/Header'
import { Button, Icon, FormLabel, FormValidationMessage } from 'react-native-elements'
import * as firebase from "firebase";
import vehicle from '../../../Assets/img/Sidebar/mini_cooper-logo.png'
const { width, height } = Dimensions.get("window")
const Schedule = require('../../../Assets/img/Home/Schedule-of-Work-Home.png');
const Repair = require('../../../Assets/img/Home/Repair-Work-Home.png');
const Kml = require('../../../Assets/img/Home/Add-Kilometers-Home.png');
import Icons from 'react-native-vector-icons/Feather'
import Modal from "react-native-modal";
import { addVehicles, getVehicles, deleteVehicles, editVehicles } from '../../../Actions/Homeactions'
import { getRepairDatail } from '../../../Actions/RepairAction';
import { getAppointmentList } from '../../../Actions/AppointmentActions';
import { NavigationActions } from 'react-navigation'

import Swipeout from 'react-native-swipeout';
// import FCM, { NotificationActionType } from "react-native-fcm";
import moment from 'moment'
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType } from 'react-native-fcm';

import { VehicleNumberValidaiton, RequiredValidation } from '../../../UtilityFunctions/Validation'
const hitSlop = { left: 50, right: 50, top: 50, bottom: 50 }
import * as HOME from '../../../Constant'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

      loader: false,
      getLoading: false,
      repairorders: [],
      progressOrder: [{'vehicleNumber':'Ch01 BA 3813', 'createdAt':'28-06-2018', 'status':'Pending','orderNumber':'#001234','workStatus':'Pending','repairCost':'30'},{'vehicleNumber':'Ch01 BA 3813', 'createdAt':'28-06-2018','status':'Pending','orderNumber':'#001234','workStatus':'Pending','repairCost':'30'},{'vehicleNumber':'Ch01 BA 3813', 'createdAt':'28-06-2018','status':'Pending','orderNumber':'#001234','workStatus':'Budget','repairCost':'30','paymentStatus':'Unpaid'}],
      appointments: [],
      appointmentsList: [],
      appointmentLoader: false,
      repairLoader: false

    }
  }

  componentWillMount() {
    //alert('Home Working')
    //notification

    this.setState({ 'progressOrder': [{'vehicleNumber':'Ch01 BA 3813', 'createdAt':'28-06-2018', 'status':'Pending','orderNumber':'#001234','workStatus':'Pending','repairCost':'30'},{'vehicleNumber':'Ch01 BA 3813', 'createdAt':'28-06-2018','status':'Pending','orderNumber':'#001234','workStatus':'Pending','repairCost':'30'},{'vehicleNumber':'Ch01 BA 3813', 'createdAt':'28-06-2018','status':'Pending','orderNumber':'#001234','workStatus':'Budget','repairCost':'30','paymentStatus':'Unpaid'}]})
    FCM.requestPermissions({ badge: false, sound: true, alert: true });
    FCM.getFCMToken().then(token => {
      console.log(token, "tokentokentokentoken")
    });

    FCM.on(FCMEvent.Notification, notif => {
      console.log("this.props.navigation", this.props.navigation)
      let payload = notif;
      let notification_payload = null;
      console.log("Notification", notif);
      if (notif.local_notification) {
        return;
      }
      if (notif.opened_from_tray) {
        console.log(notif, "notif")

        // setTimeout(() => {
        if (notif.type == "orderStatus") {
          console.log("notif.type", notif.type)
          this.props.navigation.navigate('RepairWorkDetail', { orderNumber: notif.id })
          return;
        }
        if (notif.type == "orderCreated") {
          console.log("notif.type", notif.type)
          this.props.navigation.navigate('Repairwork', { orderNumber: notif.id })
          return;
        }
        if (notif.type == "nextMaintenance") {
          console.log("notif.type", notif.type)
          this.props.navigation.navigate('VehicleRepairInfo', { vehicleNumberFromNotification: notif.id })
          return;
        }
        if (notif.type == "chat") {
          console.log("notif.type", notif.type)
          let item = {
            orderNumber: notif.id
          }
          // const resetAction = NavigationActions.replace({
          //   index: 0,
          //   actions: [
          //     NavigationActions.navigate({ routeName: 'ChatDetail' ,params: {item:item }})
          //   ]
          // })
          // this.props.navigation.dispatch(resetAction);
          this.props.navigation.navigate('ChatDetail', { item: item })
          return;
        }
        // }, 500)

      }
    })

    FCM.on(FCMEvent.RefreshToken, token => {
      console.log("TOKEN (refreshUnsubscribe)", token);
    });

    //this.getRepairinfo()

    
  }

//*****Geting_appointment_list*********** */

  // getAppointment() {
  //   this.setState({ appointmentLoader: true })
  //   // let uid = firebase.auth().currentUser.uid;
  //   let uid = '_qweqwe23423533453455';

  //   getAppointmentList(uid).then((res) => {
  //     if (res && res.length > 0) {
  //       let upcomingData = [];
  //       let value = 0;
  //       let data = res.filter(x => x.status == 'Requested' || x.status == 'Pending')
  //       this.setState({ appointmentsList: data, appointmentLoader: false })
  //     }
  //     else {
  //       this.setState({ appointmentLoader: false })
  //     }
  //   }).catch((err) => {
  //     this.setState({ appointmentLoader: false })
  //     console.log("errr", err)
  //   })
  // }


  //*****Geting_Reapirwork_list*********** */
  // getRepairinfo() {
  //   this.setState({ repairLoader: true })
  //   getRepairDatail().then((res) => {
  //     if (res && res.length > 0) {
  //       let progress = [];
  //       let count = 0;
  //       //let data = res.filter(x => x.workStatus != 'Completed' && x.workStatus != 'Cancelled' && x.workStatus != 'Budget')
  //       let data = res.filter(x => x.workStatus !== 'Cancelled' && x.workStatus !== 'Completed')
  //       this.setState({ progressOrder: data, repairLoader: false })

  //     }
  //     else {
  //       this.setState({ repairLoader: false })
  //     }
  //   }).catch((err) => {
  //     this.setState({ repairLoader: false })
  //   })
  // }


  _keyExtractor = (item, index) => index + 'InProgressRepairAndAppointmentList';
  _renderProgressView = ({ item, index }) => {
    console.log("item", item)
    // debugger
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate("RepairWorkDetail", { item: item })} >
        <View style={styles.repairDetailView}>
          <View style={styles.upperSection}>

            {/* <Text style={[styles.paddingText, { color: '#000000', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>
              {HOME.ORDER_ID} : {item.orderNumber}
            </Text> */}
            <Text style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>
              <Text style={{ color: '#8D8B8E', fontWeight: 'bold' }}>{HOME.VEHICLE_NUMBER}:</Text> <Text style={{ color: '#8D8B8E' }}> {item.vehicleNumber}</Text>
            </Text>
            <Text style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>

              <Text style={{ color: '#8D8B8E', fontWeight: 'bold' }}>{HOME.CREATED_AT}:</Text> {item && item.appointmentDate ?
                item.appointmentDate :
                moment(item.createdAt, 'YYYY-MM-DD HH:mm a').format("DD-MM-YYYY")
              }
            </Text>

            <Text style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>

              <Text style={{ color: '#8D8B8E', fontWeight: 'bold' }}>{HOME.STATUS}: </Text>
              {item && item.status ?
                <Text style={{ color: '#8D8B8E' }}>
                  {item.status}
                </Text>
                :
                <Text style={{ color: '#8D8B8E' }}>
                  {item.workStatus}
                </Text>
              }
            </Text>
          </View>
          <View style={{ backgroundColor: '#ff3333', flexDirection: 'column', flex: 0.1, padding: 10, alignItems: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
            <View style={{ alignItems: 'center', marginBottom: 10 }}><Text style={{ color: 'white', fontWeight: '800', fontSize: 16 }}>ID</Text></View>
            <View style={{
              alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 20, width: 40, height: 40, shadowOpacity: 0.8,
              shadowRadius: 10,
              elevation: 2,
              borderColor: '#dcdcdc',
              borderWidth: 1
            }}>
              <Text style={{
                color: '#ff3333', fontSize: 18, fontWeight: 'bold', shadowColor: '#dcdcdc',

              }}>
                {item.orderNumber}
              </Text>
            </View>

          </View>
        </View>
      </TouchableOpacity>

    );
  }

  renderSpinner() {
    return (
      <View style={{ position: 'absolute', top: height / 7, left: width / 2 - 40, zIndex: 1000 }}>
        <ActivityIndicator size={'large'} color='#ff3333' />
      </View>
    )
  }

  getAppointmentSpinner() {
    return (
      <View style={{
        position: 'absolute', left: 0,
        right: 0, top: 0, bottom: 0, flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        opacity: 0.9
      }}>
        <ActivityIndicator size={'large'} color='#ff3333' />
      </View>
    )

  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Header title={HOME.HOME} navigateClick={() => this.props.navigation.navigate('DrawerOpen')} />

          {/* {
          this.state.getLoading && this.getAppointmentSpinner()

        } */}

          <ScrollView>
            {/* <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#8D8B8E' }}>
            <View style={{ flex: 1 }}><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{HOME.MY_APPOINTMENT}</Text></View>
          </View>


          {
            this.state.appointmentLoader ?
              <ActivityIndicator size={'large'} color='#ff3333' /> :
              <View>

                <ScrollView>

                  <FlatList
                    data={this.state.appointmentsList}
                    keyExtractor={this._keyExtractor.bind(this)}
                    ItemSeparatorComponent={() => <View style={{
                      margin: 2,
                      borderBottomWidth: 1, borderColor: '#ccc'
                    }} />}
                    renderItem={this._renderProgressView.bind(this)}
                    ListHeaderComponent={() => (!this.state.appointmentsList.length ?
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
                        <Text style={{ fontSize: 16, color: 'black' }}>{HOME.NO_APPOINTEMENTS}</Text>
                      </View>
                      : null)
                    }
                  />

                </ScrollView>


              </View>
          } */}



            <View style={{
              flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', shadowColor: '#999',
              // shadowOffset: { width: 40, height: 50 },
              shadowOpacity: 0.8,
              shadowRadius: 10,
              elevation: 1,
              borderColor: '#dcdcdc',
              borderWidth: 1
            }}>
              <View style={{ flex: 1, alignItems: 'center' }}><Text style={{ color: '#ff3333', fontSize: 18, fontWeight: 'bold', fontFamily: 'HiraginoSansCNS-W6' }}>{HOME.REPAIR_WORK_PROGRESS}</Text></View>
            </View>
            {
              this.state.repairLoader ?
                <ActivityIndicator size={'large'} color='#ff3333' /> :
                <View>
                  <ScrollView>

                    <FlatList
                      data={this.state.progressOrder}
                      keyExtractor={this._keyExtractor.bind(this)}
                      // ItemSeparatorComponent={() => <View style={{
                      //   margin: 2,
                      //   borderBottomWidth: 1, borderColor: '#ccc'
                      // }} />}
                      renderItem={this._renderProgressView.bind(this)}
                      ListHeaderComponent={() => (!this.state.progressOrder.length ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
                          <Text style={{ fontSize: 16, color: 'black' }}>{HOME.CURRENT_REPAIR_WORK_NODATA}</Text>
                        </View>
                        : null)
                      }
                    />

                  </ScrollView>


                </View>
            }
          </ScrollView>


        </View >
      </SafeAreaView>
    );
  }
}

export default Home


const styles = StyleSheet.create({


  ModalInsideView: {

    backgroundColor: "#fff",
    width: width - 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // alignItems: 'center',
    // alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'

  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: height / 2
  },
  repairDetailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 10,
    //paddingHorizontal: 10, 
    //paddingVertical: 10,
    borderColor: '#dcdcdc',
    borderWidth: 0.5,
    margin: 15,
    borderRadius: 10,
    //shadowColor: '#dcdcdc',
    // shadowOffset: { width: 40, height: 50 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,

  },
  upperSection: {
    flex: 0.6,
    flexDirection: 'column',
    padding: 10,
    paddingVertical: 20
  },
  paddingText: {
    padding: 2
  },
  bottomSection: {
    flex: 0.4,
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  repairCost: {
    color: 'red',
    fontSize: 26,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center'
  },
  payButton: {
    backgroundColor: '#ff3333',
    width: width / 3 - 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 25
  },
  payText: {
    color: 'white'
  },

});
