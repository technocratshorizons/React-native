//My profile 
import React, { Component } from 'react'
import { View, Text, TextInput, SafeAreaView, Keyboard, Image, ImageBackground, TouchableOpacity, ActivityIndicator, AsyncStorage, StyleSheet, ScrollView, Dimensions } from 'react-native'
import * as firebase from "firebase";
import { config } from '../../../../App';
import { Button, Icon, FormLabel, Header, FormInput, FormValidationMessage } from 'react-native-elements';
import { RequiredValidation, EmailValidation, ContactValidation, PasswordValidation, ConfirmPassword } from '../../../UtilityFunctions/Validation'
import { CustomSpinner } from '../../../Common/CustomSpinner';
import CustomToast from '../../../Common/CustomToaster'
import { addCountUser, getCountUser, doCreateUser } from '../../../Actions/AuthAction'
import Modal from "react-native-modal";
import { styles } from '../View/css/MyProfile/index'
import { getUserInfomation } from '../../../Actions/AppointmentActions'
let menu_icon = require('../../../Assets/img/menu.png');

import * as PROFILE from '../../../Constant'

const { height, width } = Dimensions.get('window')
const hitSlop = { left: 50, right: 50, top: 50, bottom: 50 }
export default class MyProfile extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            cpassword: '',
            changepassword: '',
            changepasswordError: null,
            changeemail: '',
            name: '',
            ph_no: '',
            email: '',
            contact: '',
            emailError: null,
            changeemailError: null,
            passwordError: null,
            confirmPassword: null,
            nameError: null,
            confirmPasswordError: null,
            contactError: null,
            errorTypeColor: '',
            isLoading: false,
            loader: false,
            userInformation: [],
            visibleModal: false,
            visible: false,

        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.formError && !nextProps.successMessage) {
            this.setState({ errorTypeColor: 'red' })
            this.refs.defaultToastBottomWithDifferentColor.ShowToastFunction(nextProps.formError);
        }
    }


    componentWillMount() {
        this.getData()
    }

    getData() {
        getUserInfomation().then((res) => {
            console.log(res)
            this.setState({ userInformation: res, name: res.name, contact: res.contact, email: res.email })
        }).catch((err) => {
            console.log(err)
        })

    }


    // check form is Valid
    isValid() {

        const { email, password, changeemail, changepassword, confirmPassword, contact, name } = this.state;
        let valid = false;
        if (email && email.length > 0 && changeemail && changeemail.length > 0) {
            valid = true;

        }
        if (password && password.length > 0 && changepassword && changepassword.length > 0 && confirmPassword && confirmPassword.length > 0) {
            valid = true;

        }
        if (email && email.length > 0 && contact && contact.length == 10) {
            valid = true;

        }
        // if (email && email.length > 0 && password && password.length > 0 && changeemail && changeemail.length > 0 && changepassword && changepassword.length > 0) {
        //     valid = true;
        //     
        // }
        if (!email && !password && !changeemail && !changepassword && !contact && !name) {
            this.setState({
                emailError: RequiredValidation(email, 'Email'),
                passwordError: RequiredValidation(password, 'Password'),
                nameError: RequiredValidation(name, 'Name'),
                changeemailError: RequiredValidation(changeemail, 'Email'),
                changepasswordError: RequiredValidation(changepassword, 'Password'),
                confirmPasswordError: RequiredValidation(confirmPassword, 'Confirm Password'),
                contactError: RequiredValidation(contact, 'contact'),
                loader: false
            },
            );
        } else if (!name) {
            this.setState({ nameError: RequiredValidation(name, 'Name'), isLoading: false });
        }
        else if (!email) {
            this.setState({ emailError: RequiredValidation(email, 'Email'), loader: false });
        }
        else if (!changeemail) {
            this.setState({ changeemailError: RequiredValidation(changeemail, 'Email'), loader: false });
        }
        else if (!password) {
            this.setState({ passwordError: RequiredValidation(password, 'Password'), loader: false });
        }
        else if (!changepassword) {
            this.setState({ passwordError: RequiredValidation(changepassword, 'Password'), loader: false });
        }
        else if (!contact) {
            this.setState({ contactError: ContactValidation(contact, 'contact'), loader: false });
        }


        else if (!confirmPassword) {
            this.setState({ confirmPasswordError: RequiredValidation(confirmPassword, 'Confirm Password'), loader: false });
        }
        return valid;
    }



    /***** START UPDATE USER INFORMATION *******/
    updateData = () => {
        this.setState({ isLoading: true })
        // let uid = firebase.auth().currentUser.uid;
        let uid = '_qweqwe23423533453455';


        if (this.isValid()) {
            this.setState({ isLoading: false })

            // if (this.state.name && this.state.contact) {
            //     let data = {

            //         name: this.state.name,
            //         contact: this.state.contact,

            //     }
            //     firebase.database().ref("/users/" + uid).update(data).then((res) => {
            //         this.setState({ isLoading: false })
            //         alert(`${PROFILE.UPDATE_MESSAGE}`);
            //     }).catch((err) => {
            //         console.log(err)
            //         this.setState({ isLoading: false })
            //     }

            //     )

            // }

            // else {
            //     alert(`${PROFILE.BOTH_DATA_MESSAGE}`);
            //     this.setState({ isLoading: false })
            // }
        } else {
            this.setState({ isLoading: false })
            alert(`${PROFILE.BOTH_DATA_MESSAGE}`);
        }
    }

    /***** END UPDATE USER INFORMATION *******/

    /***** START CHANGE PASSWORD *******/
    changeUserPassword = () => {
        this.setState({ loader: true })
        let user = firebase.auth().currentUser;
        let credentials = firebase.auth.EmailAuthProvider.credential(
            this.state.email,
            this.state.password
        );
        if (this.isValid()) {
            // user.reauthenticateAndRetrieveDataWithCredential(credentials).then((res) => {
            //     this.setState({ loader: true })
            //     console.log(res)
            //     user.updatePassword(this.state.changepassword).then(() => {
            //         alert(`${PROFILE.PASSWORD_UPDATED_MESSAGE}`);
            //         const { navigate } = this.props.navigation
            //         firebase.auth().signOut().then(() => {
            //             AsyncStorage.removeItem('uid');
            //             navigate('LoginExample');
            //         }).catch((error) => {
            //             this.setState({ loader: false })
            //             alert(error.message)
            //         });
            //     }).catch((error) => {
            //         this.setState({ loader: false })
            //         alert(error.message)
            //     });
            // }).catch((error) => {
            //     this.setState({ loader: false })
            //     alert(error.message)
            // })
        }
        // else {
        //     this.setState({ isLoading: false })
        //     alert('Please fill required fields')
        // }
    }
    /***** END CHANGE PASSWORD *******/





    
    /***** START CHANGE EMAIL *******/
    changeUserEmail = () => {
        this.setState({ loader: true })
        let user = firebase.auth().currentUser;
        let credentials = firebase.auth.EmailAuthProvider.credential(
            this.state.email,
            this.state.password
        );

        if (this.isValid()) {
            // user.reauthenticateAndRetrieveDataWithCredential(credentials).then((res) => {

            //     this.setState({ loader: true })
            //     console.log(res)
            //     user.updateEmail(this.state.changeemail).then(() => {

            //         this.setState({ loader: true })
            //         let uid = '_qweqwe23423533453455';

            //        // let uid = firebase.auth().currentUser.uid;
            //         let data = {
            //             email: this.state.changeemail,
            //         }
            //         firebase.database().ref("/users/" + uid).update(data).then((res) => {

            //             this.setState({ loader: false })
            //             alert(`${PROFILE.UPDATE_MESSAGE}`);
            //         }).catch((err) => {

            //             console.log(err)
            //             this.setState({ loader: false })
            //         })
            //         alert(`${PROFILE.EMAIL_UPDATED_MESSAGE}`);
            //         const { navigate } = this.props.navigation
            //         firebase.auth().signOut().then(() => {

            //             AsyncStorage.removeItem('uid');
            //             navigate('LoginExample');
            //         }).catch((error) => {

            //             this.setState({ loader: false })
            //             alert(error.message)
            //         });
            //     }).catch((error) => {

            //         console.log(error + 'err')
            //         alert(error.message)
            //         this.setState({ loader: false })
            //     });
            // }).catch((error) => {

            //     this.setState({ loader: false })
            //     alert(error.message)
            // })
        }
    }
    /***** END CHANGE EMAIL *******/

    // showmodal=()=>
    // {
    //     this.setState({visibleModal:true})
    // }


    leftComponent() {
        return (
            <View style={{ width: 50, marginBottom: 5 }}>
                <TouchableOpacity hitSlop={hitSlop} onPress={() => this.props.navigation.navigate('DrawerOpen')} style={{}}>

                    <Image source={menu_icon} style={{ width: 25, height: 20 }} />
                </TouchableOpacity>
            </View>

        )
    }

    // onFocus() {
    //     // Keyboard.dismiss()
    //     this.setState({
    //         visibleModal: true
    //     })
    // }

    renderSpinner() {
        return (
            <View style={styles.spinner}>
                <ActivityIndicator size={'large'} color='#ff3333' />
            </View>
        )
    }

    render() {

        const { name, contact, email } = this.state.userInformation
        // this.state.name = this.state.userInformation.name;
        // this.state.contact = this.state.userInformation.contact;
        console.log(contact)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header
                        leftComponent={this.leftComponent()}
                        centerComponent={{ text: `${PROFILE.MY_PROFILE}`, style: { color: '#fff', fontSize: 24, fontWeight: 'bold', fontFamily: 'HiraginoSansCNS-W6' } }}
                        backgroundColor='#ff3333'
                    />
                    {this.state.isLoading && <CustomSpinner /> ?
                        <CustomSpinner /> : null
                    }
                    <ScrollView style={{ height: '90%' }}>
                        <View style={styles.updateinfo}>

                            <View style={{ alignSelf: 'center' }}>
                                <FormLabel labelStyle={styles.updateinfolabel}>{PROFILE.NAME}</FormLabel>
                            </View>
                            <TextInput
                                style={styles.updateinfoText}
                                underlineColorAndroid="#D3D3D3"
                                placeholder={PROFILE.NAME_PLACEHOLDER}
                                value={this.state.name}
                                onChangeText={(name) => this.setState({ name, nameError: RequiredValidation(name, 'name') }, () => {
                                })}

                            />
                            {this.state.nameError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                {this.state.nameError}
                            </FormValidationMessage>
                            }
                            <View style={{ alignSelf: 'center' }}>
                                <FormLabel labelStyle={styles.updateinfolabel}>{PROFILE.CONTACT_NUMBER}</FormLabel>
                            </View>
                            <TextInput
                                style={styles.updateinfoText}
                                underlineColorAndroid="#D3D3D3"
                                placeholder={PROFILE.CONTACT_PLACEHOLDER}
                                keyboardType='numeric'
                                value={this.state.contact}
                                maxLength={10}
                                onChangeText={(contact) => this.setState({ contact, contactError: ContactValidation(contact, 'contact') }, () => {
                                })}

                            />
                            {this.state.contactError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                {this.state.contactError}
                            </FormValidationMessage>
                            }
                        </View>
                        <View style={styles.updateButton}>
                            <Button
                                title={PROFILE.UPDATE}
                                color='white'
                                onPress={this.updateData}
                                buttonStyle={{
                                    backgroundColor: "#ff3333",
                                    borderRadius: 50
                                }}
                                textStyle={{ color: '#fff', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', fontSize: 18 }}
                            />
                        </View>
                        {/*change Email*/}

                        <TouchableOpacity style={[styles.section, { marginTop: 15 }]} activeOpacity={0.9}>
                            <Text style={styles.sectionText}>{PROFILE.CHANGE_EMAIL}</Text>
                        </TouchableOpacity >

                        <TouchableOpacity style={styles.insideSectiontouch} onPress={() => this.setState({ visibleModal: true })}>
                            <TouchableOpacity style={{ alignSelf: 'center' }}>
                                <Text style={styles.insideSectiontouchText1} onPress={() => this.setState({ visibleModal: true })}>{PROFILE.CHANGE_EMAIL}</Text>
                            </TouchableOpacity>

                            <TextInput
                                style={styles.insideSectiontouchText2}
                                underlineColorAndroid="transparent"
                                placeholder={PROFILE.EMAIL_PLACEHOLDER}
                                keyboardType='email-address'
                                value={this.state.email}
                                editable={false}
                                onChangeText={(email) => this.setState({ email, emailError: EmailValidation(email) }, () => {
                                })}
                            />
                        </TouchableOpacity>
                        {/*change Email*/}

                        {/*change password*/}

                        <TouchableOpacity style={styles.section} activeOpacity={0.9}>
                            <Text style={styles.sectionText}>{PROFILE.CHANGE_PASSWORD}</Text>
                        </TouchableOpacity >
                        <TouchableOpacity style={[styles.insideSectiontouch, {}]} onPress={() => this.setState({ visible: true })}>


                            <TouchableOpacity style={{ alignSelf: 'center', paddingBottom: 15 }}>
                                <Text style={styles.insideSectiontouchText1} onPress={() => this.setState({ visible: true })}>{PROFILE.CHANGE_PASSWORD}</Text>
                            </TouchableOpacity>

                            <TextInput
                                style={styles.insideSectiontouchText2}
                                underlineColorAndroid='transparent'
                                placeholder={PROFILE.PASS_PLACEHOLDER}
                                onFocus={() => this.setState({ visible: true })}
                                editable={false}
                                value={this.state.changepassword}
                            />
                        </TouchableOpacity>


                        {/*change password*/}


                        {/*MODAl*/}
                        <View>
                            <Modal
                                isVisible={this.state.visibleModal}
                                backdropColor={'rgba(0.30,0.30,0.30,0.70)'}
                                backdropOpacity={0.4}
                                onBackButtonPress={() => this.setState({ visibleModal: false })}
                                onBackdropPress={() => this.setState({ visibleModal: false })}
                                style={styles.modalStyle}>
                                <View style={styles.modalOuter}>

                                    <View style={styles.ModalInsideView}>

                                        <View style={{ marginTop: 10 }}>
                                            <Text style={styles.headerText}>
                                                {PROFILE.CHANGE_EMAIL}
                                            </Text>
                                        </View>

                                        {this.state.loader && this.renderSpinner()}
                                        {/* {this.state.editloader && this.editSpinner()} */}
                                        <ScrollView>

                                            <View style={styles.ModalInsideViewouter}>
                                                {/* <View style={{ alignSelf: 'center' }}>
                                                <FormLabel labelStyle={{ fontWeight: 'normal', fontSize: 16 }}>Email</FormLabel>
                                            </View> */}

                                                {/* <TextInput
                                                style={{ height: 40, textAlign: 'center' }}
                                                underlineColorAndroid="#D3D3D3"
                                                placeholder="Enter Email"
                                                keyboardType='email-address'
                                                value={this.state.email}
                                                editable={false}
                                                onChangeText={(email) => this.setState({ email, emailError: EmailValidation(email) }, () => {
                                                })}

                                            /> */}



                                                <View style={{ alignSelf: 'center' }}>
                                                    <FormLabel labelStyle={styles.updateinfolabel}>Current Email </FormLabel>
                                                </View>

                                                <TextInput
                                                    style={{ height: 40, textAlign: 'center' }}
                                                    underlineColorAndroid="#D3D3D3"
                                                    placeholder="Enter Email"
                                                    keyboardType='email-address'
                                                    value={this.state.email}
                                                    onChangeText={(email) => this.setState({ email, emailError: EmailValidation(email,  'Email') }, () => {
                                                    })}

                                                />

                                                {this.state.emailError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                                    {this.state.emailError}
                                                </FormValidationMessage>
                                                }


                                                <View style={{ alignSelf: 'center' }}>
                                                    <FormLabel labelStyle={styles.updateinfolabel}>{PROFILE.NEW_EMAIL}</FormLabel>
                                                </View>

                                                <TextInput
                                                    style={{ height: 40, textAlign: 'center' }}
                                                    underlineColorAndroid="#D3D3D3"
                                                    placeholder={PROFILE.NEW_EMAIL}
                                                    value={this.state.changeemail}
                                                    onChangeText={(changeemail) => this.setState({ changeemail, changeemailError: EmailValidation(changeemail, 'Email') }, () => {
                                                    })}

                                                />
                                            </View>
                                            {this.state.changeemailError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                                {this.state.changeemailError}
                                            </FormValidationMessage>
                                            }



                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, paddingTop: 10 }}>

                                                <View style={{ width: '50%' }}>
                                                    <Button
                                                        title={PROFILE.CANCEL}
                                                        color='white'
                                                        onPress={() => this.setState({ visibleModal: false, vehicle: '', selectedDate: '', time: '' })}

                                                        buttonStyle={{
                                                            backgroundColor: "#504d50",
                                                            borderRadius: 50
                                                        }}
                                                        textStyle={{ color: '#fff', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', fontSize: 18 }}
                                                    />
                                                </View>

                                                <View style={{ width: '50%' }}>
                                                    <Button
                                                        title={PROFILE.UPDATE}
                                                        color='white'
                                                        onPress={this.changeUserEmail}

                                                        buttonStyle={{
                                                            backgroundColor: "#ff3333",
                                                            borderRadius: 50
                                                        }}
                                                        textStyle={{ color: '#fff', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', fontSize: 18 }}
                                                    />
                                                </View>

                                            </View>

                                        </ScrollView>
                                    </View>

                                </View>

                            </Modal>
                        </View>

                        {/*MODAL*/}

                        {/*change password*/}

                        <View>
                            <Modal
                                isVisible={this.state.visible}
                                backdropColor={'rgba(0.30,0.30,0.30,0.70)'}
                                backdropOpacity={0.4}
                                onBackButtonPress={() => this.setState({ visible: false })}
                                onBackdropPress={() => this.setState({ visible: false })}
                                style={styles.modalStyle}>

                                <View style={styles.modalOuter}>

                                    <View style={styles.ModalInsideView}>

                                        <View style={{ marginTop: 10 }}>
                                            <Text style={styles.headerText}>
                                                {PROFILE.CHANGE_PASSWORD}
                                            </Text>
                                        </View>

                                        {this.state.loader && this.renderSpinner()}
                                        {/* {this.state.editloader && this.editSpinner()} */}
                                        <ScrollView>

                                            <View style={{ paddingLeft: 30, paddingRight: 30 }}>


                                                {/* <View style={{ alignSelf: 'center' }}>
                                                <FormLabel labelStyle={{ fontWeight: 'normal', fontSize: 16 }}>Enter Email</FormLabel>
                                            </View>

                                            <TextInput
                                                style={{ height: 40, textAlign: 'center' }}
                                                underlineColorAndroid="#D3D3D3"
                                                placeholder="Enter Email"
                                                keyboardType='email-address'
                                                value={this.state.email}
                                                onChangeText={(email) => this.setState({ email, emailError: EmailValidation(email) }, () => {
                                                })}

                                            /> */}


                                                <View style={{ alignSelf: 'center' }}>
                                                    <FormLabel labelStyle={styles.updateinfolabel}>{PROFILE.CURRENT_PASSWORD}</FormLabel>
                                                </View>

                                                <TextInput
                                                    style={{ height: 40, textAlign: 'center' }}
                                                    underlineColorAndroid="#D3D3D3"
                                                    placeholder={PROFILE.PASS_PLACEHOLDER}
                                                    value={this.state.password}
                                                    onChangeText={(password) => this.setState({ password, passwordError: PasswordValidation(password, 'password') }, () => {
                                                    })}
                                                    secureTextEntry={true}
                                                />

                                                 {this.state.passwordError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                                    {this.state.passwordError}
                                                </FormValidationMessage>
                                                }


                                                <View style={{ alignSelf: 'center' }}>
                                                    <FormLabel labelStyle={styles.updateinfolabel}>{PROFILE.NEW_PASS}</FormLabel>
                                                </View>

                                                <TextInput
                                                    style={{ height: 40, textAlign: 'center' }}
                                                    underlineColorAndroid="#D3D3D3"
                                                    placeholder={PROFILE.PASS_PLACEHOLDER}
                                                    value={this.state.changepassword}
                                                    onChangeText={(changepassword) => this.setState({ changepassword, changepasswordError: PasswordValidation(changepassword, 'password') }, () => {
                                                    })}
                                                    secureTextEntry={true}
                                                />
                                                {this.state.changepasswordError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                                    {this.state.changepasswordError}
                                                </FormValidationMessage>
                                                }


                                                <View style={{ alignSelf: 'center' }}>
                                                    <FormLabel labelStyle={styles.updateinfolabel}>Confirm Password</FormLabel>
                                                </View>

                                                <TextInput
                                                    style={{ height: 40, textAlign: 'center' }}
                                                    underlineColorAndroid="#D3D3D3"
                                                    placeholder={PROFILE.PASS_PLACEHOLDER}
                                                    onChangeText={(confirmPassword) => this.setState({ confirmPassword, confirmPasswordError: ConfirmPassword(this.state.changepassword, confirmPassword, 'Confirm Password') }, () => {
                                                    })}
                                                    secureTextEntry={true}
                                                />
                                                {this.state.confirmPasswordError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                                    {this.state.confirmPasswordError}
                                                </FormValidationMessage>
                                                }




                                            </View>



                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, paddingTop: 10 }}>

                                                <View style={{ width: '50%' }}>
                                                    <Button
                                                        title={PROFILE.CANCEL}
                                                        color='white'
                                                        onPress={() => this.setState({ visible: false })}

                                                        buttonStyle={{
                                                            backgroundColor: "#504d50",
                                                            borderRadius: 50
                                                        }}
                                                        textStyle={{ color: '#fff', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', fontSize: 18 }}
                                                    />
                                                </View>

                                                <View style={{ width: '50%' }}>
                                                    <Button
                                                        title={PROFILE.UPDATE}
                                                        color='white'
                                                        onPress={this.changeUserPassword}

                                                        buttonStyle={{
                                                            backgroundColor: "#ff3333",
                                                            borderRadius: 50
                                                        }}
                                                        textStyle={{ color: '#fff', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', fontSize: 18 }}
                                                    />
                                                </View>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        {/*change password*/}

                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
}

