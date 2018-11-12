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
import Header from '../../Common/Header'
import * as MESSAGES from '../../Constant'
import { Button, Icon, CheckBox } from 'react-native-elements'
import * as firebase from "firebase";
// import Modal from 'react-native-simple-modal';
import Modal from "react-native-modal";
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { getRepairDatail, getNotes } from '../../Actions/RepairAction';
import { addPaymentData } from '../../Actions/Homeactions';
import SignatureCapture from 'react-native-signature-capture';
import { CustomSpinner } from '../../Common/CustomSpinner';
import moment from 'moment'
const { width, height } = Dimensions.get("window")
import { styles } from './styles'
const datas = [
    { date: '12 May 2018', VehicleNumber: 'HCW2058', state: 'Completed', money: 350 },
    { date: '02 May 2018', VehicleNumber: 'HCW2058', state: 'Completed', money: 550 },
    { date: '26 April 2018', VehicleNumber: 'HCW2058', state: 'Completed', money: 350 },
    { date: '26 April 2018', VehicleNumber: 'HCW2058', state: 'Completed', money: 350 },
]
import Authorizebudget from '.././../Common/Authorizebudget/index'
import credit from '../../Assets/img/Repair/Visa-icon-Payment.png'
import paypal from '../../Assets/img/Repair/PayPal-Payment.png'
import notes from '../../Assets/img/Repair/notes.png'

import PayPal from 'react-native-paypal-wrapper';
import { paypalClientId } from '../../Config'

import * as REPAIR from '../../Constant'

class Repairwork extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            repairorders: [],
            progressOrder:  [{'vehicleNumber':'Ch01 BA 3813', 'createdAt':'28-06-2018', 'status':'Pending','orderNumber':'#001234','workStatus':'Pending','repairCost':'30'},{'vehicleNumber':'Ch01 BA 3813', 'createdAt':'28-06-2018','status':'Pending','orderNumber':'#001234','workStatus':'Pending','repairCost':'30'},{'vehicleNumber':'Ch01 BA 3813', 'createdAt':'28-06-2018','status':'Pending','orderNumber':'#001234','workStatus':'Budget','repairCost':'30','paymentStatus':'Paid'}],
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


        
    }


    // getRepairorder() {
    //     this.setState({ getLoading: true, isLoading: true })
    //     getRepairDatail().then((res) => {

    //         console.log(res, 'resresresresresresresresresres')
    //         this.setState({ repairorders: res, isLoading: true })
    //         console.log(this.state.repairorders, 'repairordersrepairordersrepairordersrepairorders')
    //         if (this.state.repairorders && this.state.repairorders.length > 0) {

    //             let complete = [];
    //             let progress = [];
    //             let count = 0;

    //             this.state.repairorders && this.state.repairorders.length > 0 && this.state.repairorders.forEach((upcoming, index) => {
    //                 ++count
    //                 if (upcoming.workStatus == 'Completed' || upcoming.workStatus == 'Cancelled') {
    //                     complete.push(upcoming)

    //                 } else {
    //                     progress.push(upcoming)
    //                 }

    //                 if (count == this.state.repairorders.length) {

    //                     this.setState({ progressOrder: progress, completedOrder: complete, getLoading: false, isLoading: false })
    //                 }
    //             })
    //         }
    //         else {

    //             this.setState({ getLoading: false, isLoading: false })
    //         }

    //     }).catch((err) => {

    //         console.log(err.message, 'resresresresresresresresresres')
    //         this.setState({ getLoading: false, isLoading: false })
    //     })
    // }


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
            <TouchableOpacity onPress={() => this.props.navigation.navigate("RepairWorkDetail", { item: item })} >
                <View style={styles.repairDetailView}>

                    <View style={styles.upperSection}>
                        <View>
                            <Text style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>
                                <Text style={{ color: '#8D8B8E', fontWeight: 'bold' }}>{REPAIR.VEHICLE_NUMBER}: </Text><Text style={{ color: '#8D8B8E' }}>{item.vehicleNumber}</Text>
                            </Text>
                        </View>
                        {/* <View>
                            <Text style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>
                                <Text style={{ color: '#8D8B8E', fontWeight: 'bold' }}>{REPAIR.ORDER_ID}: </Text><Text>{item.orderNumber}</Text>
                            </Text>
                        </View> */}

                        <View>
                            <Text style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>
                                <Text style={{ color: '#8D8B8E', fontWeight: 'bold' }}>{REPAIR.CREATED_AT}:</Text>  {moment(item.createdAt, 'YYYY-MM-DD HH:mm a').format("DD-MM-YYYY")}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold' }]}>
                                {REPAIR.STATUS}:
                            </Text>
                            <Text
                                style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>{item.workStatus} </Text>

                            {/* <View>
                            <TouchableOpacity onPress={() => this.notesHistory(item)}>
                                <Image source={notes} style={{ height: 20, width: 20 }} />
                            </TouchableOpacity>
                        </View> */}

                        </View>

                    </View>


                    {(item.repairCost && item.workStatus == 'Budget' && item.paymentStatus == 'Paid') ?
                        <View style={styles.bottomSection}>
                            <Text style={styles.repairCost}>
                                <Text style={styles.dollarText}>$</Text>{item.repairCost}
                            </Text>
                            {/* <TouchableOpacity onPress={this.openModal.bind(this, item)}> */}
                            <View style={[styles.payButton, { backgroundColor: 'green' }]}>
                                <Text style={styles.payText}>{REPAIR.PAID}</Text>
                            </View>
                            {/* </TouchableOpacity> */}
                        </View>
                        :

                        (item.repairCost && item.workStatus == 'Budget') ?
                            <View style={styles.bottomSection}>
                                <Text style={styles.repairCost}>
                                    <Text style={styles.dollarText}>$</Text>{item.repairCost}
                                </Text>
                                <TouchableOpacity onPress={this.openModal.bind(this, item)}>
                                    <View style={styles.payButton}>
                                        <Text style={styles.payText}>{REPAIR.PAY}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            null

                    }
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



    _keyExtractor = (item, index) => index + 'CompletedRepairList';
    _renderItemView = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("RepairWorkDetail", { item: item })} >
                <View style={styles.repairDetailView}>

                    <View style={styles.upperSection}>
                        <View>
                            <Text style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>
                                <Text style={{ color: '#8D8B8E', fontWeight: 'bold' }}> {REPAIR.VEHICLE_NUMBER}:</Text> <Text style={{ color: '#8D8B8E' }}>{item.vehicleNumber}</Text>
                            </Text>
                        </View>
                        <View>
                            <Text style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>
                                <Text style={{ color: '#8D8B8E', fontWeight: 'bold' }}>{REPAIR.ORDER_ID}:</Text> <Text>{item.orderNumber}</Text>
                            </Text>
                        </View>

                        <View>
                            <Text style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>
                                <Text style={{ color: '#8D8B8E', fontWeight: 'bold' }}>{REPAIR.CREATED_AT}:  </Text>{moment(item.createdAt, 'YYYY-MM-DD HH:mm a').format("DD-MM-YYYY")}
                            </Text>
                        </View>

                        <View>
                            <Text style={[styles.paddingText, { color: (item.workStatus == "Completed") ? 'green' : 'red', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>
                                <Text style={{ color: '#8D8B8E', fontWeight: 'bold' }}>{REPAIR.STATUS}:  </Text>{item.workStatus}
                            </Text>
                        </View>


                        {/* <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>
                                {REPAIR.STATUS}:
                            </Text>
                            <Text style={[styles.paddingText, { color: (item.workStatus == "Completed") ? 'green' : 'red' }]}>{item.workStatus}</Text>

                            <View>
                            <TouchableOpacity onPress={() => this.notesHistory(item)}>
                                <Image source={notes} style={{ height: 20, width: 20 }} />
                            </TouchableOpacity>
                        </View>

                        </View> */}

                    </View>

                    {item.repairCost ?
                        <View style={styles.bottomSection}>

                            <Text style={styles.repairCost}>
                                <Text style={styles.dollarText}>$</Text>{item.repairCost}
                            </Text>

                            <View style={[styles.payButton, { backgroundColor: (item.workStatus == "Completed") ? 'green' : 'red' }]}>
                                <Text style={styles.payText}>{(item.workStatus == "Completed") ? REPAIR.PAID : REPAIR.CANCELLED}</Text>
                            </View>
                        </View> :
                        null
                    }
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

    _keyExtractor = (item, index) => index + 'NoteList';



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
                <View style={styles.container}>
                    <Header title={REPAIR.REPAIR_WORK} navigateClick={() => this.props.navigation.navigate('DrawerOpen')} />
                    {
                        this.state.isLoading ?
                            <CustomSpinner /> : null
                    }
                    <View style={{
                        flexDirection: 'row',
                        // shadowColor: '#999',
                        // shadowOffset: { width: 40, height: 50 },
                        // shadowOpacity: 0.8,
                        // shadowRadius: 10,
                        // elevation: 1,
                        // borderColor: '#dcdcdc',
                        // borderWidth: 1
                    }}>
                        <TouchableOpacity onPress={() => { this.setState({ upcoming: true, past: false }) }}
                            style={{ flex: 1, backgroundColor: (this.state.upcoming) ? 'white' : '#8D8B8E', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <View >
                                <Text style={{ color: (this.state.upcoming) ? '#ff3333' : '#ffffff', fontSize: 18, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold' }}>{MESSAGES.CURRENT}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ upcoming: false, past: true }) }}
                            style={{ flex: 1, backgroundColor: (this.state.past) ? 'white' : '#8D8B8E', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <View >
                                <Text style={{ color: (this.state.past) ? '#ff3333' : '#ffffff', fontSize: 18, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold' }}>{MESSAGES.PREVIOUS}</Text>
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
                                                    // ItemSeparatorComponent={() => <View style={{
                                                    //     margin: 2,
                                                    //     borderBottomWidth: 1, borderColor: '#ccc'
                                                    // }} />}
                                                    renderItem={this._renderProgressView.bind(this)}
                                                    ListHeaderComponent={() => (!this.state.progressOrder.length ?
                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
                                                            <Text style={{ fontSize: 16, color: 'black' }}>{REPAIR.CURRENT_REPAIR_WORK_NODATA}</Text>
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
                                                    data={this.state.progressOrder}
                                                    keyExtractor={this._keyExtractor.bind(this)}
                                                    renderItem={this._renderItemView.bind(this)}
                                                    // ItemSeparatorComponent={() => <View style={{
                                                    //     margin: 2,
                                                    //     borderBottomWidth: 1, borderColor: '#ccc'
                                                    // }} />}
                                                    ListHeaderComponent={() => (!this.state.progressOrder.length ?
                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
                                                            <Text style={{ fontSize: 16, color: 'black' }}>{REPAIR.PAST_REPAIR_WORK_NODATA}</Text>
                                                        </View>
                                                        : null)
                                                    }
                                                /> : <View />
                                        }

                                    </ScrollView>

                                </View>
                        }
                    </ScrollView>
                    {
                        this.state.visibleModal ?
                            <Authorizebudget item={this.state.repairDetails}
                                orderKey={this.state.repairDetails.key}
                                //invoiceKey={this.state.repairDetails.invoiceKey}
                                closeModal={this.closeModal.bind(this)} /> : null
                    }

                    <View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default Repairwork


