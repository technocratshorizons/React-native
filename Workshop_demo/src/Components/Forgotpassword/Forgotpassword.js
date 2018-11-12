//forgot or reset password
import React, { Component } from 'react'
import { View, Text, Dimensions, TextInput, SafeAreaView, KeyboardAvoidingView, ActivityIndicator, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import * as firebase from "firebase"
import { Button, FormLabel, FormInput, } from 'react-native-elements';
import { CustomSpinner } from '../../Common/CustomSpinner';


const header = require('../../Assets/img/Forgot/Login-red-bg.png');
const headerlogo = require('../../Assets/img/Login/logo-Login.png');
const logo_app = require('../../Assets/img/Login-screen-logo.png');

import * as FORGOT from '../../Constant'

const { height, width } = Dimensions.get('window')
export default class Forgotpassword extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            loader: false,
        }
    }


    resetPassword = () => {
        this.setState({ loader: true })
        let auth = firebase.auth();
        const { email } = this.state;

        auth.sendPasswordResetEmail(email).then(() => {
            alert(`${FORGOT.EMAIL_SENT}` + ' ' + email);
            this.setState({ loader: false })
        }).catch((error) => {
            this.setState({ loader: false })
            alert(error)
        });
    }




    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    {/* {this.state.loader && this.renderSpinner()} */}


                    <KeyboardAvoidingView style={{ height: height / 3 + 40 }}
                        enabled={true}
                    >
                        <View style={{}}>
                            <ImageBackground
                                source={header}
                                style={{ width: '100%', height: '100%' }}
                            >

                                <Image source={logo_app} style={{ width: 120, height: 120, alignSelf: 'center', marginTop: 50 }} />

                            </ImageBackground>

                        </View>
                    </KeyboardAvoidingView >



                    {this.state.loader && <CustomSpinner /> ?
                        <CustomSpinner /> : null
                    }


                    <ScrollView>
                        <View>
                            <Text style={{ fontSize: 18, color: '#323232', alignSelf: 'center', fontFamily: 'HiraginoSansCNS-W3' }}>
                                {FORGOT.FORGOT_PASSWORD}
                            </Text>
                        </View>

                        <View style={{ marginTop: 15 }}>

                            <Text style={{ textAlign: 'center', fontFamily: 'HiraginoSansCNS-W3' }}>
                                {FORGOT.FORGOT_MESSAGE}
                            </Text>

                        </View>

                        <View style={{ paddingLeft: 30, paddingRight: 30, marginTop: 15 }}>

                            <View style={{ alignSelf: 'center' }}>
                                <FormLabel labelStyle={{ fontWeight: 'normal', fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }}>{FORGOT.EMAIL}</FormLabel>
                            </View>

                            <TextInput
                                style={{ height: 60, textAlign: 'center', fontFamily: 'HiraginoSansCNS-W3' }}
                                underlineColorAndroid="#D3D3D3"
                                placeholder={FORGOT.EMAIL_PLACEHOLDER}
                                onChangeText={(text) => { this.setState({ email: text }) }}

                            />

                        </View>


                        <View style={{ paddingLeft: 50, paddingRight: 50, marginTop: 20 }}>
                            <Button
                                title={FORGOT.RESET_PASSWORD}
                                color='white'
                                onPress={this.resetPassword}

                                buttonStyle={{
                                    backgroundColor: "#ff3333",
                                    borderRadius: 50
                                }}
                                textStyle={{ color: '#fff', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold', fontSize: 18 }}
                            />
                        </View>


                        <View style={{ marginTop: 20 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} activeOpacity={0.9}>
                                <Text style={{ fontSize: 18, alignSelf: 'center', fontFamily: 'HiraginoSansCNS-W3' }}>
                                    {FORGOT.BACK_TO_LOGIN}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>


                </View>
            </SafeAreaView>
        );
    }
}

