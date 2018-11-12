//signup
import React, { Component } from 'react'
import { View, Text, TextInput, Image, SafeAreaView, ImageBackground, TouchableOpacity, ActivityIndicator, AsyncStorage, ScrollView, Dimensions } from 'react-native'
import * as firebase from "firebase";
import { config } from '../../../../App';
import { Button, Icon, FormLabel, FormInput, Header, FormValidationMessage } from 'react-native-elements';
import { RequiredValidation, EmailValidation, ContactValidation, PasswordValidation, ConfirmPassword } from '../../../UtilityFunctions/Validation'
import { CustomSpinner } from '../../../Common/CustomSpinner';
import CustomToast from '../../../Common/CustomToaster'
import { addCountUser, getCountUser, doCreateUser, } from '../../../Actions/AuthAction'

let back_icon = require('../../../Assets/img/back-Arrow.png');
import * as SIGNUP from '../../../Constant'
import moment from 'moment'


const { height, width } = Dimensions.get('window')

export default class SignupExample extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            cpassword: '',
            name: '',
            ph_no: '',
            email: '',
            emailError: null,
            passwordError: null,
            confirmPassword: null,
            nameError: null,
            confirmPasswordError: null,
            contactError: null,
            errorTypeColor: '',
            isLoading: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.formError && !nextProps.successMessage) {
            this.setState({ errorTypeColor: 'red' })
            this.refs.defaultToastBottomWithDifferentColor.ShowToastFunction(nextProps.formError);
        }
    }



    // check form is Valid
    isValid() {

        const { email, password, name, contact, confirmPassword } = this.state;
        let valid = false;
        if ((email && email.length > 0) &&
            (name && name.length > 0) &&
            (confirmPassword && confirmPassword.length > 0) &&
            (password && password.length > 0) &&
            (contact && contact.length == 9)
        ) {
            valid = true;
        }
        if (!email && !password && !name && !confirmPassword && !contact) {
            this.setState({
                emailError: RequiredValidation(email, 'Email'),
                passwordError: RequiredValidation(password, 'Password'),
                nameError: RequiredValidation(name, 'Name'),
                confirmPasswordError: RequiredValidation(confirmPassword, 'Confirm Password'),
                contactError: RequiredValidation(contact, 'contact'),
                isLoading: false
            });
        } else if (!name) {
            this.setState({ nameError: RequiredValidation(name, 'Name'), isLoading: false });
        }
        else if (!email) {
            this.setState({ emailError: RequiredValidation(email, 'Email'), isLoading: false });
        }
        else if (!contact) {
            this.setState({ contactError: ContactValidation(contact, 'contact'), isLoading: false });
        }
        else if (!password) {
            this.setState({ passwordError: PasswordValidation(password, 'Password'), isLoading: false });
        }
        else if (!password) {
            this.setState({ passwordError: RequiredValidation(confirmPassword, 'Confirm Password'), isLoading: false });
        }
        return valid;

    }



    //submit signup form
    registerUser = () => {

        const { navigate } = this.props.navigation;
        if (this.isValid()) {
            this.setState({ isLoading: true })
            let { name, email, password, contact, confirmPassword } = this.state
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((success) => {
                    let userId = success.user.uid;
                    let data = {
                        email: email,
                        name: name,
                        date: moment().format('YYYY-MM-DD'),
                        contact: contact,
                        role: 'user',
                        status: 'Active',
                        uid: userId,
                        createdAt: moment().format('YYYY MMM DD HH:mm a')
                    }
                    doCreateUser(userId, data).then((response) => {
                        if (response) {
                            getCountUser().then((count) => {
                                count++
                                addCountUser(count).then((resCount) => {
                                    console.log("rescount", resCount)
                                }).catch((err) => {
                                    console.log('eorrr count add ', err.message)
                                })
                            }).catch((err) => {
                                console.log("errror", err)
                            })
                            const uid = {
                                'uid': userId,
                            }
                            AsyncStorage.setItem("uid", JSON.stringify(uid))
                        }

                    }).catch((err) => {
                        console.log("Error====", err)
                    })

                }, (error) => {
                    this.setState({ isLoading: false })
                    let errorCode = error.code;
                    let errorMessage = error.message;

                    if (errorCode === 'auth/wrong-password') {
                        alert(`${SIGNUP.INVALID_EMAIL}`);
                    }
                    else {
                        this.setState({ isLoading: false })
                        alert(errorMessage);
                    }
                    console.log(error);
                });
        }
        else {
            this.setState({ isLoading: false })
        }
    }

    leftComponent() {
        return (
            <View style={{ width: 50, marginBottom: 5 }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{}}>

                    <Image source={back_icon} style={{ width: 15, height: 15 }} />
                </TouchableOpacity>
            </View>

        )
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>

                    <Header
                        leftComponent={this.leftComponent()}
                        centerComponent={{ text: `${SIGNUP.REGISTER}`, style: { color: '#fff', fontSize: 24 ,fontWeight:'bold',fontFamily: 'HiraginoSansCNS-W6'} }}
                        backgroundColor='#ff3333'
                    />

                    {this.state.isLoading && <CustomSpinner /> ?
                        <CustomSpinner /> : null
                    }

                    <ScrollView style={{}}>
                        <View style={{ paddingLeft: 30, paddingRight: 30 }}>

                            <View style={{ alignSelf: 'center' }}>
                                <FormLabel labelStyle={{ fontWeight: 'normal', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }}>{SIGNUP.NAME}</FormLabel>
                            </View>

                            <TextInput
                                style={{ height: 50, textAlign: 'center', fontFamily: 'HiraginoSansCNS-W3' }}
                                underlineColorAndroid="#D3D3D3"
                                placeholder={SIGNUP.NAME_PLACEHOLDER}
                                onChangeText={(name) => this.setState({ name, nameError: RequiredValidation(name, 'name') }, () => {
                                })}

                            />
                            {this.state.nameError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                {this.state.nameError}
                            </FormValidationMessage>
                            }

                            <View style={{ alignSelf: 'center' }}>
                                <FormLabel labelStyle={{ fontWeight: 'normal', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }}>{SIGNUP.EMAIL}</FormLabel>
                            </View>

                            <TextInput
                                style={{ height: 50, textAlign: 'center', fontFamily: 'HiraginoSansCNS-W3' }}
                                underlineColorAndroid="#D3D3D3"
                                placeholder={SIGNUP.EMAIL_PLACEHOLDER}
                                keyboardType='email-address'
                                onChangeText={(email) => this.setState({ email, emailError: EmailValidation(email) }, () => {
                                })}

                            />

                            {this.state.emailError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                {this.state.emailError}
                            </FormValidationMessage>
                            }


                            <View style={{ alignSelf: 'center' }}>
                                <FormLabel labelStyle={{ fontWeight: 'normal', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }}>{SIGNUP.CONTACT_NUMBER}</FormLabel>
                            </View>

                            <TextInput
                                style={{ height: 50, textAlign: 'center', fontFamily: 'HiraginoSansCNS-W3' }}
                                underlineColorAndroid="#D3D3D3"
                                placeholder={SIGNUP.CONTACT_PLACEHOLDER}
                                keyboardType='numeric'
                                maxLength={10}
                                onChangeText={(contact) => this.setState({ contact, contactError: ContactValidation(contact, 'contact') }, () => {
                                })}

                            />
                            {this.state.contactError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                {this.state.contactError}
                            </FormValidationMessage>
                            }


                            <View style={{ alignSelf: 'center' }}>
                                <FormLabel labelStyle={{ fontWeight: 'normal', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }}>{SIGNUP.PASSWORD}</FormLabel>
                            </View>

                            <TextInput
                                style={{ height: 50, textAlign: 'center', fontFamily: 'HiraginoSansCNS-W3' }}
                                underlineColorAndroid="#D3D3D3"
                                placeholder={SIGNUP.PASS_PLACEHOLDER}
                                onChangeText={(password) => this.setState({ password, passwordError: PasswordValidation(password, 'password') }, () => {
                                })}
                                secureTextEntry={true}
                            />
                            {this.state.passwordError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                {this.state.passwordError}
                            </FormValidationMessage>
                            }

                            <View style={{ alignSelf: 'center' }}>
                                <FormLabel labelStyle={{ fontWeight: 'normal', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }}>{SIGNUP.CONFIRM_PASSWORD}</FormLabel>
                            </View>

                            <TextInput
                                style={{ height: 50, textAlign: 'center', fontFamily: 'HiraginoSansCNS-W3' }}
                                underlineColorAndroid="#D3D3D3"
                                placeholder={SIGNUP.CONFIRMPASS_PLACEHOLDER}
                                onChangeText={(confirmPassword) => this.setState({ confirmPassword, confirmPasswordError: ConfirmPassword(this.state.password, confirmPassword, 'Confirm Password') }, () => {
                                })}
                                secureTextEntry={true}
                            />
                            {this.state.confirmPasswordError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                {this.state.confirmPasswordError}
                            </FormValidationMessage>
                            }
                        </View>

                        <View style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 50, paddingBottom: 10 }}>
                            <Button
                                title={SIGNUP.SUBMIT}
                                color='white'
                                onPress={this.registerUser}

                                buttonStyle={{
                                    backgroundColor: "#ff3333",
                                    borderRadius: 50
                                }}
                                textStyle={{ color: '#fff', fontSize: 18, fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold' }}
                            />
                        </View>

                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
}

