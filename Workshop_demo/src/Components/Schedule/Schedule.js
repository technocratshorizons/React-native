//Schedule Appointment
//signup
import React, { Component } from 'react'
import {
    View, Text, TextInput, Image, Alert,
    FlatList, Platform, ImageBackground,
    StyleSheet, TouchableOpacity, ActivityIndicator,
    AsyncStorage, ScrollView, Dimensions,
    Picker, SafeAreaView
} from 'react-native'
import * as firebase from "firebase";
import { Button, Icon, Header, FormLabel } from 'react-native-elements';
import { CustomSpinner } from '../../Common/CustomSpinner';
import Modal from "react-native-modal";
import moment from 'moment'
import DatePicker from 'react-native-datepicker'
import { Calendar, CalendarList } from 'react-native-calendars';
import Swipeout from 'react-native-swipeout';
import { getVehicles, } from '../../Actions/Homeactions'
import { getUserExits, } from '../../Actions/AuthAction'



const schedule_icon = require('../../Assets/img/Schedule/calendar-apportment-popup.png');
const time_icon = require('../../Assets/img/Schedule/Clock-apportment-popup.png');
let menu = require('../../Assets/img/menu.png');

import {
    addAppointmentData,
    getAppointmentList,
    editAppointments,
    deleteAppointments,
    getCountAppointment,
    addCountAppointment
} from '../../Actions/AppointmentActions'

import * as SCHEDULE from '../../Constant'

const hitSlop = { left: 50, right: 50, top: 50, bottom: 50 }

const { height, width } = Dimensions.get('window')

export default class Schedule extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {

            visibleModal: false,
            selectedColor: 'ff3333',
            dates: [],
            isLoading: false,
            loader: false,
            getLoading: false,
            editloader: false,
            spinner: false,
            key: '',
            isfrom: '',
            marked: new Date(),
            vehicle: '',
            showList: [],
            time: moment().format('LT'),
            appointments: [],
            upcomingAppointment: [{'vehicleNumber':'Ch01 BA 3813', 'appointmentDate':'28-06-2018', 'status':'Pending','orderNumber':'#001234','status':'Pending','repairCost':'30', 'vehicleName':'Alto k10', 'key':'1','appointmentTime':'10:20 Am', 'reason':'Personal'},{'vehicleNumber':'Ch01 BA 3813', 'appointmentDate':'28-06-2018','status':'Pending','orderNumber':'#001234','status':'Pending','repairCost':'30','vehicleName':'Alto k10','key':'2','appointmentTime':'10:20 Am', 'reason':'Personal'},{'vehicleNumber':'Ch01 BA 3813', 'appointmentDate':'28-06-2018','status':'Pending','orderNumber':'#001234','status':'Budget','repairCost':'30','paymentStatus':'Unpaid','vehicleName':'Alto k10','key':'3','appointmentTime':'10:20 Am','reason':'Personal'}],
            pastAppointment: [],
            selectedVehicle: 'select Any vehicle',
            totalVehicle: [],
            serviceItems: [],
            email: '',
            name: '',
            vehicleName: '',
            vehicleNumber: '',
            status: '',
            reason: '',
            alertLoading: false,
            date:''
        }

        this.onDayPress = this.onDayPress.bind(this);

    }

    componentWillMount = () => {
       
        // let userId = '_qweqwe23423533453455';
        // getVehicles(userId).then((res) => {
        //     if (res && res.length > 0) {
        //         console.log(res)
        //         this.setState({
        //             totalVehicle: res,
        //         })

        //         console.log(this.state.totalVehicle)
        //         //console.log(this.state.totalVehicle.VehicleName)
        //         let serviceItems = this.state.totalVehicle.map((item, i) => {
        //             return <Picker.Item key={i} value={item} label={item.VehicleName} />
        //         });
        //         this.setState({
        //             serviceItems: serviceItems
        //         });
        //     }
        //     else {
        //         this.setState({
        //             totalVehicle: res,
        //         })
        //     }
        // }).catch((err) => {
        //     console.log("error===", err)
        // })
        this.getAppointment()

    }


    getAppointment = () => {

       // this.setState({ getLoading: true })
        //let uid = firebase.auth().currentUser.uid;
        let uid = '_qweqwe23423533453455';



        // getAppointmentList(uid).then((res) => {
        //     if (res && res.length > 0) {
        //         this.setState({ appointments: res })

        //         console.log(this.state.appointments)
        //         let pastData = [];
        //         let upcomingData = [];
        //         let count = 0;
        //         this.state.appointments && this.state.appointments.length > 0 && this.state.appointments.forEach((upcoming, index) => {
        //             ++count
        //             let GivenDate = upcoming.appointmentDate + ' ' + upcoming.appointmentTime
        //             let GivenTime = upcoming.appointmentTime
        //             let CurrentDate = new Date()

        //             GivenDate = moment(new Date(GivenDate))
        //             CurrentDate = moment(new Date())

        //             if (GivenDate >= CurrentDate) {

        //                 upcomingData.push(upcoming)
        //             } else {

        //                 pastData.push(upcoming)
        //             }
        //             if (count == this.state.appointments.length) {

        //                 this.setState({ upcomingAppointment: upcomingData, pastAppointment: pastData, getLoading: false })

        //                 let markedDates = []
        //                 let upcoming = upcomingData.map((item, index) => {
        //                     item['type'] = 'upcoming'
        //                     return item
        //                 })
        //                 let past = pastData.map((item, index) => {
        //                     item['type'] = 'past'
        //                     return item
        //                 })

        //                 // let 
        //                 markedDates = markedDates.concat(upcoming, past)
        //                 console.log("markedDats", markedDates)

        //                 let newData = {}
        //                 markedDates.forEach((item, index) => {
        //                     if (item.type == 'upcoming') {
        //                         var date = new Date(item.appointmentDate)
        //                         console.log("date", date)
        //                         newData[moment(date).format('YYYY-MM-DD').toString()] = {
        //                             customStyles: {
        //                                 text: {
        //                                     color: '#ff3333',
        //                                     fontWeight: 'bold'
        //                                 },
        //                             }
        //                         }
        //                     }
        //                     else {
        //                         var date = new Date(item.appointmentDate)
        //                         newData[moment(date).format('YYYY-MM-DD').toString()] = {
        //                             customStyles: {
        //                                 text: {
        //                                     color: '#ff7c79',
        //                                     fontWeight: 'bold'
        //                                 },
        //                             }
        //                         }
        //                     }
        //                 })
        //                 console.log("newData", newData)
        //                 this.setState({ marked: newData })
        //                 console.log("this.state.marked", this.state.marked)
        //             }
        //         })
        //     }
        //     else {
        //         this.setState({ getLoading: false })
        //     }

        // }).catch((err) => {
        //     this.setState({ getLoading: false, upcomingAppointment: [] })
        //     console.log("errr", err)
        // })
    }

    //Add apointment

    addAppointment = () => {
        this.setState({ isfrom: 'add', loader: true })
        let user = firebase.auth().currentUser;
        console.log("user", user)
        if (this.state.selectedDate && this.state.time && this.state.vehicle != 0) {

            getUserExits(user.uid).then((res) => {
                if (res) {

                    this.setState({
                        email: res.email,
                        name: res.name
                    })

                    let appointmentData = {
                        appointmentDate: this.state.selectedDate,
                        appointmentTime: this.state.time,
                        vechicleNumber: this.state.vehicle.VehicleNumber,
                        vehicleName: this.state.vehicle.VehicleName,
                        clientName: this.state.name + ' (' + this.state.email + ')',
                        uid: user.uid,
                        status: 'Requested',
                        reason: this.state.reason
                    }
                    console.log(appointmentData)


                    addAppointmentData(user.uid, appointmentData).then((res) => {

                        getCountAppointment().then((count) => {
                            count++
                            addCountAppointment(count).then((res) => {
                                if (res) {
                                    this.getAppointment()
                                    this.setState({ loader: false, visibleModal: false, vehicle: '', selectedDate: '', time: '', reason: '' })
                                }
                            }).catch((err) => {
                                this.setState({ loader: false, visibleModal: false, vehicle: '', selectedDate: '', time: '', reason: '' })
                            })
                        }).catch((err) => {
                            this.setState({ loader: false, visibleModal: false, vehicle: '', selectedDate: '', time: '', reason: '' })
                        })
                    }).catch((err) => {
                        console.log(err.message)
                        this.setState({ loader: false })
                    })
                }
                // console.log(res)
            })
        }
        else {
            alert(`${SCHEDULE.FILL_ALL_ENTRIES}`);
            this.setState({ loader: false, })
        }

    }
    /************START EDIT APPOINMENT*********** */

    editAppointment = (appointment) => {
        console.log(appointment);
        this.setState({ editloader: true })
        editAppointments(appointment).then((res) => {
            this.setState({ editloader: false, visibleModal: false, vehicle: '', selectedDate: '', time: '', reason: '' })
            this.getAppointment()

        }).catch((err) => {
            console.log(err.message)
            this.setState({ editloader: false })
        })
    }
    /*****************END EDIT APPOINMENT******************* */



    /************START DELETE APPOINMENT*********** */
    deleteAppointment = (key) => {
        deleteAppointments(key).then((res) => {
            getCountAppointment().then((count) => {
                count--
                addCountAppointment(count).then((res) => {
                    if (res) {
                        this.getAppointment()
                        this.setState({ loader: false, visibleModal: false })
                    }
                }).catch((err) => {
                    this.setState({ loader: false, visibleModal: false })
                })
            }).catch((err) => {
                this.setState({ loader: false, visibleModal: false })
            })

        }).catch((err) => {
            console.log(err)
        })
    }
    /*****************END DELETE APPOINMENT******************* */



    add_Edit = () => {
        if (this.state.isfrom == 'add') {
            this.addAppointment();
        }

        else {
            let user = firebase.auth().currentUser;
            getUserExits(user.uid).then((res) => {
                if (res) {
                    this.setState({
                        email: res.email,
                        name: res.name
                    })
                    let appointment = {}
                    appointment['vechicleNumber'] = this.state.VehicleNumber
                    appointment['vehicleName'] = this.state.vehicleName
                    appointment['key'] = this.state.key
                    appointment['appointmentDate'] = this.state.selectedDate
                    appointment['appointmentTime'] = this.state.time
                    appointment['clientName'] = this.state.name + ' (' + this.state.email + ')'
                    appointment['uid'] = user.uid
                    appointment['status'] = this.state.status
                    appointment['reason'] = this.state.reason

                    this.editAppointment(appointment);
                }
            })

        }



    }

    showModal = (item) => {
        if (this.state.totalVehicle.length > 0) {
            if (this.state.isfrom == 'add') {
                this.setState({ visibleModal: true })
            }
            else {
                this.setState({
                    visibleModal: true, isfrom: 'edit',
                    appointment: item,
                    VehicleNumber: item.VehicleNumber,
                    vehicleName: item.vehicleName,
                    selectedDate: item.appointmentDate,
                    key: item.key,
                    status: item.status,
                    time: item.appointmentTime,
                    reason: item.reason
                })
            }
        }
        else {
            Alert.alert(
                `${SCHEDULE.ALERT}`,
                `${SCHEDULE.WANT_TO_CREATE_CAR}`,
                [

                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    {
                        text: 'OK', onPress: () => {
                            this.props.navigation.navigate('MyVehicles')
                        }
                    },
                ],
                { cancelable: false }
            )
        }
    }


    /****************UPCOMING*****************/
    _keyExtractor = (item, index) => index + 'flatlist';
    _renderItemView = ({ item, index }) => {

        /*SwiipeSettings */
        const swipeSettings = {

            autoClose: true,
            onClose: (sectionID, rowId, direction) => {

            },
            onOpen: (sectionID, rowId, direction) => {

            },
            right: [
                {
                    // onPress: () => { this.add_Edit(item) },
                    onPress: () => {
                        this.setState({ isfrom: '', vehicle: item.vehicleName }, () => {
                            this.showModal(item)
                            console.log(item + 'itemitemitemitemitemitem')
                        })
                    },
                    component: (
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >

                            <Text style={{ color: '#fff' }}>
                                {SCHEDULE.EDIT}
                            </Text>
                        </View>
                    ),
                    backgroundColor: '#3498DB'



                },
                {

                    onPress: () => { this.deleteAppointment(item.key) },
                    component: (
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >

                            <Text style={{ color: '#fff' }}>
                                {SCHEDULE.DELETE}
                            </Text>
                        </View>
                    )
                    , backgroundColor: '#ff3333'
                }

            ],
            rowId: this.props.index,
            sectionID: 1,

        }
        /*SwipeSettings*/



        return (

            <Swipeout {...swipeSettings} style={{ backgroundColor: 'white' }}>

                <TouchableOpacity activeOpacity={0.9} style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1, paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10 }}>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ color: 'red' }}>{item.appointmentDate}</Text>
                        </View>

                        <View style={{ marginRight: 15 }}>
                            <Text style={{ color: '#323232' }}>
                                {item.appointmentTime}
                            </Text>
                        </View>
                    </View>

                    <View style={{ marginLeft: 15 }}>
                        <Text>
                            {SCHEDULE.VEHICLE_NUMBER}:{item.vehicleNumber}
                        </Text>
                    </View>

                    <View style={{ marginLeft: 15 }}>
                        <Text >
                            {SCHEDULE.STATUS}:<Text style={{ color: "#ff3333" }}>{item.status}</Text>
                        </Text>
                    </View>

                </TouchableOpacity >
            </Swipeout>


        );
    }



    /***********PAST*************/
    _keyExtractor = (item, index) => index + 'flatlist';
    _renderPastView = ({ item, index }) => {
        return (

            <TouchableOpacity activeOpacity={0.2} style={{ borderBottomColor: '#bdbdbd', borderBottomWidth: 1, paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10 }} onPress={() => console.log(index)}>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ color: '#ff7c79' }}>{item.appointmentDate}</Text>
                    </View>

                    <View style={{ marginRight: 15 }}>
                        <Text style={{ color: '#7a7a7a' }}>
                            {item.appointmentTime}
                        </Text>
                    </View>
                </View>

                <View style={{ marginLeft: 15 }}>
                    <Text style={{ color: '#787878' }}>
                        {SCHEDULE.VEHICLE_NUMBER}:{item.vechicleNumber}
                    </Text>
                </View>

            </TouchableOpacity >


        );
    }

    /***********_renderConfirmedView*************/
    _keyExtractor = (item, index) => index + 'flatlist';
    _renderConfirmedView = ({ item, index }) => {
        return (

            <TouchableOpacity activeOpacity={0.2} style={{ borderBottomColor: '#bdbdbd', borderBottomWidth: 1, paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10 }} onPress={() => console.log(index)}>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ color: '#ff7c79' }}>{item.appointmentDate}</Text>
                    </View>

                    <View style={{ marginRight: 15 }}>
                        <Text style={{ color: '#7a7a7a' }}>
                            {item.appointmentTime}
                        </Text>
                    </View>
                </View>

                <View style={{ marginLeft: 15 }}>
                    <Text style={{ color: '#787878' }}>
                        {SCHEDULE.VEHICLE_NUMBER}:{item.vechicleNumber}
                    </Text>
                </View>

            </TouchableOpacity >
        );
    }




    onDayPress(day) {
        //this.setState({ date: day.dateString });    
        this.setState({ selected: day.dateString  });
      }

    renderSpinner() {
        return (
            <View style={{ position: 'absolute', top: height / 7, left: width / 2 - 40, zIndex: 1000 }}>
                <ActivityIndicator size={'large'} color='#ff3333' />
            </View>
        )
    }

    editSpinner() {
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
                //   backgroundColor:'blue',
                opacity: 0.9
            }}>
                <ActivityIndicator size={'large'} color='#ff3333' />
            </View>
        )

    }

    leftComponent() {

        return (

            <View>
                <TouchableOpacity hitSlop={{ top: 30, bottom: 30, right: 30, left: 30 }} onPress={() => this.props.navigation.goBack()} >
                <Icon name="chevron-left" size={40} color='white' />
            </TouchableOpacity>
            </View>
        )
    }

 
    


    render() {

        console.log(this.state.vehicle)

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>



                    <Header
                        leftComponent={this.leftComponent()}
                        centerComponent={{ text: `${SCHEDULE.SCHEDULE_APPOINTMENT}`, style: { color: '#fff', fontSize: 18 } }}
                        rightComponent={{
                            icon: 'add', color: '#fff', onPress: () => this.setState({
                                isfrom: 'add',
                                vehicle: '', selectedDate: moment(new Date()).format("DD-MMM-YYYY"),
                                time: moment().format('LT'),
                            }, () => this.showModal())
                        }}
                        backgroundColor='#ff3333'
                    />
                    <ScrollView>


                        <View>
                        <Calendar
                            onDayPress={this.onDayPress}
                            style={styles.calendar}
                            hideExtraDays
                            markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: '#9c27b0'}}}
                            />

                        </View>

                        {this.state.getLoading && this.getAppointmentSpinner()

                        }

                        {/* {
                        this.state.getLoading &&

                     
                    } */}



                        <ScrollView>
                            <TouchableOpacity style={{ backgroundColor: '#504d50', height: 45 }} activeOpacity={0.9}>
                                {/* <Text style={{ color: '#fff', marginLeft: 15, paddingTop: 15 }}>{SCHEDULE.UPCOMING_APPOINTMENT}</Text> */}
                                <Text style={{ color: '#fff', marginLeft: 15, paddingTop: 15 }}>{SCHEDULE.REQUESTED_APPOINTMENT}</Text>
                            </TouchableOpacity >

                            {
                                this.state.getLoading ?
                                    null :
                                    <View style={{}}>
                                        <FlatList
                                            data={this.state.upcomingAppointment}
                                            keyExtractor={this._keyExtractor.bind(this)}
                                            renderItem={this._renderItemView.bind(this)}
                                            ListHeaderComponent={() => (!this.state.upcomingAppointment.length ?
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 }}>
                                                    <Text style={{ fontSize: 16, color: 'black', }}>{SCHEDULE.UPCOMING_APPOINTMENT_NO_DATA}</Text>
                                                </View>
                                                : null)
                                            }

                                        />
                                    </View>
                            }
                        </ScrollView>


                        {/* <ScrollView>
                        <TouchableOpacity style={{ backgroundColor: '#8e8c8f', height: 45 }} activeOpacity={0.9}>

                            <Text style={{ color: '#fff', marginLeft: 15, paddingTop: 15 }}>{SCHEDULE.CONFIRMED_APPOINTMENT}</Text>
                        </TouchableOpacity >
                        {
                            this.state.getLoading ?
                                null :
                                <View style={{}}>
                                    <FlatList
                                        // data={this.state.pastAppointment}
                                        keyExtractor={this._keyExtractor.bind(this)}
                                        renderItem={this._renderConfirmedView.bind(this)}
                                        ListHeaderComponent={
                                            // () => (!this.state.pastAppointment.length ?
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 }}>
                                                <Text style={{ fontSize: 16, color: 'black', }}>{SCHEDULE.PAST_APPOINTMENT_NO_DATA}</Text>
                                            </View>
                                            //     : null)
                                        }

                                    />
                                </View>
                        }
                    </ScrollView> */}


                        <ScrollView>
                            <TouchableOpacity style={{ backgroundColor: '#8e8c8f', height: 45 }} activeOpacity={0.9}>
                                {/* <Text style={{ color: '#fff', marginLeft: 15, paddingTop: 15 }}>{SCHEDULE.PAST_APPOINTMENT}</Text> */}
                                <Text style={{ color: '#fff', marginLeft: 15, paddingTop: 15 }}>{SCHEDULE.HANDLED_APPOINTMENT}</Text>
                            </TouchableOpacity >
                            {
                                this.state.getLoading ?
                                    null :
                                    <View style={{}}>
                                        <FlatList
                                            data={this.state.pastAppointment}
                                            keyExtractor={this._keyExtractor.bind(this)}
                                            renderItem={this._renderPastView.bind(this)}
                                            ListHeaderComponent={() => (!this.state.pastAppointment.length ?
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 }}>
                                                    <Text style={{ fontSize: 16, color: 'black', }}>{SCHEDULE.PAST_APPOINTMENT_NO_DATA}</Text>
                                                </View>
                                                : null)
                                            }

                                        />
                                    </View>
                            }
                        </ScrollView>
                        {/****Date and time*****/}
                        <View>
                            <Modal
                                isVisible={this.state.visibleModal}
                                backdropColor={'rgba(0.30,0.30,0.30,0.70)'}
                                backdropOpacity={0.4}
                                onBackButtonPress={() => this.setState({ visibleModal: false, vehicle: '', selectedDate: '', time: '', reason: '' })}
                                onBackdropPress={() => this.setState({ visibleModal: false, vehicle: '', selectedDate: '', time: '', reason: '' })}
                                style={{ width: '95%', alignSelf: 'center', }}>

                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                                    <View style={styles.ModalInsideView}>
                                        <ScrollView>
                                            <View style={{ marginTop: 10 }}>
                                                <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
                                                    {SCHEDULE.SCHEDULE_APPOINTMENT}
                                                </Text>
                                            </View>

                                            {this.state.loader && this.renderSpinner()}
                                            {this.state.editloader && this.editSpinner()}

                                            <View style={{ flexDirection: 'row', paddingRight: 15, paddingLeft: 15 }}>
                                                <View style={{ marginLeft: -15 }}>
                                                    <FormLabel>{SCHEDULE.APPOINTMENT_DATE}</FormLabel>
                                                </View>

                                                <View style={{ marginLeft: 20 }}>
                                                    <FormLabel>{SCHEDULE.APPOINTMENT_TIME}</FormLabel>
                                                </View>

                                            </View>
                                            <View style={{ flexDirection: 'row' }}>

                                                <Image source={schedule_icon} style={{ height: 20, width: 20 }} alignSelf='center' />

                                                <DatePicker
                                                    style={{ width: '42%' }}
                                                    date={this.state.selectedDate}
                                                    showIcon={false}
                                                    mode="date"
                                                    minDate={new Date()}
                                                    placeholder="select date"
                                                    format="DD-MMM-YYYY"
                                                    confirmBtnText="Confirm"
                                                    cancelBtnText="Cancel"
                                                    customStyles={{
                                                        dateIcon: {
                                                            position: 'absolute',
                                                            left: 0,
                                                            top: 4,
                                                            marginLeft: 0
                                                        },
                                                        dateInput: {
                                                            borderColor: 'transparent',
                                                            borderBottomColor: 'grey'

                                                        },
                                                        dateText: {
                                                            paddingRight: 30
                                                        }
                                                        // ... You can check the source to find the other keys.
                                                    }}
                                                    onDateChange={(date) => { this.setState({ selectedDate: date }) }}
                                                />
                                                <Image source={time_icon} style={{ height: 20, alignSelf: 'center', width: 20, marginLeft: 5 }} />
                                                <DatePicker
                                                    style={{ width: '42%' }}
                                                    date={this.state.time}
                                                    showIcon={false}
                                                    placeholder="select time"
                                                    mode="time"
                                                    format="hh:mm A"
                                                    confirmBtnText="Confirm"
                                                    cancelBtnText="Cancel"
                                                    minuteInterval={10}
                                                    onDateChange={(time) => { this.setState({ time: time }); }}
                                                    customStyles={{

                                                        dateInput: {
                                                            borderColor: 'transparent',
                                                            borderBottomColor: 'grey'

                                                        },
                                                        dateText: {
                                                            paddingRight: 30
                                                        }
                                                        // ... You can check the source to find the other keys.
                                                    }}
                                                />

                                            </View>

                                            <View style={{}}>
                                                <FormLabel>{SCHEDULE.VEHICLE_NAME}</FormLabel>
                                            </View>

                                            {this.state.isfrom == 'edit' ?
                                                <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                                                    <TextInput
                                                        ref='vehicle'
                                                        style={{ height: 40 }}
                                                        underlineColorAndroid="transparent"
                                                        editable={false}
                                                        maxLength={15}
                                                        value={this.state.vehicle} />
                                                </View>
                                                :

                                                <View style={{ paddingLeft: 15, paddingRight: 15 }}>

                                                    <Picker
                                                        mode='dropdown'
                                                        selectedValue={this.state.vehicle}
                                                        onValueChange={(service) => (this.setState({ vehicle: service }))} >
                                                        <Picker.Item value={0} label={SCHEDULE.SELECT_VEHICLE} />
                                                        {this.state.serviceItems}
                                                    </Picker>

                                                </View>
                                            }



                                            <View >
                                                <FormLabel>Reason</FormLabel>
                                            </View>

                                            <View style={{ paddingLeft: 15, paddingRight: 15, borderWidth: 1, borderColor: '#d3d3d3' }}>
                                                <TextInput
                                                    multiline={true}
                                                    style={{ height: 80 }}
                                                    underlineColorAndroid="transparent"
                                                    onChangeText={(reason) => this.setState({ reason })}
                                                    value={this.state.reason}
                                                />
                                            </View>



                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, paddingTop: 10 }}>

                                                <View style={{ width: '50%' }}>
                                                    <Button
                                                        title={SCHEDULE.CANCEL}
                                                        color='white'
                                                        onPress={() => this.setState({ visibleModal: false, vehicle: '', selectedDate: '', time: '', reason: '' })}

                                                        buttonStyle={{
                                                            backgroundColor: "#504d50",
                                                            borderRadius: 50
                                                        }}
                                                        textStyle={{ color: '#fff' }}
                                                    />
                                                </View>

                                                <View style={{ width: '50%' }}>
                                                    <Button
                                                        title={this.state.isfrom == 'edit' ? `${SCHEDULE.UPDATE}` : `${SCHEDULE.SUBMIT}`}
                                                        color='white'
                                                        onPress={this.add_Edit}
                                                        disabled={this.state.getLoading}
                                                        buttonStyle={{
                                                            backgroundColor: "#ff3333",
                                                            borderRadius: 50
                                                        }}
                                                        textStyle={{ color: '#fff' }}
                                                    />
                                                </View>

                                            </View>


                                        </ScrollView>

                                    </View>

                                </View>


                            </Modal>
                        </View>

                        {/*********Date And Time*********/}
                    </ScrollView>

                </View >
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({


    // ModalInsideView: {


    //     backgroundColor: "#fff",
    //     height: 380,
    //     alignSelf: 'center',
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     borderColor: '#fff'

    // },
    ModalInsideView: {

        backgroundColor: "#fff",

        width: width - 50,
        paddingHorizontal: 10,
        paddingVertical: 10,
        // alignItems: 'center',
        alignSelf: 'center',
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

    // calendar: {
    //     borderTopWidth: 1,
    //     paddingTop: 5,
    //     borderBottomWidth: 1,
    //     borderColor: '#eee',
    //     height: height / 2
    // },


});



