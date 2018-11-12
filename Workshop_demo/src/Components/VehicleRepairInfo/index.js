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
import { Button, Icon, CheckBox } from 'react-native-elements'
import * as firebase from "firebase";
// import Modal from 'react-native-simple-modal';
import Modal from "react-native-modal";
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { getRepairDatail, getNotes, getRepairDatailParticular } from '../../Actions/RepairAction';
import { addPaymentData, getVehiclesByNotification } from '../../Actions/Homeactions';
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

class VehicleRepairInfo extends Component {
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
            past: false,
            vehicleArr: []
        }

    }

    componentWillMount() {
        const { params } = this.props.navigation.state

        if (params && params.vehicleNumberFromNotification) {
            getVehiclesByNotification(params.vehicleNumberFromNotification).then((res) => {
                if (res && res.length > 0) {
                    debugger
                    this.setState({
                        vehicleArr: res
                    })
                }
            })
        } else {
            params && params.vehicleArr && params.vehicleArr.length ? this.setState({
                vehicleArr: params.vehicleArr
            }) : []
        }

        this.getRepairorder()
    }


    getRepairorder() {

        this.setState({ getLoading: true, isLoading: true })
        const { params } = this.props.navigation.state
        console.log(params, 'paramsparams')

        getRepairDatailParticular(params.vehicleNumber).then((res) => {
            console.log(res, 'resresresresresresresresresres')
            this.setState({ repairorders: res, isLoading: true })
            console.log(this.state.repairorders, 'repairordersrepairordersrepairordersrepairorders')

            let userId = '_qweqwe23423533453455';
            
            //let userId = firebase.auth().currentUser.uid;

            if (this.state.repairorders && this.state.repairorders.length > 0) {

                let totalData = [];

                totalData = this.state.repairorders && this.state.repairorders.length > 0 && this.state.repairorders.filter(x => x.uid == userId)

                this.setState({ progressOrder: totalData, getLoading: false, isLoading: false })

                console.log("this.state.progressOrder", this.state.progressOrder)
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

    MaintenanceDate(nextMaintenanceDates) {
        totalMaintenanceDate = null;
        totalMaintenanceDate = nextMaintenanceDates.map((item, inx) => {
            return (
                <View key={inx + 'MaintenanceDate'} style={{
                    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, paddingHorizontal: 5, backgroundColor: (inx + 1) % 2 == 0 ? null : '#F3F1F1'
                }}>
                    <Text style={[styles.paddingText, { color: '#6B6B6B' }]}>
                        <Text style={{ color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold' }}>{item && item.type ? item.type : '---'}</Text>
                    </Text>
                    <Text style={[styles.paddingText, { color: '#6B6B6B' }]}>
                        <Text style={{ color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3', }}>{item && item.date ? item.date : '---'}</Text>
                    </Text>
                </View >
            )
        })
        return (
            totalMaintenanceDate
        )
    }

    // Maintence View

    _renderMaintenanceView = ({ item, index }) => {

        let orderNumber = {
            orderNumber: item.orderNumber
        }
        console.log(item, "itemitem")
        console.log(" item.nextMaintenanceDate", item.nextMaintenanceDate)
        return (
            <View style={styles.repairDetailView2}>

                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View style={{ borderBottomColor: '#DCDCDC', borderBottomWidth: 1 }}>
                        {/* <Text style={[styles.paddingText, { color: '#6B6B6B' }]}>
                            <Text style={{ color: '#6B6B6B', fontSize: 18, fontWeight: 'bold' }}>{item.vehicleName}</Text>
                        </Text>
                        <Text style={[styles.paddingText, { color: '#6B6B6B' }]}>
                            <Text style={{ color: '#6B6B6B', fontSize: 12, fontWeight: 'bold' }}>{`${' ( '}` + `${item.vehicleNumber}` + `${' )'}`}</Text>
                        </Text> */}

                        <Text style={{ color: '#6B6B6B', alignSelf: 'center', paddingVertical: 12 }}>
                            <Text style={{ color: '#ff3333', fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>{REPAIR.NEXT_MAINTENANCE_DATES}</Text>
                        </Text>
                    </View>
                    <View>
                        {
                            item && item.nextMaintenanceDates ?
                                this.MaintenanceDate(item.nextMaintenanceDates) :
                                null
                        }


                    </View>
                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatDetail', { item: orderNumber, goBackParam: true })}>
                        <View style={{
                            flex: 1, marginHorizontal: width / 8, backgroundColor: '#ff3333', justifyContent: 'center', alignItems: 'center', paddingVertical: 10,
                            borderRadius: 10, marginTop: 10
                        }}>
                            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>{REPAIR.START_CONVERSATION}</Text>
                        </View>

                    </TouchableOpacity> */}
                </View>

            </View>
        )

    }
    _keyExtractor = (item, index) => index + 'InProgressRepairList';
    // Progress View
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



    _keyExtractor = (item, index) => index + 'NoteList';
    _renderItemViewForNote = ({ item, index }) => {
        return (
            <View style={[styles.repairDetailView, { borderBottomColor: 'grey', borderBottomWidth: 1, opacity: 0.7 }]}>
                <ScrollView>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        padding: 5
                    }}>
                        <View>
                            <Text style={[styles.textPaddingForModalContent, { fontSize: 12 }]}>
                                {moment(item.createdAt, 'YYYY-MM-DD HH:mm a').format("DD-MM-YYYY HH:mm")}
                            </Text>
                        </View>
                        {/* <View>
                            <Text style={styles.textPaddingForModalContent}>
                                Order Number: <Text>{item.orderNumber}</Text>
                            </Text>
                        </View> */}
                        <View>
                            <Text style={[styles.textPaddingForModalContent, { fontSize: 12 }]}>
                                {REPAIR.STATUS}: <Text style={{ color: 'red' }}>{item.workStatus}</Text>
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={[styles.textPaddingForModalContent, { color: 'black', fontWeight: 'bold' }]}>
                                Note:
                        </Text>
                            <Text style={[styles.textPaddingForModalContent, { fontWeight: 'bold', fontSize: 12 }]}>{item.note}</Text>
                        </View>

                    </View>
                    {/* {item.repairCost ?
                    <View style={styles.bottomSection}>

                        <Text style={styles.repairCost}>
                            <Text style={styles.dollarText}>$</Text>{item.repairCost}
                        </Text>

                        <View style={[styles.payButton, { backgroundColor: 'green' }]}>
                            <Text style={styles.payText}>{REPAIR.PAID}</Text>
                        </View>
                    </View> :
                    null
                } */}
                </ScrollView>

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
    payment = () => {
        console.log(this.state.repairDetails.orderNumber, "orderNumber orderNumber ")
        let userId = '_qweqwe23423533453455';

        // let userId = firebase.auth().currentUser.uid;
        PayPal.initialize(PayPal.NO_NETWORK, paypalClientId);
        PayPal.pay({
            price: this.state.repairDetails.repairCost,
            currency: 'USD',
            description: 'Repair cost',
        }).then(confirm => {
            console.log(confirm);
            let paymentData = {}
            paymentData["uid"] = userId
            paymentData["paymentMethod"] = this.state.paymentMethod
            paymentData["repairCost"] = this.state.repairDetails.repairCost
            paymentData["paymentID"] = confirm.response.id
            paymentData["state"] = confirm.response.state
            paymentData["createdAt"] = moment(confirm.response.create_time).format("YYYY-MMM-DD hh:mm A")
            paymentData["orderNumber"] = (this.state.repairDetails && this.state.repairDetails.orderNumber) ?
                this.state.repairDetails.orderNumber : 67878585787

            addPaymentData(userId, paymentData).then((res) => {
                this.setState({
                    open: false
                })
                console.log((res, "addPaymentDataaddPaymentData"))
            })
        }, (error) => {
            console.log(error);
            // console.log(confirm))
        })
        // .catch(error => console.log(error));
    }
    changeBudgetStatus = async (key) => {
        await this.refs["sign"].saveImage();
    }
    saveSign() {
        this.refs["sign"].saveImage();
    }


    resetSign() {
        this.refs["sign"].resetImage();
    }
    _onSaveEvent(result) {

        if (result && result.encoded && result.encoded.length) {

            let refName = "images"
            let user = firebase.auth().currentUser;
            try {

                firebase.storage().ref().child(`RepairOrders/` + this.state.repairDetails.key + '/images/signed_and auth_budget.png')
                    .putString(result.encoded, 'base64').then((uploadFile) => {
                        this.setState({ isLoading: false, visibleModal: false, open: true })



                    }, (err) => {
                        this.setState({ isLoading: false, visibleModal: false, open: true })


                        this.setState({ isLoading: false, visibleModal: false })
                    }).catch((err) => {
                        this.payment()
                    })
            }
            catch (error) {
                this.setState({ isLoading: false, visibleModal: false, open: true })

            }


        } else {
            console.log(result, " result.encoded")

        }

    }

    saveDocument = (getPath, refName, key, user, fileName) => {

        // return getPath.getDownloadURL().then((downloadURL) => {

        let uId = firebase.database().ref(`repairOrder/${key}/documents`).push().key
        refName = refName.length > 3 ? refName.slice(0, refName.length - 1) : refName

        let model = {
            fileType: refName,
            fileName: fileName,
            url: getPath,
            isBudget: false,
            createdOn: moment().format('YYYY MMM DD HH:mm a'),
            key: uId,
            uploadBy: user.email
        }
        firebase.database().ref(`repairOrder/${key}/documents/${uId}`).update(model)
        // });
    }
    _onDragEvent() {
        console.log("dragged");
    }
    gobacktoPrevious = () => {
        this.props.navigation.navigate('MyVehicles')
    }

    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={[styles.container, { backgroundColor: this.state.past ? 'white' : null }]}>
                    <Header title={REPAIR.REPAIR_WORK} navigateClick={() => this.gobacktoPrevious()} leftIcon='ios-arrow-back' />
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
                                <Text style={{ color: (this.state.upcoming) ? '#ff3333' : '#ffffff', fontSize: 18, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', alignSelf: 'center' }}>{REPAIR.REPAIR_CURRENT_PREVIOUS}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ upcoming: false, past: true }) }}
                            style={{ flex: 1, backgroundColor: (this.state.past) ? 'white' : '#8D8B8E', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <View >
                                <Text style={{ color: (this.state.past) ? '#ff3333' : '#ffffff', fontSize: 18, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', alignSelf: 'center' }}>{REPAIR.MAINTENANCE} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>

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
                                        {
                                            this.state.past ?
                                                <FlatList
                                                    data={this.state.vehicleArr}
                                                    keyExtractor={this._keyExtractor.bind(this)}
                                                    // ItemSeparatorComponent={() => <View style={{
                                                    //     margin: 2,
                                                    //     borderBottomWidth: 1, borderColor: '#ccc'
                                                    // }} />}
                                                    renderItem={this._renderMaintenanceView.bind(this)}
                                                    ListHeaderComponent={() => (!this.state.vehicleArr.length ?
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
                    </ScrollView>
                    <View>
                        {
                            this.state.visibleModal ?
                                <Authorizebudget item={this.state.repairDetails} closeModal={this.closeModal.bind(this)} /> : null
                        }
                        <Modal
                            isVisible={this.state.visible}
                            backdropColor={'rgba(0.30,0.30,0.30,0.70)'}
                            backdropOpacity={0.4}
                            onBackButtonPress={() => this.setState({ visible: false })}
                            onBackdropPress={() => this.setState({ visible: false })}
                            style={{ width: '95%', alignSelf: 'center', }}>


                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                                <View style={styles.ModalInsideView}>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, opacity: 0.7, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginVertical: 10, paddingBottom: 10 }}>
                                        <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{REPAIR.NOTES_HISTORY}</Text>
                                    </View>
                                    <ScrollView>
                                        <View style={{ paddingBottom: 10 }}>

                                            <FlatList
                                                data={this.state.notesList}
                                                keyExtractor={this._keyExtractor.bind(this)}
                                                renderItem={this._renderItemViewForNote.bind(this)}
                                                ListHeaderComponent={() => (!this.state.notesList.length ?
                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
                                                        <Text style={{ fontSize: 16, color: 'black' }}>{REPAIR.NO_NOTES}</Text>
                                                    </View>
                                                    : null)
                                                }
                                            />
                                        </View>
                                    </ScrollView>


                                </View>

                            </View>
                        </Modal>


                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

export default VehicleRepairInfo
