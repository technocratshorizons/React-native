import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Text,
    SafeAreaView,
    ActivityIndicator, AsyncStorage, FlatList, ScrollView, Dimensions
} from 'react-native'
//import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../../Common/Header'
import * as MESSAGES from '../../../Constant'
import { Button, Icon, CheckBox, Badge } from 'react-native-elements'
import * as firebase from "firebase";
// import Modal from 'react-native-simple-modal';
import Modal from "react-native-modal";
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { getRepairDatail, getNotes } from '../../../Actions/RepairAction';
import { getMessageNotifications } from '../../../Actions/ChatAction';

import { addPaymentData } from '../../../Actions/Homeactions';
import SignatureCapture from 'react-native-signature-capture';
import { CustomSpinner } from '../../../Common/CustomSpinner';
import moment from 'moment'
const { width, height } = Dimensions.get("window")
import { styles } from '../styles'
const datas = [
    { date: '12 May 2018', VehicleNumber: 'HCW2058', state: 'Completed', money: 350 },
    { date: '02 May 2018', VehicleNumber: 'HCW2058', state: 'Completed', money: 550 },
    { date: '26 April 2018', VehicleNumber: 'HCW2058', state: 'Completed', money: 350 },
    { date: '26 April 2018', VehicleNumber: 'HCW2058', state: 'Completed', money: 350 },
]
import Authorizebudget from '.././../../Common/Authorizebudget/index'
import credit from '../../../Assets/img/Repair/Visa-icon-Payment.png'
import paypal from '../../../Assets/img/Repair/PayPal-Payment.png'
import notes from '../../../Assets/img/Repair/notes.png'

import PayPal from 'react-native-paypal-wrapper';
import { paypalClientId } from '../../../Config'

import * as REPAIR from '../../../Constant'

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            repairorders: [],
            progressOrder: [],
            completedOrder: [],
            isLoading: false,
            getLoading: false,
            paymentMethod: '',
            repairDetails: {},
            visibleModal: false,
            checked: false,
            visible: false,
            upcoming: true,
            past: false
        }

    }

    componentWillMount() {

        this.getRepairorder()
    }


    getRepairorder() {

        this.setState({ getLoading: true, isLoading: true })

        getMessageNotifications().then((res) => {

            console.log(res, 'resresresresresresresresresres')
            this.setState({ repairorders: res, isLoading: true })
            console.log(this.state.repairorders, 'repairordersrepairordersrepairordersrepairorders')
            if (this.state.repairorders && this.state.repairorders.length > 0) {

                let complete = [];
                let progress = [];
                let count = 0;

                this.state.repairorders && this.state.repairorders.length > 0 && this.state.repairorders.forEach((upcoming, index) => {
                    ++count
                    if (upcoming.workStatus == 'Completed' || upcoming.workStatus == 'Cancelled') {
                        complete.push(upcoming)

                    } else {
                        progress.push(upcoming)
                    }

                    if (count == this.state.repairorders.length) {

                        this.setState({ progressOrder: progress, completedOrder: complete, getLoading: false, isLoading: false })
                    }
                })
            }
            else {

                this.setState({ getLoading: false, isLoading: false })
            }

        }).catch((err) => {

            console.log(err.message, 'resresresresresresresresresres')
            this.setState({ getLoading: false, isLoading: false })
        })
    }


    ///***********Get notes or history for particular ordernumber********************** */


    notesHistory(item) {

        console.log(item.orderNumber, "item value for notes")

        getNotes(item.orderNumber).then((res) => {
            if (res && res.length) {

                console.log("res", res)
                this.setState({
                    notesList: res,
                    visible: true
                })
                console.log("this.state.noteList", this.state.noteList)
            } else {

                this.setState({
                    notesList: res,
                    visible: true
                })
            }
        }).catch((err) => {
            this.setState({
                notesList: res,
                visible: false

            })
            console.log(err, "errr in getting notes")
        })

    }


    _keyExtractor = (item, index) => index + 'InProgressRepairList';
    _renderProgressView = ({ item, index }) => {
        console.log("item", item)
        return (

            <View style={{
                flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white',
                // borderBottomColor: '#DCDCDC', borderBottomWidth: 1, 
                marginHorizontal: 10,
                marginVertical: 5,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderColor: '#dcdcdc',
                borderWidth: 0.5,
                margin: 15,
                borderRadius: 10,
                //shadowColor: '#dcdcdc',
                // shadowOffset: { width: 40, height: 50 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 2,
            }}>
                <View style={{ flex: 0.8, flexDirection: 'column' }}>
                    <View>
                        <Text style={{ color: '#000000', fontSize: 18, fontWeight: '500', padding: 3 }}>
                            {item.vehicleNumber}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ color: '#8D8B8E', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', fontSize: 16, padding: 3 }}>
                            {REPAIR.ORDER_ID}: <Text>{item.orderNumber}</Text>
                        </Text>
                    </View>
                    <View>
                        <Text style={{ color: '#8D8B8E', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', fontSize: 16, padding: 3 }}>{item.workStatus}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ChatDetail", { item: item, getRepairorder: this.getRepairorder.bind(this), })} activeOpacity={0.7}>
                        <View>
                            <Text
                                style={{ color: 'red', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', fontSize: 16, padding: 3 }}>{REPAIR.START_CONVERSATION}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 0.2, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    {/* <View style={{ paddingBottom: 5 }}>
                        <Text style={{ color: '#6B6B6B' }}>
                            {moment(item.createdAt, 'YYYY-MM-DD HH:mm a').format("HH:mm a")}
                        </Text>
                    </View> */}
                    <View>
                        {
                            item.clientCount != 0 ?
                                <Badge
                                    value={item.clientCount}
                                    textStyle={{ color: 'white' }}
                                    containerStyle={{ backgroundColor: '#3CD80D', borderRadius: 40 }}
                                />
                                :
                                null
                        }
                    </View>

                </View>



            </View>



        );
    }



    _keyExtractor = (item, index) => index + 'CompletedRepairList';
    _renderItemView = ({ item, index }) => {
        return (

            <View style={{
                flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white',
                // borderBottomColor: '#DCDCDC', borderBottomWidth: 1, 
                marginHorizontal: 10, marginVertical: 5, paddingHorizontal: 10, paddingVertical: 10,
                borderColor: '#dcdcdc',
                borderWidth: 0.5,
                margin: 15,
                borderRadius: 10,
                //shadowColor: '#dcdcdc',
                // shadowOffset: { width: 40, height: 50 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 2,
            }}>
                <View style={{ flex: 0.8, flexDirection: 'column' }}>
                    <View>
                        <Text style={{ color: '#000000', fontSize: 18, fontWeight: '500', padding: 3 }}>
                            {item.vehicleNumber}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ color: '#8D8B8E', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', fontSize: 16, padding: 3 }}>
                            {REPAIR.ORDER_ID}: <Text>{item.orderNumber}</Text>
                        </Text>
                    </View>
                    <View>
                        <Text style={{ color: '#8D8B8E', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', fontSize: 16, padding: 3 }}>{item.workStatus}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("ChatDetail", { item: item, getRepairorder: this.getRepairorder.bind(this), })} activeOpacity={0.7}>
                        <View>
                            <Text
                                style={{ color: 'red', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', fontSize: 16, padding: 3 }}>{REPAIR.START_CONVERSATION}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 0.2, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    {/* <View style={{ paddingBottom: 5 }}>
                        <Text style={{ color: '#6B6B6B' }}>
                            {moment(item.createdAt, 'YYYY-MM-DD HH:mm a').format("HH:mm a")}
                        </Text>
                    </View> */}
                    <View>
                        {
                            item.clientCount != 0 ?
                                <Badge
                                    value={item.clientCount}
                                    textStyle={{ color: 'white' }}
                                    containerStyle={{ backgroundColor: '#3CD80D', borderRadius: 40 }}
                                />
                                :
                                null
                        }
                    </View>

                </View>



            </View>



        );

    }


    openModal = (item) => {
        this.setState({ visibleModal: true, repairDetails: item })
    }

    closeModal(val) {
        if (val) {
            this.props.navigation.navigate("Payments")
        }
        this.setState({ visibleModal: false, }, () => {

        })
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



    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Header title={REPAIR.CHAT} navigateClick={() => this.props.navigation.navigate('DrawerOpen')} />
                    {
                        this.state.isLoading ?
                            <CustomSpinner /> : null
                    }


                    <View style={{
                        flexDirection: 'row',
                        paddingBottom:5
                        //  shadowColor: '#999',
                        //  shadowOffset: { width: 40, height: 50 },
                        // shadowOpacity: 0.8,
                        // shadowRadius: 10,
                        // elevation: 1,
                        // borderColor: '#dcdcdc',
                        // borderWidth: 1
                    }}>
                        <TouchableOpacity onPress={() => { this.setState({ upcoming: true, past: false }) }}
                            style={{ flex: 1, backgroundColor: (this.state.upcoming) ? 'white' : '#8D8B8E', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <View >
                                <Text style={{ color: (this.state.upcoming) ? '#ff3333' : '#ffffff', fontSize: 18, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', alignSelf: 'center' }}>{MESSAGES.INPROGRESS_REPAIR_MESSAGES}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ upcoming: false, past: true }) }}
                            style={{ flex: 1, backgroundColor: (this.state.past) ? 'white' : '#8D8B8E', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <View >
                                <Text style={{ color: (this.state.past) ? '#ff3333' : '#ffffff', fontSize: 18, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', alignSelf: 'center' }}>{MESSAGES.PAST_REPAIR_MESSAGES}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <ScrollView>
                        {/* <View style={styles.currentView}>
                            <Text style={styles.currentRepairText}>{REPAIR.CURRENT_REPAIR_WORK}</Text>
                        </View> */}

                        {
                            this.state.isLoading ?
                                null :
                                <View>

                                    <ScrollView>
                                        {
                                            this.state.upcoming ?
                                                <FlatList
                                                    data={this.state.progressOrder}
                                                    keyExtractor={this._keyExtractor.bind(this)}
                                                    ItemSeparatorComponent={() => <View style={{
                                                        // margin: 2,
                                                        // borderBottomWidth: 1, borderColor: '#ccc'
                                                    }} />}
                                                    renderItem={this._renderProgressView.bind(this)}
                                                    ListHeaderComponent={() => (!this.state.progressOrder.length ?
                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
                                                            <Text style={{ fontSize: 16, color: 'black' }}>{REPAIR.NO_MESSAGESDATA}</Text>
                                                        </View>
                                                        : null)
                                                    }
                                                /> : <View />
                                        }


                                    </ScrollView>


                                </View>
                        }


                        {/* <View style={{ backgroundColor: '#8D8B8E', padding: 10 }}>
                            <Text style={{ color: 'white', fontSize: 16 }}>{REPAIR.PAST_REPAIR_WORK}</Text>
                        </View> */}
                        {
                            this.state.isLoading ?
                                null :
                                <View>
                                    <ScrollView>
                                        {
                                            this.state.past ?
                                                <FlatList
                                                    data={this.state.completedOrder}
                                                    keyExtractor={this._keyExtractor.bind(this)}
                                                    renderItem={this._renderItemView.bind(this)}
                                                    ItemSeparatorComponent={() => <View style={{
                                                        margin: 2,
                                                        borderBottomWidth: 1, borderColor: '#ccc'
                                                    }} />}
                                                    ListHeaderComponent={() => (!this.state.completedOrder.length ?
                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
                                                            <Text style={{ fontSize: 16, color: 'black' }}>{REPAIR.NO_MESSAGESDATA}</Text>
                                                        </View>
                                                        : null)
                                                    }
                                                /> : <View />
                                        }

                                    </ScrollView>

                                </View>
                        }
                    </ScrollView>
                    <View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default Chat


