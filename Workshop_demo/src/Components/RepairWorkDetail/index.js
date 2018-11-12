import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Text, TextInput,
    SafeAreaView,
    ActivityIndicator, AsyncStorage, FlatList, ScrollView, Dimensions, TouchableHighlight
} from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'

import backgroundVideo from './background.mp4'

import Header from '../../Common/Header'
import { Button, Icon, CheckBox } from 'react-native-elements'
import * as firebase from "firebase";
import Modal from "react-native-modal";
import Moda from 'react-native-simple-modal';
import SignatureCapture from 'react-native-signature-capture';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { getRepairDatail, getRepairWorkSingleItem, getNotes, getRepairDatailByOrderNumber } from '../../Actions/RepairAction';
import { CustomSpinner } from '../../Common/CustomSpinner';
import moment from 'moment'
const { width, height } = Dimensions.get("window")
import { styles } from './styles'
import credit from '../../Assets/img/Repair/Visa-icon-Payment.png'
import paypal from '../../Assets/img/Repair/PayPal-Payment.png'
import Video from 'react-native-video'
const equalWidth = (width / 2)
// import pdfIcon from '../../Assets/img/Repair/pdf_icon.png'
import pdfIcon from '../../Assets/img/pdf.png'
import video from '../../Assets/img/video.png'

import PayPal from 'react-native-paypal-wrapper';
import { paypalClientId } from '../../Config'
import * as REPAIR from '../../Constant'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Authorizebudget from '.././../Common/Authorizebudget/index'

import * as REPAIRDETAIL from '../../Constant'

class RepairWorkDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            repairorders: [],
            progressOrder: [],
            completedOrder: [],
            isLoading: false,
            getLoading: false,
            repairDetails: {},
            visibleModal: false,
            checked: false,
            sign: false,
            // base64: ''
            documents: [],
            paused: true,
            isLoading: false,
            notAuthorize: false,
            orderCancleReason: '',
            authorizeModal: false,
            paymentMethod: '',
            unauthorizeModal: false,
            orderNumber: null,
            notesList: []
        }
        this.document = []

    }

    componentWillMount() {
        console.log(this.props.navigation.state.params);
        if (this.props.navigation.state.params && this.props.navigation.state.params.orderNumber) {
            console.log("if part")

            getRepairDatailByOrderNumber(this.props.navigation.state.params.orderNumber).then((res) => {
                this.setState({
                    isLoading: true,
                    orderNumber: (this.props.navigation.state.params && this.props.navigation.state.params.orderNumber ?
                        this.props.navigation.state.params.orderNumber : null),
                    repairDetails: res
                }, () => {
                    this.getNotesDoc(this.state.orderNumber)
                })
            }).catch((err) => {
                console.log(err)
            })

        }
        else {
            console.log("else part")
            this.setState({
                isLoading: true,
                orderNumber: (this.props.navigation.state.params && this.props.navigation.state.params.item ?
                    this.props.navigation.state.params.item.orderNumber : null),
                repairDetails: (this.props.navigation.state.params && this.props.navigation.state.params.item ?
                    this.props.navigation.state.params.item : {})
            }, () => {
                this.getNotesDoc(this.state.orderNumber)
            })
        }
        // firebase.database().ref(`repairOrder/`).orderByChild('orderNumber')
        // .equalTo(this.state.orderNumber)
        // .once('value', (snapshot) => {
        //     console.log(Object.values(snapshot.val()),"Object.values(snapshot.val())Object.values(snapshot.val())")
        //     let data
        //     if (snapshot.exists()) {

        //         data = Object.values(snapshot.val());
        //         this.setState({repairDetails:data[0]},()=>{
        //             let documents = []
        //             if (this.state.repairDetails && this.state.repairDetails.documents) {
        //                 for (let i in this.state.repairDetails.documents) {
        //                     if (i) {
        //                         documents.push(this.state.repairDetails.documents[i])
        //                     }
        //                 }
        //                 this.setState({ documents })
        //             }
        //             this.setState({
        //                 isLoading: false,
        //             })
        //         })
        //         resolve(data[0])

        //     } else {
        //         data = null
        //         resolve(data)
        //     }
        // }, function (err) {

        //     reject("please check your credential");
        // });

        // })

        // if (this.props.navigation.state.params && this.props.navigation.state.params.repairDetail) {

        //     getRepairDatail().then((res) => {

        //     })


        // }
        // else {
        //     console.log("this.props.navigation.state.params.item", this.props.navigation.state.params.item)
        //     this.setState({
        //         isLoading: true,
        //         repairDetails: (this.props.navigation.state.params && this.props.navigation.state.params.item ?
        //             this.props.navigation.state.params.item : null)
        //     }, () => {
        //         console.log(this.state.repairDetails)
        //         let documents = []
        //         if (this.state.repairDetails && this.state.repairDetails.documents) {
        //             for (let i in this.state.repairDetails.documents) {
        //                 if (i) {
        //                     documents.push(this.state.repairDetails.documents[i])
        //                 }
        //             }
        //             this.setState({ documents })
        //         }
        //         this.setState({
        //             isLoading: false,
        //         })
        //         // alert(JSON.stringify(this.state.repairDetails), "this.state.repairDetailsthis.state.repairDetails")
        //     })
        //     // this.getRepairorder()
        // }



    }

    //getNotes 
    getNotesDoc = (orderNumber) => {
        getNotes(orderNumber).then((res) => {
            if (res && res.length) {
                this.setState({
                    notesList: res.reverse(),
                    visible: true,
                    isLoading: false,
                }, () => {
                })
            } else {
                this.setState({
                    notesList: res.reverse(),
                    visible: true,
                    isLoading: false,
                })
            }
        }).catch((err) => {
            this.setState({
                notesList: [],
                visible: false,
                isLoading: false,

            })
        })
    }

    getRepairorder() {

        this.setState({ getLoading: true })

        getRepairDatail().then((res) => {
            this.setState({ repairorders: res, isLoading: true })
            if (this.state.repairorders && this.state.repairorders.length > 0) {
                let complete = [];
                let progress = [];
                let count = 0;
                this.state.repairorders && this.state.repairorders.length > 0 && this.state.repairorders.forEach((upcoming, index) => {
                    ++count
                    if (upcoming.workStatus == 'Completed') {
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

    changeBudgetStatus = async (key) => {
        console.log(key, "keykeykeykey")
        if (this.state.notAuthorize) {
            let data = {}
            data["workStatus"] = "Cancelled"
            data["paymentStatus"] = "Budget Rejected"
            data["note"] = this.state.orderCancleReason
            console.log(data, "datadatadatadatadatadata")
            firebase.database().ref('repairOrder/' + this.state.repairDetails.key).update(data).then((res) => {
                this.setState({ isLoading: false, visibleModal: false }, () => {
                    this.props.navigation.navigate('Repairwork')
                })
            }, (err) => {
                this.setState({ isLoading: false, visibleModal: false })
            })
        } else {
            await this.refs["sign"].saveImage();
        }
    }
    openModal = () => {
        this.setState({ visibleModal: true })
    }

    closeModal(val) {
        if (val) {
            this.props.navigation.navigate("Payments")
        }
        this.setState({ authorizeModal: false, })
    }
    saveSign() {
        this.refs["sign"].saveImage();
    }
    // openModal = () => this.setState({ open: true })

    resetSign() {
        this.refs["sign"].resetImage();
    }

    payment = () => {

        // console.log(this.state.repairDetails.orderNumber,"orderNumber orderNumber ")
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
            alert(`${REPAIRDETAIL.PAYMENT_SUCCESS}`);
             let userId = '_qweqwe23423533453455';

            // let userId = firebase.auth().currentUser.uid;
            let dbref = firebase.database().ref().child("/repairOrder/" + this.state.repairDetails.key)
            dbref.update({
                payment_status: confirm.response.state,
            })
        }, (error) => {
            console.log(error);
            // console.log(confirm))
        })
        // .catch(error => console.log(error));
    }
    _onSaveEvent(result) {

        if (result && result.encoded && result.encoded.length) {

            let refName = "images"
            let user = firebase.auth().currentUser;
            try {

                firebase.storage().ref().child(`RepairOrders/` + this.state.repairDetails.key + '/images/signed_and auth_budget.png')
                    .putString(result.encoded, 'base64').then((uploadFile) => {
                        this.setState({ isLoading: false, visibleModal: false, open: true })

                        // let fileName = uploadFile.metadata.name
                        // let getPath = firebase.storage().ref().child(`RepairOrders/${this.state.repairDetails.key}/images/signed_and auth_budget.png`)
                        // this.saveDocument(getPath, refName, this.state.repairDetails.key, user, fileName)

                        // firebase.database().ref('repairOrder/' + this.state.repairDetails.key).update({ workStatus: 'Authorized budget' }).then((res) => {
                        //     this.setState({ isLoading: false, visibleModal: false }, () => {
                        //         this.props.navigation.navigate('Repairwork')
                        //     })
                        // }, (err) => {


                        //     this.setState({ isLoading: false, visibleModal: false })
                        // })

                    }, (err) => {
                        this.setState({ isLoading: false, visibleModal: false, open: true })
                        // let getPath = 'https://firebasestorage.googleapis.com/v0/b/workshop-car.appspot.com/o/no-image.png?alt=media&token=2abfd63e-e9a9-4dae-aa00-f48d7cd22ad0';
                        // this.saveDocument(getPath, refName, this.state.repairDetails.key, user, 'signed_and auth_budget.png')

                        // firebase.database().ref('repairOrder/' + this.state.repairDetails.key).update({ workStatus: 'Authorized budget' }).then((res) => {
                        //     this.setState({ isLoading: false, visibleModal: false }, () => {
                        //         this.props.navigation.navigate('Repairwork')
                        //     })
                        // }, (err) => {


                        //     this.setState({ isLoading: false, visibleModal: false })
                        // })

                        this.setState({ isLoading: false, visibleModal: false })
                    }).catch((err) => {
                        this.payment()
                    })
            }
            catch (error) {
                this.setState({ isLoading: false, visibleModal: false, open: true })
                // let getPath = 'https://firebasestorage.googleapis.com/v0/b/workshop-car.appspot.com/o/no-image.png?alt=media&token=2abfd63e-e9a9-4dae-aa00-f48d7cd22ad0';
                // this.saveDocument(getPath, refName, this.state.repairDetails.key, user, 'signed_and auth_budget.png')

                // firebase.database().ref('repairOrder/' + this.state.repairDetails.key).update({ workStatus: 'Authorized budget' }).then((res) => {
                //     this.setState({ isLoading: false, visibleModal: false }, () => {
                //         this.props.navigation.navigate('Repairwork')
                //     })
                // }, (err) => {


                //     this.setState({ isLoading: false, visibleModal: false })
                // })

                // this.setState({ isLoading: false, visibleModal: false })
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
        // This callback will be called when the user enters signature
        console.log("dragged");
    }

    // closeModal = () => this.setState({ open: false })
    _keyExtractor = (item, index) => index + "dddd1111";
    _keyExtractorNot = (item, index) => index + "note pic";


    // Video Player function
    downLoadFile = (url) => {
        // this.setState({isLoading : true})
        if (url) {
            RNFetchBlob
                .config({
                    useDownloadManager: true,
                    fileCache: true,
                    addAndroidDownloads: {
                        // Show notification when response data transmitted
                        useDownloadManager: true,
                        notification: true,
                        mediaScannable: true,
                    }
                })
                .fetch('GET', url, {})
                .then((res) => {

                    // this.setState({isLoading : false})
                    alert(`${REPAIRDETAIL.DOWNLOAD_SUCCESS}`);

                }).catch((err) => {
                    console.log(err.message, "res.path()res.path()res.path()");

                })
        }

    }
    _renderItemViewForNote({ item, index }) {

        return (

            // <View style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, flexDirection: 'column', justifyContent: 'center', borderBottomColor: '#E9E9E9', borderBottomWidth: 2 }} >
            //     <View><Text>{item.orderNumber}</Text></View>
            //     <View><Text></Text></View>
            //     <View><Text></Text></View>
            // </View>

            <View style={[styles.repairDetailView, {
                shadowOpacity: 0.8,
                shadowRadius: 10,
                elevation: 2,
                borderColor: '#dcdcdc',
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 20,
                paddingBottom: 12
            }]}>
                <ScrollView>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',

                    }}>
                        <View style={{
                            flex: 1,
                            paddingBottom: 10,
                            // borderBottomColor: 'grey', borderBottomWidth: 1, 
                        }} >
                            <View style={{
                                flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff3333', padding: 7,
                                borderTopRightRadius: 10, borderTopLeftRadius: 10
                            }}>
                                <Text style={[styles.textPaddingForModalContent, { fontSize: 16, color: 'white', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold' }]}>
                                    {REPAIR.STATUS}: <Text style={{ color: 'white' }}>{item.workStatus}</Text>
                                </Text>

                            </View>


                            <View style={{
                                flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 7
                            }}>
                                <Text style={[styles.textPaddingForModalContent, { fontSize: 16, color: '#8D8B8E', fontFamily: 'HiraginoSansCNS-W3', }]}>
                                    {moment(item.createdAt, 'YYYY-MM-DD HH:mm a').format("DD-MM-YYYY HH:mm")}
                                </Text>
                            </View>

                            {/* <View>
                            <Text style={styles.textPaddingForModalContent}>
                                Order Number: <Text>{item.orderNumber}</Text>
                            </Text>
                        </View> */}
                            {/* <View>
                            <Text style={[styles.textPaddingForModalContent, { fontSize: 12 }]}>
                                {REPAIR.STATUS}: <Text style={{ color: 'red' }}>{item.workStatus}</Text>
                            </Text>
                        </View>*/}
                            <View style={{ flex: 1, flexDirection: 'row', padding: 7 }}>

                                <Text style={[styles.textPaddingForModalContent, { fontSize: 16, color: '#8D8B8E', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold' }]}>
                                    {REPAIR.INFORMATION}:
                                </Text>
                                <Text style={[styles.textPaddingForModalContent, { fontSize: 16, color: '#8D8B8E', fontFamily: 'HiraginoSansCNS-W3', }]}>
                                    {item.note}

                                </Text>
                                {/* <Text style={[styles.textPaddingForModalContent, { fontWeight: 'bold', fontSize: 12 }]}>{item.note}</Text> */}
                            </View>
                        </View>

                        {item.documents && item.documents.length > 0 ?

                            <View style={{ paddingTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: '#ff3333', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold' }}>{REPAIR.SHARED_INFO}</Text>
                            </View>
                            : null

                        }
                        <View style={{ paddingTop: 10, flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>

                            {
                                item.documents && item.documents.length > 0 ?
                                    this.renderImages(item.documents)
                                    : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 16, color: '#8D8B8E', fontFamily: 'HiraginoSansCNS-W3' }}>{REPAIRDETAIL.NODOCUMENTS}</Text></View>

                            }
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

    //Render Images 
    renderImages(images) {
        // debugger
        let documentrender = null;
        let documents = [];
        //to ensure three images appear in a row
        for (let index = 0; index < images.length; index = index + 3) {
            documents.push({
                image1: { url: images[index].url, fileType: images[index].fileType },
                image2: (index + 1) < images.length ? { url: images[index + 1].url, fileType: images[index + 1].fileType } : null,
                image3: (index + 2) < images.length ? { url: images[index + 2].url, fileType: images[index + 2].fileType } : null
            });
        }
        // debugger
        console.log(documents, "documents")
        documents && documents.length > 0 ?
            documentrender = documents.map((item, inx) => {
                return (
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} key={inx + 'doc'}>
                        {
                            item.image1 ?
                                <View style={{ padding: 5 }}>



                                    {item.image1.fileType == 'video' &&
                                        <TouchableOpacity onPress={() => this.downLoadFile(item.image1.url)}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                                                <Image style={{ height: 100, width: 100 }}
                                                    source={video}
                                                />
                                                <Text style={{ fontSize: 14, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', color: 'red' }}>{REPAIR.VIDEO}</Text>
                                                {/* <Video
                                                    source={{ uri: item.image1.url }}
                                                    paused={this.state.paused}
                                                    resizeMode="cover"
                                                    style={{ height: 100, width: 100 }}
                                                /> */}
                                            </View>
                                        </TouchableOpacity>
                                    }

                                    {item.image1.fileType == 'image' &&
                                        <TouchableOpacity onPress={() => this.downLoadFile(item.image1.url)}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                <Image style={{ height: 100, width: 100 }}
                                                    source={{ uri: item.image1.url }} resizeMode="cover" />
                                                <Text style={{ fontSize: 14, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', color: 'red' }}>{REPAIR.IMAGE}</Text>
                                            </View>
                                        </TouchableOpacity>}

                                    {item.image1.fileType == 'pdf' &&
                                        <TouchableOpacity onPress={() => this.downLoadFile(item.image1.url)}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                                                <Image style={{ height: 100, width: 100 }}
                                                    source={pdfIcon}
                                                />

                                                <Text style={{ fontSize: 14, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', color: 'red' }}>{REPAIR.PDF}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }


                                </View> : null

                        }
                        {
                            item.image2 ?
                                <View style={{ padding: 5 }}>

                                    <View>
                                        <TouchableOpacity onPress={() => this.downLoadFile(item.image2.url)}>
                                            {item.image2.fileType == 'video' &&
                                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                                                    <Image style={{ height: 100, width: 100 }}
                                                        source={video}
                                                    />

                                                    <Text style={{ fontSize: 14, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', color: 'red' }}>{REPAIR.VIDEO}</Text>

                                                </View>
                                                // <Video
                                                //     source={{ uri: item.image2.url }}
                                                //     paused={this.state.paused}
                                                //     resizeMode="cover"
                                                //     style={{ height: 100, width: 100 }}
                                                // />

                                            }
                                        </TouchableOpacity>
                                        {item.image2.fileType == 'image' &&
                                            <TouchableOpacity onPress={() => this.downLoadFile(item.image2.url)}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                                                    <Image style={{ height: 100, width: 100 }}
                                                        source={{ uri: item.image2.url }} resizeMode="cover" />


                                                    <Text style={{ fontSize: 14, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', color: 'red' }}>{REPAIR.IMAGE}</Text>

                                                </View>
                                            </TouchableOpacity>}

                                        {item.image2.fileType == 'pdf' &&
                                            <TouchableOpacity onPress={() => this.downLoadFile(item.image2.url)}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                                                    <Image style={{ height: 100, width: 100 }}
                                                        source={pdfIcon}
                                                    />

                                                    <Text style={{ fontSize: 14, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', color: 'red' }}>{REPAIR.PDF}</Text>

                                                </View>
                                            </TouchableOpacity>
                                        }
                                    </View>

                                </View> : null
                        }
                        {
                            item.image3 ?
                                <View style={{ padding: 5, }}>

                                    <View style={{}}>
                                        <TouchableOpacity onPress={() => this.downLoadFile(item.image3.url)}>
                                            {item.image3 && item.image3.fileType == 'video' &&
                                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                                                    <Image style={{ height: 100, width: 100 }}
                                                        source={video}
                                                    />


                                                    <Text style={{ fontSize: 14, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', color: 'red' }}>{REPAIR.VIDEO}</Text>

                                                    {/* // <Video
                                                //     source={{ uri: item.image3.url }}
                                                //     paused={this.state.paused}
                                                //     resizeMode="cover"
                                                //     style={{ height: 100, width: 100 }}
                                                // /> */}

                                                </View>
                                            }
                                        </TouchableOpacity>
                                        {item.image3 && item.image3.fileType == 'image' &&
                                            <TouchableOpacity onPress={() => this.downLoadFile(item.image3.url)}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                                                    <Image style={{ height: 100, width: 100 }}
                                                        source={{ uri: item.image3.url }} resizeMode="cover" />

                                                    <Text style={{ fontSize: 14, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', color: 'red' }}>{REPAIR.IMAGE}</Text>

                                                </View>
                                            </TouchableOpacity>}

                                        {item.image3 && item.image3.fileType == 'pdf' &&
                                            <TouchableOpacity onPress={() => this.downLoadFile(item.image3.url)}>

                                                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                                                    <Image style={{ height: 100, width: 100 }}
                                                        source={pdfIcon}
                                                    />


                                                    <Text style={{ fontSize: 14, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', color: 'red' }}>{REPAIR.PDF}</Text>

                                                </View>
                                            </TouchableOpacity>
                                        }
                                    </View>

                                </View> : null
                        }
                    </View>
                )
            }) : null
        return (
            <View>
                {documentrender}
            </View>
        )
    }
    // renderRowItem = ({item}) => {
    //     debugger
    //     return (
    //         <View style={{ flex: 1, padding: 2 }}>

    //             <TouchableOpacity onPress={() => this.downLoadFile(item.url)}>
    //                 {item.fileType == 'video' &&
    //                     <Video
    //                         source={{ uri: item.url }}
    //                         paused={this.state.paused}
    //                         resizeMode="cover"
    //                         style={{ height: 100, width: 100 }}
    //                     />

    //                 }
    //             </TouchableOpacity>
    //             {item.fileType == 'image' &&
    //                 <TouchableOpacity onPress={() => this.downLoadFile(item.url)}>
    //                     <Image style={{ height: 100, width: 100 }}
    //                         source={{ uri: item.url }} resizeMode="cover" />
    //                 </TouchableOpacity>}

    //             {item.fileType == 'pdf' &&
    //                 <TouchableOpacity onPress={() => this.downLoadFile(item.url)}>
    //                     <Image style={{ height: 100, width: 100 }}
    //                         source={pdfIcon}
    //                     />
    //                 </TouchableOpacity>
    //             }
    //         </View>
    //     )
    // }

    gobacktoPrevious = () => {

        this.props.navigation.goBack()
       // this.props.navigation.navigate('Home')
        // }
        // else {
        //     this.props.navigation.goBack()
        // }

    }
    render() {
        let item = {
            orderNumber: this.state.repairDetails.orderNumber
        }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={REPAIRDETAIL.REPAIR_WORK_DETAIL} navigateClick={() => this.gobacktoPrevious()} leftIcon='ios-arrow-back' />
                    {
                        this.state.isLoading && <CustomSpinner /> ?
                            <CustomSpinner /> : null
                    }

                    <ScrollView>
                        {/* <View style={styles.currentView}>
                            <Text style={styles.currentRepairText}>{REPAIRDETAIL.REPAIR_WORK_DETAIL}</Text>
                        </View> */}

                        {
                            this.state.isLoading ?
                                null :
                                <View>
                                    <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center' }}>


                                        <View style={{ padding: 7 }}>
                                            <Text style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>
                                                <Text style={{ color: '#8D8B8E', fontWeight: 'bold' }}>{REPAIRDETAIL.ORDER_ID}: </Text><Text style={{ color: '#8D8B8E', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold' }}>{this.state.repairDetails.orderNumber}</Text>
                                            </Text>
                                        </View>

                                        <View style={{ backgroundColor: '#F3F1F1', padding: 7 }}>
                                            <Text style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>
                                                <Text style={{ color: '#8D8B8E', fontWeight: 'bold' }}>{REPAIRDETAIL.VEHICLE}: </Text><Text style={{ color: '#8D8B8E' }}>{this.state.repairDetails.vehicleNumber}</Text>
                                            </Text>
                                        </View>

                                        <View style={{ padding: 7 }}>
                                            <Text style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>
                                                <Text style={{ color: '#8D8B8E', fontWeight: 'bold' }}>{REPAIRDETAIL.WORKS_STATUS}: </Text><Text style={{ color: '#8D8B8E' }}>{this.state.repairDetails.workStatus}</Text>
                                            </Text>
                                        </View>

                                        <View style={{ backgroundColor: '#F3F1F1', padding: 7 }}>
                                            <Text style={[styles.paddingText, { color: '#8D8B8E', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }]}>
                                                <Text style={{ color: '#8D8B8E', fontWeight: 'bold' }}>{REPAIRDETAIL.COST}: </Text><Text style={{ color: '#8D8B8E' }}> $ {this.state.repairDetails.repairCost ? this.state.repairDetails.repairCost : ' - '}</Text>
                                            </Text>
                                        </View>


                                        {/* <View style={{ flex: 1.2, justifyContent: 'center', alignContent: 'center', padding: 10 }}>
                                            <View style={{ flex: 1, }}>
                                                <Text numberOfLines={1}>{REPAIRDETAIL.ORDER_ID}: {this.state.repairDetails.orderNumber}</Text>
                                            </View>
                                        </View> */}
                                        {/* <View style={{ flex: 0.8, justifyContent: 'center', alignContent: 'center', padding: 10, backgroundColor: '' }}>
                                            <View >
                                                <Text numberOfLines={1}>{REPAIRDETAIL.VEHICLE}: {this.state.repairDetails.vehicleNumber}</Text>
                                            </View>
                                        </View> */}
                                    </View>
                                    {/* <View style={{ flex: 1.2, flexDirection: 'row', alignContent: 'center' }}>
                                        <View style={{ flex: 1.2, justifyContent: 'center', alignContent: 'center', padding: 10 }}>
                                            <View>
                                                <Text>{REPAIRDETAIL.WORKS_STATUS}: <Text style={{ color: 'red' }}>{this.state.repairDetails.workStatus}</Text></Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.8, justifyContent: 'center', alignContent: 'center', padding: 10 }}>
                                            <View>
                                                <Text>{REPAIRDETAIL.COST}
                                               
                                                    : $ {this.state.repairDetails.repairCost ? this.state.repairDetails.repairCost : ' - '}</Text>

                                            </View>
                                        </View>
                                    </View> */}



                                    {
                                        (this.state.repairDetails.workStatus == "Budget" && this.state.repairDetails.paymentStatus == 'Unpaid') ?

                                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={styles.buttonView}>
                                                    <Button
                                                        title={REPAIRDETAIL.AUTHORIZE_BUDGET}
                                                        color='white'
                                                        buttonStyle={[styles.buttonStyle, { backgroundColor: 'green' }]}
                                                        textStyle={{ fontSize: 12 }}
                                                        onPress={() => {
                                                            this.setState({ authorizeModal: true, unauthorizeModal: false, }, () => {
                                                            })
                                                        }}
                                                    />
                                                </View>
                                                <View style={styles.buttonView}>
                                                    <Button
                                                        title={REPAIRDETAIL.UNAUTHORIZE_BUDGET}
                                                        color='white'
                                                        buttonStyle={[styles.buttonStyle, { backgroundColor: '#ff3333' }]}
                                                        textStyle={{ fontSize: 12 }}
                                                        onPress={() => {
                                                            this.setState({ unauthorizeModal: true, authorizeModal: false }, () => {
                                                                this.openModal()
                                                            })
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                            : <View />
                                    }
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatDetail', { item: item, goBackParam: true })}>
                                        <View style={{
                                            flex: 1, marginHorizontal: width / 6, backgroundColor: '#ff3333', justifyContent: 'center', alignItems: 'center', paddingVertical: 10,
                                            borderRadius: 5, marginVertical: 15
                                        }}>
                                            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>{REPAIR.START_CONVERSATION}</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                        }


                        {/* <View style={{ backgroundColor: '#8D8B8E', padding: 10 }}>
                            <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold' }}>{REPAIRDETAIL.NOTES_HISTORY}</Text>

                        </View>
                        {
                            this.state.isLoading ?
                                null :
                                <View style={styles.MainContainer}>
                                    {this.state.notesList && this.state.notesList.length > 0 ? <FlatList
                                        data={this.state.notesList}
                                        keyExtractor={this._keyExtractor.bind(this)}
                                        renderItem={this._renderItemViewForNote.bind(this)}
                                        ListEmptyComponent={() => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text>{REPAIRDETAIL.NODOCUMENTS}</Text></View>}

                                    /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text>{REPAIRDETAIL.NODOCUMENTS}</Text></View>
                                    }


                                </View>
                        } */}
                        {
                            this.state.authorizeModal ?
                                <Authorizebudget item={this.state.repairDetails}
                                    orderKey={this.state.repairDetails.key}
                                    invoiceKey={this.state.repairDetails.invoiceKey}
                                    closeModal={this.closeModal.bind(this)} /> : null
                        }
                        <Modal
                            isVisible={this.state.visibleModal}
                            backdropColor={'rgba(0.30,0.30,0.30,0.70)'}
                            backdropOpacity={0.4}
                            onBackButtonPress={() => this.setState({ visibleModal: false })}
                            onBackdropPress={() => this.setState({ visibleModal: false })}
                            style={{ width: '95%', alignSelf: 'center', }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                                <View style={styles.ModalInsideView}>

                                    <View onPress={() => this.setState({ sign: true })} style={{ marginBottom: 5 }}>
                                        <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
                                            {REPAIRDETAIL.CANCEL_REASON}
                                        </Text>
                                    </View>
                                    {
                                        (this.state.unauthorizeModal) ?
                                            <View>
                                                <View style={{ borderColor: '#777', borderWidth: 1 }}>
                                                    <TextInput
                                                        multiline={true}
                                                        textAlignVertical="top"
                                                        numberOfLines={4}
                                                        underlineColorAndroid={"transparent"}
                                                        onChangeText={(text) => this.setState({ orderCancleReason: text })}
                                                        value={this.state.orderCancleReason}
                                                    />
                                                </View>
                                                <CheckBox
                                                    title='I do not authorize this budget'
                                                    checked={this.state.notAuthorize}
                                                    onPress={() => this.setState({ notAuthorize: !this.state.notAuthorize, checked: false })}
                                                />
                                            </View> : <View />
                                    }
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, paddingTop: 10 }}>

                                        <View style={{ width: '50%' }}>
                                            <Button
                                                title={REPAIRDETAIL.CANCEL}
                                                color='white'
                                                onPress={() => this.setState({ visibleModal: false })}

                                                buttonStyle={{
                                                    backgroundColor: "#504d50",
                                                    borderRadius: 50
                                                }}
                                                textStyle={{ color: '#fff' }}
                                            />
                                        </View>

                                        <View style={{ width: '50%' }}>
                                            <Button
                                                title={REPAIRDETAIL.SUBMIT}
                                                color='white'
                                                onPress={() => (this.state.notAuthorize && this.state.orderCancleReason) ? this.changeBudgetStatus(this.state.repairDetails.key) :
                                                    alert(`${REPAIRDETAIL.FIRST_UNAUTHORIZE}`)}
                                                buttonStyle={{
                                                    backgroundColor: "#ff3333",
                                                    borderRadius: 50
                                                }}
                                                textStyle={{ color: '#fff' }}
                                            />
                                        </View>

                                    </View>
                                </View>

                            </View>

                        </Modal>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}


function mapStateToProps(state) {
    return {
    }
}

function mapDispathToProps(dispatch) {
    return bindActionCreators({ getRepairWorkSingleItem, dispatch }, dispatch);
}
export default connect(mapStateToProps, mapDispathToProps)(RepairWorkDetail)




