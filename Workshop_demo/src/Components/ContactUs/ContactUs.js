import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Text,
    SafeAreaView,
    ActivityIndicator, AsyncStorage, FlatList, ScrollView, Dimensions,
    TextInput,
    Keyboard
} from 'react-native'
//import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../Common/Header'
import { Button, Icon, FormValidationMessage } from 'react-native-elements'
import * as firebase from "firebase";
const { width, height } = Dimensions.get("window")
import Modal from "react-native-modal";

import { RequiredValidation, EmailValidation, ContactValidation, PasswordValidation, ConfirmPassword } from '../../UtilityFunctions/Validation';
import { getUserInfomation } from "../../Actions/AppointmentActions";
import { sendEmail } from "../../Actions/ChatAction";
import moment from 'moment';
import { styles } from './styles'
import * as CONTACT from '../../Constant'
// import { getUserInfomation } from '../Auth/View/MyProfile';

class ContactUs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            contactNumber: '',
            message: '',
            emailError: null,
            nameError: null,
            contactError: null,
            userInformation: [],
            username: '',
            usercontact: '',
            useremail: '',
            messageError: null,
            loader: false,
            visible: false


        }
    }
    // check form is Valid
    isValid() {
        const { email, name, contactNumber, message } = this.state;
        let valid = false;
        if ((message && message.length > 0) &&
            (contactNumber && contactNumber.length == 10)
        ) {
            valid = true;
        }
        if (!message && !contactNumber) {
            this.setState({
                emailError: RequiredValidation(email, 'Email'),
                nameError: RequiredValidation(name, 'Name'),
                messageError: RequiredValidation(message, 'message'),
                contactError: RequiredValidation(contactNumber, 'contact'),
                isLoading: false
            });
        }
        else if (!name) {
            this.setState({ nameError: RequiredValidation(name, 'Name'), isLoading: false });
        }
        else if (!email) {
            this.setState({ emailError: RequiredValidation(email, 'Email'), isLoading: false });
        }
        else if (!contactNumber) {
            this.setState({ contactError: ContactValidation(contactNumber, 'contact'), isLoading: false });
        }

        else if (!message) {
            this.setState({ messageError: RequiredValidation(message, 'message'), isLoading: false });
        }
        return valid;
    }



    contact = () => {
        if (this.isValid()) {
            this.setState({ loader: true })
            let uid = '_qweqwe23423533453455';

            // let uid = firebase.auth().currentUser.uid;
            let contact_data = {
                from: this.state.email,
                to: 'gourav@beyondroot.com',
                date: moment().format('YYYY-MM-DD'),
                time: moment().format('hh:mm a'),
                message: this.state.message,
                isRead: false,
                subject: 'contact message',
                uid: uid,
                contactNumber: this.state.contactNumber
            }
            sendEmail(contact_data).then((res) => {
                if (res) {
                    this.setState({
                        contactNumber: '',
                        message: '',
                        loader: false,
                        visible: true
                    })
                }
            }).catch((err) => {
                alert(err)
                console.log(err, "err")
            })

        }
        else {

        }
    }



    componentWillMount() {
        this.getData()
    }

    getData() {
        getUserInfomation().then((res) => {
            console.log(res)
            this.setState({ userInformation: res, name: res.name, email: res.email })
        }).catch((err) => {
            console.log(err)
        })
    }

    renderSpinner() {
        return (
            <View>
                <ActivityIndicator size={'small'} color='white' />
            </View>
        )
    }


    render() {

        return (
            <SafeAreaView style={{ flex: 1, }}>
                <View style={styles.container}>
                    <Header title={CONTACT.CONTACT_US} navigateClick={() => this.props.navigation.navigate('DrawerOpen')} />

                    {/* <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1 }}> */}
                    <ScrollView>
                        <View style={styles.contactContainer}>

                            <View style={styles.textView}>
                                <Text style={styles.text}>{CONTACT.NAME}</Text>
                            </View>

                            <TextInput
                                style={styles.textInputStyle}
                                underlineColorAndroid="#D3D3D3"
                                value={this.state.name}
                                placeholder='Enter Name' 
                                placeholderTextColor='#999'
                                onChangeText={(name) => this.setState({ name, nameError: RequiredValidation(name, 'name') }, () => {
                                })}

                            />
                            {this.state.nameError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                {this.state.nameError}
                            </FormValidationMessage>
                            }
                            <View style={styles.textView}>
                                <Text style={styles.text}>{CONTACT.EMAIL}</Text>
                            </View>

                            <TextInput
                                style={styles.textInputStyle}
                                underlineColorAndroid="#D3D3D3"
                                value={this.state.email}
                                placeholder='Enter Your Email' 
                                // placeholder={CONTACT.ENTER_EMAIL}
                                placeholderTextColor='#999'
                                onChangeText={(email) => this.setState({ email, emailError: EmailValidation(email, 'email') }, () => {
                                })}

                            />
                            {this.state.emailError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                {this.state.emailError}
                            </FormValidationMessage>
                            }

                            <View style={styles.textView}>
                                <Text style={styles.text}>{CONTACT.CONTACT_NUMBER}</Text>
                            </View>

                            <TextInput
                                style={styles.textInputStyle}
                                underlineColorAndroid="#D3D3D3"
                                placeholder='Enter Contact Number' 

                                //placeholder={CONTACT.CONTACT_PLACEHOLDER}
                                value={this.state.contactNumber}
                                keyboardType='numeric'
                                maxLength={10}
                                placeholderTextColor='#999'
                                onSubmitEditing={Keyboard.dismiss}
                                onChangeText={(contactNumber) => this.setState({ contactNumber, contactError: ContactValidation(contactNumber, 'contact') }, () => {
                                })}
                            />
                            {this.state.contactError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                {this.state.contactError}
                            </FormValidationMessage>
                            }

                            <View style={styles.textView}>
                                <Text style={styles.text}>{CONTACT.MESSAGE}</Text>
                            </View>

                            <TextInput
                                numberOfLines={10}
                                style={{ height: 200, fontSize: 16, textAlign: 'center' }}
                                underlineColorAndroid="#D3D3D3"
                                textAlignVertical="top"
                                placeholder={CONTACT.ENTER_MESSAGE}
                                placeholderTextColor='#999'
                                multiline={true}
                                blurOnSubmit={true}
                                onSubmitEditing={Keyboard.dismiss}
                                onChangeText={(message) => this.setState({ message, messageError: RequiredValidation(message, 'message') }, () => {
                                })}
                                value={this.state.message}

                            />
                            {this.state.messageError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                {this.state.messageError}
                            </FormValidationMessage>
                            }

                        </View>

                        {/* <TouchableOpacity onPress={this.contact} activeOpacity={0.7}>
                            <View style={styles.buttonView}>
                                <Button
                                    title={CONTACT.SEND}
                                    color='white'
                                    //onPress={this.contact}
                                    buttonStyle={styles.buttonStyle}
                                    textStyle={styles.textStyle}
                                />
                            </View>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={this.contact} activeOpacity={0.7}>
                            <View style={{
                                flex: 1, marginHorizontal: width / 6, backgroundColor: '#ff3333', justifyContent: 'center', alignItems: 'center', paddingVertical: 10,
                                borderRadius: 5, marginVertical: 15
                            }}>
                                {this.state.loader ? this.renderSpinner() :
                                    < Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>{CONTACT.SEND}</Text>
                                }
                            </View>
                        </TouchableOpacity>

                        <View>
                            <Modal
                                isVisible={this.state.visible}
                                backdropColor={'rgba(0.30,0.30,0.30,0.70)'}
                                backdropOpacity={0.4}
                                animationIn="zoomIn"
                                animationOut="zoomOut"
                                animationInTiming={1000}
                                animationOutTiming={1000}
                                onBackButtonPress={() => this.setState({ visible: false })}
                                onBackdropPress={() => this.setState({ visible: false })}
                                style={styles.modalStyle}>

                                <View style={styles.modalOuter}>

                                    <View style={styles.ModalInsideView1}>

                                        <View style={{ padding: 20 }}>
                                            <Text style={{ color: 'red', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }}>Message has been sent successfully. The admin will contact you within 24 hours</Text>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        {/*change password*/}
                    </ScrollView>
                </View>
            </SafeAreaView >
        );
    }
}

export default ContactUs



