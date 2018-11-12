//signup
import React, { Component } from 'react'
import { View, Text, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView, Image, ImageBackground, Platform, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native'
import * as firebase from "firebase";
import { config } from '../../../../App';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { loginUser, clearErrorMessge, userStatusCheck } from '../../../Actions/AuthAction';
import { CustomSpinner } from '../../../Common/CustomSpinner';
import CustomToast from '../../../Common/CustomToaster'
import { RequiredValidation, EmailValidation, PasswordValidation } from '../../../UtilityFunctions/Validation'
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';


const { height, width } = Dimensions.get('window')
const header = require('../../../Assets/img/Login/Login-red-bg.png');
const headerlogo = require('../../../Assets/img/Login/logo-Login.png');
const logo_app = require('../../../Assets/img/Login-screen-logo.png');

import * as LOGIN from '../../../Constant'

export default class LoginExample extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            emailError: null,
            passwordError: null,
            password: null,
            email: null,
            errorTypeColor: '',
            isLoading: false
        }
    }

    // check form is Valid
    isValid() {
        const { email, password } = this.state;
        let valid = false;
        if (email && email.length > 0 && password && password.length > 0) {
            valid = true;

        }
        if (!email && !password) {
            this.setState({
                emailError: RequiredValidation(email, 'Email'),
                passwordError: RequiredValidation(password, 'Password'),
                isLoading: false
            },

            );
        } else if (!email) {
            this.setState({ emailError: RequiredValidation(email, 'Email'), isLoading: false });
        }
        else if (!password) {
            this.setState({ passwordError: RequiredValidation(password, 'Password'), isLoading: false });
        }
        return valid;
    }


    //submit login form
    LoginUser = () => {
        this.setState({ isLoading: true })
        const { navigate } = this.props.navigation;

        if (this.isValid()) {
            let { email, password } = this.state
            // userStatusCheck(email).then((res) => {

                //if (res) {
                   // if (res.status == 'Active') {
                        // firebase.auth().signInWithEmailAndPassword(email, password)
                        //     .then((success) => {
                                // alert('Login' + JSON.stringify(success));
                                //console.log(success.user.uid)

                                //FCM.requestPermissions({ badge: false, sound: true, alert: true });
                               // FCM.requestPermissions({ badge: false, sound: true, alert: true });
                                //FCM.getFCMToken().then(token => {
                                  //  let data = {}
                                  //  data["deviceToken"] = token

                                    // if (Platform.OS === 'ios') {
                                    //     data["type"] = "ios"
                                    //     firebase.database().ref(`users/${success.user.uid}/device_tokens`).push(data).then((res) => {
                                    //         AsyncStorage.setItem('devicetoken', token)
                                    //         resolve("success");
                                    //     }, function (err) {
                                    //         reject(err);
                                    //     })
                                    // } else if (Platform.OS === 'android') {

                                    //     data["type"] = "android"
                                    //     firebase.database().ref(`users/${success.user.uid}/device_tokens`).push(data).then((res) => {
                                    //         AsyncStorage.setItem('devicetoken', token)
                                    //         resolve("success");
                                    //     }, function (err) {
                                    //         reject(err);
                                    //     })
                                    // }
                                    //console.log(token, "tokentokentokentoken")
                                    //update your fcm token on server.
                                //});
                                // const uid = {
                                //     'uid': success.user.uid,
                                // }
                                //AsyncStorage.setItem("uid", JSON.stringify(uid))
                                navigate('Drawer');
                            // }).catch((error) => {

                            //     this.setState({ isLoading: false })
                            //     let errorCode = error.code;
                            //     let errorMessage = error.message;
                            //     if (errorCode === 'auth/wrong-password') {
                            //         alert(`${LOGIN.INVALID_CREDENTIAL}`);
                            //     }
                            //     else {
                            //         alert(errorMessage);
                            //     }
                            //     console.log(error);
                            // })
                        // (error) => {

                        // });
                    // } else {
                    //     this.setState({ isLoading: false })
                    //     alert("Your account has been deleted by the Admin. please contact your admin for more information")
                    //     //alert(`${LOGIN.INACTIVE_ACCOUNT}`);
                    // }
                // }
                // else {
                //     alert(`${LOGIN.INVALID_CREDENTIAL}`);
                //     this.setState({ isLoading: false })
                // }
            // }).catch((err) => {
            //     alert(`${LOGIN.INVALID_CREDENTIAL}`);
            //     this.setState({ isLoading: false })
            //     alert(err);

            // })

        }
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>

                    <KeyboardAvoidingView style={{ height: height / 3 + 20 }}
                        enabled={true}
                    >
                        <View style={{}}>
                            <ImageBackground
                                source={header}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode='stretch'
                            >

                                <Image source={logo_app} style={{ width: 120, height: 120, alignSelf: 'center', marginTop: 40 }} />

                            </ImageBackground>

                        </View>
                    </KeyboardAvoidingView>

                    {this.state.isLoading && <CustomSpinner /> ?
                        <CustomSpinner /> : null
                    }

                    <ScrollView style={{ height: '90%' }}>
                        <View style={{ paddingLeft: 30, paddingRight: 30 }}>

                            <View style={{ alignSelf: 'center' }}>
                                <FormLabel labelStyle={{ fontWeight: 'normal', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }}>{LOGIN.EMAIL}</FormLabel>
                            </View>

                            <TextInput
                                style={{ height: 50, textAlign: 'center', fontFamily: 'HiraginoSansCNS-W3' }}
                                autoCapitalize={'none'}
                                keyboardType={'email-address'}
                                underlineColorAndroid="#D3D3D3"
                                placeholder={LOGIN.EMAIL_PLACEHOLDER}
                                onChangeText={(email) => this.setState({ email, emailError: EmailValidation(email, 'Email') }, () => {
                                })}


                            />
                            {this.state.emailError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                {this.state.emailError}
                            </FormValidationMessage>
                            }

                            <View style={{ alignSelf: 'center' }}>
                                <FormLabel labelStyle={{ fontWeight: 'normal', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }}>{LOGIN.PASSWORD}</FormLabel>
                            </View>

                            <TextInput
                                style={{ height: 50, textAlign: 'center', fontFamily: 'HiraginoSansCNS-W3' }}
                                underlineColorAndroid="#D3D3D3"
                                autoCapitalize={'none'}
                                placeholder={LOGIN.PASS_PLACEHOLDER}

                                onChangeText={(password) => this.setState({ password, passwordError: RequiredValidation(password, 'Password') }, () => {
                                })}
                                secureTextEntry={true}
                            />
                            {this.state.passwordError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                {this.state.passwordError}
                            </FormValidationMessage>
                            }

                        </View>

                        <View style={{ paddingLeft: 50, paddingRight: 50, flexDirection: 'column', marginTop: 15 }}>
                            <Button
                                title={LOGIN.LOGIN}
                                color='white'
                                onPress={this.LoginUser}

                                buttonStyle={{
                                    backgroundColor: "#ff3333",
                                    borderRadius: 50
                                }}
                                textStyle={{ color: '#fff', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', fontSize: 18 }}
                            />

                            <Button
                                title={LOGIN.REGISTER}
                                color='white'
                                onPress={() => this.props.navigation.navigate('SignupExample')}

                                buttonStyle={{
                                    backgroundColor: "#504d50",
                                    borderRadius: 50, marginTop: 20
                                }}
                                textStyle={{ color: '#fff', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', fontSize: 18 }}
                            />

                        </View>

                        <View style={{ marginTop: 15, marginBottom: 15 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgotpassword')} activeOpacity={0.9}>
                                <Text style={{ fontSize: 18, alignSelf: 'center', fontFamily: 'HiraginoSansCNS-W3' }}>
                                    {LOGIN.FORGOT_PASSWORD}
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
}