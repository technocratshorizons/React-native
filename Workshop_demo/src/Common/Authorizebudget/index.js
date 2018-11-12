import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Text,
    Platform,
    ActivityIndicator, AsyncStorage, FlatList, ScrollView, Dimensions
} from 'react-native'
//import Icon from 'react-native-vector-icons/FontAwesome';
// import Header from '../../Common/Header'
import { Button, Icon, CheckBox } from 'react-native-elements'
import * as firebase from "firebase";
import Modal from "react-native-modal";
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
// import { getRepairDatail } from '../../Actions/RepairAction';
import { addPaymentData } from '../../Actions/Homeactions';
import { getUserExits } from '../../Actions/AuthAction';

import * as AUTHBUDGET from '../../Constant'

// import { CustomSpinner } from '../../Common/CustomSpinner';
import moment from 'moment'
import RNFetchBlob from 'react-native-fetch-blob'
const { width, height } = Dimensions.get("window")
import { styles } from './styles'
import SignatureCapture from 'react-native-signature-capture';
import credit from '../../Assets/img/Repair/Visa-icon-Payment.png'
import paypal from '../../Assets/img/Repair/PayPal-Payment.png'
import PayPal from 'react-native-paypal-wrapper';
import { paypalClientId } from '../../Config'
import * as REPAIR from '../../Constant'
import { sendEmail } from '../../Actions/ChatAction';


class Authorizebudget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            // repairorders: [],
            // progressOrder: [],
            // completedOrder: [],
            isLoading: false,
            getLoading: false,
            paymentMethod: 'Paypal',
            repairDetails: {},
            visibleModal: true,
            fileName: ''
        }

    }

    componentWillMount() {
        this.setState({
            repairDetails: (this.props && this.props.item ?
                this.props.item : null)
        }, () => {
            console.log(this.state.repairDetails,
                "this.state.repairDetailsthis.state.repairDetailsthis.state.repairDetails")
            // let documents = []
            // if (this.state.repairDetails && this.state.repairDetails.documents) {
            //     for (let i in this.state.repairDetails.documents) {
            //         if (i) {
            //             documents.push(this.state.repairDetails.documents[i])
            //         }
            //     }
            //     this.setState({ documents })
            // }
            // this.setState({
            //     isLoading: false,
            // })
            // alert(JSON.stringify(this.state.repairDetails), "this.state.repairDetailsthis.state.repairDetails")
        })

        // this.getRepairorder()
    }

    // changeBudgetStatus = async (key) => {
    //     console.log(key, "keykeykeykey")
    //     await this.refs["sign"].saveImage();
    // }
    openModal = () => {
        this.setState({ visibleModal: true })
    }

    closeModal = () => this.setState({ visibleModal: false })

    payment = () => {
        console.log(this.props.invoiceKey)
        // debugger
        this.setState({ isLoading: true })
        let userId = firebase.auth().currentUser;
        new PayPal.initialize(PayPal.NO_NETWORK, paypalClientId);
        new PayPal.pay({
            price: this.state.repairDetails.repairCost,
            currency: 'USD',
            description: 'Repair cost',
        }).then(confirm => {
            console.log(confirm);
            let paymentData = {}
            paymentData["uid"] = userId.uid
            paymentData["paymentMethod"] = this.state.paymentMethod
            paymentData["repairCost"] = this.state.repairDetails.repairCost
            paymentData["paymentID"] = confirm.response.id
            paymentData["state"] = confirm.response.state
            paymentData["paymentStatus"] = 'Paid'
            paymentData['vehicleNumber'] = this.state.repairDetails.vehicleNumber
            paymentData["createdAt"] = moment(confirm.response.create_time).format("YYYY-MMM-DD hh:mm A")
            paymentData["orderNumber"] = this.state.repairDetails.orderNumber
            paymentData["workStatus"] = "Budget"
            addPaymentData(userId.uid, paymentData).then((res) => {
                // debugger
                let data = {}
                data["workStatus"] = "Authorized budget"
                data["paymentStatus"] = "Paid"
                firebase.database().ref('repairOrder/' + this.props.orderKey).update(data).then((res) => {
                    getUserExits(userId.uid).then((res) => {
                        console.log(res)
                        if (res) {
                            let payment_message = {
                                from: res.email,
                                to: 'gourav@beyondroot.com',
                                date: moment().format('YYYY-MM-DD'),
                                time: moment().format('hh:mm a'),
                                message: `Payment recieved with paymentID : ${confirm.response.id}\n OrderNumber: ${this.state.repairDetails.orderNumber} \n TotalCost : ${this.state.repairDetails.repairCost}`,
                                isRead: false,
                                subject: 'Payment Recieved',
                                uid: userId.uid,
                                contactNumber: res.contact
                            }
                            // debugger
                            sendEmail(payment_message).then((res) => {
                                console.log(res)
                            }).catch((err) => {
                                console.log(err, "err")
                            })
                        }
                    }).catch((err) => {
                        console.log("Err", err);
                    })

                    this.setState({
                        open: false
                    }, () => {
                        this.props.closeModal(true)
                    })
                    let refName = "images"
                    //   let getPath = firebase.storage().ref().child(`RepairOrders/${this.props.orderKey}/images/signed_and auth_budget.png`)
                    //this.saveDocument(getPath, refName, this.props.orderKey, userId, this.state.fileName)

                    // })
                }, (err) => {
                    this.setState({ isLoading: false, visibleModal: false })
                })
                this.setState({
                    open: false
                })
                console.log((res, "addPaymentDataaddPaymentData"))
            })
            // alert("Payment Sucessfull")
        }, (error) => {
            console.log(error);
        })
    }
    changeBudgetStatus = async (key) => {

        await this.refs["sign"].saveImage();
    }
    saveSign() {
        this.refs["sign"].saveImage();
    }
    // openModal = () => this.setState({ open: true })

    resetSign() {
        this.refs["sign"].resetImage();
    }
    // uploadImage = (path) => {
    //     debugger
    //     const Blob = RNFetchBlob.polyfill.Blob
    //     const fs = RNFetchBlob.fs
    //     window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    //     window.Blob = Blob
    //     return new Promise((resolve, reject) => {
    //         debugger
    //     const imageFile = RNFetchBlob.wrap(path);
    //         //  const imageFile = RNFetchBlob.wrap(path);
    //         let uploadBlob = null
    //         // const imageRef = firebaseApp.storage().ref('posts').child(imageName)
    //         const imageRef  = firebase.storage().ref().child(`RepairOrdersNote/` + this.props.orderKey + '/images/signed_and auth_budget.png')
    //         debugger
    //         fs.readFile(imageFile, 'utf8')
    //         .then((data) => {
    //             debugger
    //           return Blob.build(data, { type: `${'image/png'};utf8` })
    //         })
    //         .then((blob) => {
    //             debugger
    //           uploadBlob = blob
    //           return imageRef.put(blob, { contentType: 'image/png' }).then((uploadFile) => {
    //                             this.setState({ fileName: uploadFile.metadata.name, visibleModal: false, open: true }, () => {
    //                      });
    //             });
    //         //   imageRef.put(blob, { contentType: mime })
    //         })
    //         .then(() => {
    //             debugger
    //           uploadBlob.close()
    //          return imageRef.getDownloadURL()
    //         })
    //         .then((url) => {
    //             debugger
    //           resolve(url)
    //         })
    //         .catch((error) => {
    //             debugger
    //           reject(error)
    //         })
    //     })
    //   }
    uploadImage(path) {
        debugger
        let Blob = RNFetchBlob.polyfill.Blob;
        let fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        const imageFile = RNFetchBlob.wrap(path);
        // 'path/to/image' is where you wish to put your image in
        // the database, if you would like to put it in the folder
        // 'subfolder' inside 'mainFolder' and name it 'myImage', just 
        // replace it with 'mainFolder/subfolder/myImage'
        const ref = firebase.storage().ref().child(`RepairOrdersNote/` + this.props.orderKey + '/images/signed_and auth_budget.png')
        var uploadBlob = null;
        this.setState({ visibleModal: false, open: true });

        //todo
        // Blob.build(imageFile, { type: 'image/png;' })
        //     .then((imageBlob) => {
        //         uploadBlob = imageBlob;
        //         return ref.put(imageBlob, { contentType: 'image/png' }).then((uploadFile) => {
        //             this.setState({ fileName: uploadFile.metadata.name, visibleModal: false, open: true }, () => {
        //             });
        //             uploadBlob.close();
        //         })
        //     })
        // .then(() => {
        //     debugger
        //     uploadBlob.close();
        //     console.log(ref.getDownloadURL(),"console.log(ref.getDownloadURL())console.log(ref.getDownloadURL())")
        //     return ref.getDownloadURL();
        // })
        // .((url) => {
        //     // do something with the url if you wish to
        // })
        // .catch(() => {
        //     debugger
        //     dispatch({
        //         type: UPDATE_PROFILE_INFO_FAIL,
        //         payload: 'Unable to upload profile picture, please try again'
        //     });
        // });
    }
    _onSaveEvent(result) {
        console.log(result, " console.log(result)")
        // debugger
        this.setState({ visibleModal: false, open: true });
        // this.uploadImage(result.pathName)
    }

    saveDocument = (getPath, refName, key, user, fileName) => {
        return getPath.getDownloadURL().then((downloadURL) => {
            let uId = firebase.database().ref(`repairOrderNotes/${key}/documents`).push().key
            refName = refName.length > 3 ? refName.slice(0, refName.length - 1) : refName
            let documents = {
                fileType: "refName",
                fileName: fileName,
                url: downloadURL,
                // url: getPath,
                isBudget: false,
                createdOn: moment().format('YYYY MMM DD HH:mm a'),
                key: uId,
                uploadBy: user.email

            }
            firebase.database().ref(`/repairOrderNotes/${key}/documents/${uId}`).update(documents)
        });
    }
    _onDragEvent() {
        // This callback will be called when the user enters signature
        console.log("dragged");
    }

    // closeModal = () => this.setState({ open: false })
    _keyExtractor = (item, index) => index + "dddd";


    // Video Player function
    downLoadFile(url) {
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

                    alert(`${AUTHBUDGET.DOWNLOAD_SUCCESS}`);

                }).catch((err) => {
                    console.log(err.message, "res.path()res.path()res.path()");

                })
        }

    }
    render() {

        return (
            <View style={styles.container}>

                <Modal
                    isVisible={this.state.visibleModal || this.state.open}
                    backdropColor={'rgba(0.30,0.30,0.30,0.70)'}
                    backdropOpacity={0.4}
                    onBackButtonPress={() => this.setState({ visibleModal: false, open: false }, () => {
                        this.props.closeModal()
                    })}
                    onBackdropPress={() => this.setState({ visibleModal: false, open: false }, () => {
                        this.props.closeModal()
                    })}
                    style={{ width: '95%', alignSelf: 'center', }}>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        <View style={styles.ModalInsideView}>
                            {
                                (this.state.visibleModal) ?
                                    <View>
                                        <View onPress={() => this.setState({ sign: true })} style={{ marginBottom: 5 }}>
                                            <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
                                                Please sign below
                                           </Text>
                                        </View>

                                        <View>
                                            <View style={{ borderColor: '#777', borderWidth: 1 }}>
                                                <SignatureCapture
                                                    style={[styles.signature]}
                                                    ref="sign"
                                                    onSaveEvent={this._onSaveEvent.bind(this)}
                                                    onDragEvent={this._onDragEvent.bind(this)}
                                                    saveImageFileInExtStorage={false}
                                                    showNativeButtons={false}
                                                    showTitleLabel={false}
                                                    viewMode={"portrait"} 
                                                />
                                            </View>
                                            <CheckBox
                                                title='I authorize this budget'
                                                checked={this.state.checked}
                                                onPress={() => this.setState({ checked: !this.state.checked, notAuthorize: false })}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, paddingTop: 10 }}>

                                            <View style={{ width: '40%' }}>
                                                <Button
                                                    title='Cancel'
                                                    color='white'
                                                    onPress={() => this.setState({ visibleModal: false }, () => {
                                                        this.props.closeModal()
                                                    })}

                                                    buttonStyle={{
                                                        backgroundColor: "#504d50",
                                                        borderRadius: 50
                                                    }}
                                                    textStyle={{ color: '#fff' }}
                                                />
                                            </View>

                                            <View style={{ width: '60%' }}>
                                                <Button
                                                    title={'Authorize & Pay'}
                                                    color='white'
                                                    onPress={() => (this.state.checked ? this.changeBudgetStatus(this.state.repairDetails.key) :
                                                        alert(`${AUTHBUDGET.FIRST_AUTHORIZE}`))
                                                    }
                                                    buttonStyle={{
                                                        backgroundColor: "#ff3333",
                                                        borderRadius: 50
                                                    }}
                                                    textStyle={{ color: '#fff' }}
                                                />
                                            </View>
                                        </View>
                                    </View> : null
                            }
                            {
                                (this.state.open) ?
                                    <View>
                                        <View style={styles.payTopTitle}>
                                            <Text style={{ color: 'black', fontSize: 18 }}>{REPAIR.HOW_TO_PAY}</Text>
                                        </View>
                                        <View style={[styles.selectOption]}>
                                            <RadioGroup
                                                selectedIndex={0}
                                                color={'grey'}
                                                style={{ flex: 1, justifyContent: 'center' }}
                                                activeColor={'#ff3333'}
                                                onSelect={(index, value) => this.setState({ paymentMethod: value }, () => {
                                                    // alert(this.state.paymentMethod)
                                                })}
                                            >
                                                <RadioButton value={'Paypal'}>
                                                    <View style={styles.paymentOption}>
                                                        <Text>{REPAIR.PAYPAL}</Text>
                                                        <Image source={paypal} resizeMode={'contain'} style={styles.paymentMethod} />
                                                    </View>
                                                </RadioButton>
                                                <RadioButton value={'Card'}   >
                                                    <View style={styles.paymentOption}>
                                                        <Text>{REPAIR.CREDIT_DEBIT}</Text>
                                                        <Image source={credit} resizeMode={'contain'} style={styles.paymentMethod} />
                                                    </View>
                                                </RadioButton>
                                            </RadioGroup>
                                        </View>

                                        
                                        <View style={styles.bottomView}>
                                            <View style={[styles.cancelContinue, { backgroundColor: '#504E51', marginRight: 10 }]}>
                                                <TouchableOpacity onPress={() => this.setState({ open: false }, () => {
                                                    this.props.closeModal()
                                                })}>
                                                    <Text style={{ color: 'white' }}>{REPAIR.CANCEL}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={[styles.cancelContinue, { backgroundColor: '#ff3333', marginLeft: 10 }]}>
                                                <TouchableOpacity onPress={() => (this.state.paymentMethod == "Paypal") ? this.payment() : null}>
                                                    <Text style={{ color: 'white' }}>{REPAIR.CONTINUE}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View> : null
                            }
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}


export default Authorizebudget