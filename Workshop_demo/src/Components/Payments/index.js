import React, { Component } from 'react'

import {
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    ScrollView,
    FlatList,
    StyleSheet,
    TextInput,
    SafeAreaView
} from 'react-native'
import Header from '../../Common/Header'
import { styles } from './styles'
import * as firebase from "firebase";
import { getPayments, getPyamentsPending } from '../../Actions/Homeactions'
import moment from 'moment'

import * as PAYMENTS from '../../Constant'
import Authorizebudget from '.././../Common/Authorizebudget/index'


class Payments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalPayments: [{'vehicleNumber':'Ch01 BA 3813', 'createdAt':'28-06-2018', 'status':'Pending','orderNumber':'#001234','workStatus':'Pending','repairCost':'30','paymentID':'#12345','paymentStatus':'Unpaid'},{'vehicleNumber':'Ch01 BA 3813', 'createdAt':'28-06-2018','status':'Pending','orderNumber':'#001234','workStatus':'Pending','repairCost':'30','paymentID':'#12345','paymentStatus':'Unpaid'},{'vehicleNumber':'Ch01 BA 3813', 'createdAt':'28-06-2018','status':'Pending','orderNumber':'#001234','workStatus':'Budget','repairCost':'30','paymentStatus':'Unpaid','paymentID':'#12345'}],
            repairDetails: {},
            totalPendingPayments: [],
            paidPayment: false,
            pendingPayments: true
        }

    }

    componentWillMount() {
       // alert('payment');
        let userId = '_qweqwe23423533453455';

        // let userId = firebase.auth().currentUser.uid;
        // getPayments(userId).then((res) => {
        //     console.log(res, "res")
        //     if (res) {
        //         this.setState({
        //             totalPayments: res.reverse()
        //         })
        //         console.log(this.state.totalPayments)
        //     } else {
        //         this.setState({
        //             totalPayments: res
        //         })
        //     }
        // }).catch((err) => {
        //     console.log("err...", err)
        // })


        // getPyamentsPending(userId).then((res) => {
        //     if (res) {
        //         let data = res.filter((x => (x.workStatus == 'Budget' || x.workStatus == 'Cancelled') && (x.paymentStatus == 'Unpaid' || x.paymentStatus == 'Budget Rejected')))
        //         this.setState({
        //             totalPendingPayments: data
        //         })
        //     } else {
        //         this.setState({
        //             totalPendingPayments: res
        //         })
        //     }
        // }).catch((err) => {
        //     console.log("err...", err)
        // })

    }

    _keyExtractor = (item, index) => index + 'invoicesList';
    _renderPayments = ({ item, index }) => {

        let date = moment(item.createdDate).format("DD MMM YYYY")
        return (
            <TouchableOpacity onPress={() => { this.props.navigation.navigate("RepairWorkDetail", { item: item }) }} activeOpacity={0.7}>
                <View style={styles.vehicleFlatlistView}>
                    <Text style={styles.vehicleText}>{item.paymentID}</Text>
                    <View style={styles.mainView}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text></Text>
                            <Text style={styles.orderNumber}>{PAYMENTS.ORDER_ID}: <Text>{item.orderNumber}</Text></Text>
                            {/* <Text style={styles.orderNumber}>payment Id: <Text style={item && item.repairStatus == 'Done' ? { color: 'green' } : { color: 'red' }}>
                            {item.paymentID}
                        </Text></Text> */}
                            <Text style={styles.orderNumber}>{PAYMENTS.PAYMENT_STATUS}: <Text style={{
                                color: 'green',
                                fontSize: 16, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold'
                            }}>
                                {item.paymentStatus}
                            </Text></Text>
                        </View>
                        <View style={styles.repairTextAndDate}>
                            <Text style={styles.repairCost}><Text style={styles.dollarText}>$</Text> {(item.repairCost)}</Text>
                            <Text style={styles.invoiceCreatedDate}>
                                {item.createdAt}
                                {/*  */}
                            </Text>
                        </View>
                        {/* {item.paymentStatus == 'Unpaid' ? <View>
                            <TouchableOpacity onPress={this.openModal.bind(this, item)}>
                                <View style={styles.payButton}>
                                    <Text style={styles.payText}>{PAYMENTS.PAY}</Text>
                                </View>
                            </TouchableOpacity>
                        </View> : <View />} */}
                    </View>
                    {/* {date} */}
                    {/* { moment(new Date(item.createdAt)).format("DD MMM YYYY")} */}
                </View >
            </TouchableOpacity>
        )
    }



    _keyExtractor = (item, index) => index + 'pendingPaymentList';
    _renderPendingPayments = ({ item, index }) => {

        let date = moment(item.createdAt).format("DD MMM YYYY")
        return (
            <TouchableOpacity onPress={() => { this.props.navigation.navigate("RepairWorkDetail", { item: item }) }} activeOpacity={0.7}>
                <View style={styles.vehicleFlatlistView}>
                    {/* <Text style={styles.vehicleText}>{item.paymentID}</Text> */}
                    <View style={styles.mainView}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text></Text>
                            <Text style={styles.orderNumber}>{PAYMENTS.ORDER_ID}: <Text>{item.orderNumber}</Text></Text>
                            {/* <Text style={styles.orderNumber}>payment Id: <Text style={item && item.repairStatus == 'Done' ? { color: 'green' } : { color: 'red' }}>
                            {item.paymentID}
                        </Text></Text> */}
                            <Text style={styles.orderNumber}>{PAYMENTS.PAYMENT_STATUS}: <Text style={{ color: 'red' }}>
                                {item.paymentStatus}
                            </Text></Text>
                        </View>
                        <View style={styles.repairTextAndDate}>
                            <Text style={styles.repairCost}><Text style={styles.dollarText}>$</Text> {(item.repairCost)}</Text>
                            <Text style={styles.invoiceCreatedDate}>
                                {item.orderDate}
                                {/*  */}
                            </Text>
                        </View>
                        {/* {item.paymentStatus == 'Unpaid' ? <View>
                            <TouchableOpacity onPress={this.openModal.bind(this, item)}>
                                <View style={styles.payButton}>
                                    <Text style={styles.payText}>{PAYMENTS.PAY}</Text>
                                </View>
                            </TouchableOpacity>
                        </View> : <View />} */}
                    </View>
                    {/* {date} */}
                    {/* { moment(new Date(item.createdAt)).format("DD MMM YYYY")} */}
                </View >
            </TouchableOpacity>
        )
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
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={PAYMENTS.MY_PAYMENTS} navigateClick={() => this.props.navigation.navigate('DrawerOpen')} />
                    <ScrollView>

                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 5
                            // shadowColor: '#999',
                            // shadowOffset: { width: 40, height: 50 },
                            // shadowOpacity: 0.8,
                            // shadowRadius: 10,
                            // elevation: 1,
                            // borderColor: '#dcdcdc',
                            // borderWidth: 1
                        }}>
                            <TouchableOpacity onPress={() => { this.setState({ paidPayment: false, pendingPayments: true }) }}
                                style={{ flex: 1, backgroundColor: (this.state.pendingPayments) ? 'white' : '#8D8B8E', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                <View >
                                    <Text style={{ color: (this.state.pendingPayments) ? '#ff3333' : '#ffffff', fontSize: 18, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', alignSelf: 'center' }}>{PAYMENTS.PENDINGPAYMENTS}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.setState({ paidPayment: true, pendingPayments: false }) }}
                                style={{ flex: 1, backgroundColor: (this.state.paidPayment) ? 'white' : '#8D8B8E', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                <View >
                                    <Text style={{ color: (this.state.paidPayment) ? '#ff3333' : '#ffffff', fontSize: 18, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', alignSelf: 'center' }}>{PAYMENTS.DONEPAYMENTS}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                        {/* <View style={styles.myInvoices}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.myInvoiceText}>{PAYMENTS.MY_PAYMENTS}</Text>
                            </View>
                        </View> */}
                        <View>

                            <ScrollView>
                                {
                                    this.state.paidPayment ?
                                        <FlatList
                                            extraData={this.state.totalPayments}
                                            data={this.state.totalPayments}
                                            keyExtractor={this._keyExtractor.bind(this)}
                                            renderItem={this._renderPayments.bind(this)}
                                            ListHeaderComponent={() => (!this.state.totalPayments.length ?
                                                <View style={styles.nodataView}>
                                                    <Text style={styles.nodataText}>{PAYMENTS.NOPAYMENTS}</Text>
                                                </View>
                                                : null)
                                            }
                                        /> : <View />
                                }
                            </ScrollView>


                            <ScrollView>
                                {
                                    this.state.pendingPayments ?
                                        <FlatList
                                            extraData={this.state.totalPayments}
                                            data={this.state.totalPayments}
                                            keyExtractor={this._keyExtractor.bind(this)}
                                            renderItem={this._renderPendingPayments.bind(this)}
                                            ListHeaderComponent={() => (!this.state.totalPayments.length ?
                                                <View style={styles.nodataView}>
                                                    <Text style={styles.nodataText}>{PAYMENTS.NOPAYMENTS}</Text>
                                                </View>
                                                : null)
                                            }
                                        /> : <View />
                                }
                            </ScrollView>


                        </View>
                    </ScrollView>
                </View>
                {
                    this.state.visibleModal ?
                        <Authorizebudget item={this.state.repairDetails}
                            orderKey={this.state.repairDetails.orderKey}
                            invoiceKey={this.state.repairDetails.key}
                            closeModal={this.closeModal.bind(this)} /> : null
                }
            </SafeAreaView>
        )
    }
}

export default Payments