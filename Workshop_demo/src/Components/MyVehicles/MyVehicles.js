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
    SafeAreaView,
    BackHandler
} from 'react-native'
import Header from '../../Common/Header'
import { Button, Icon, FormLabel, FormValidationMessage } from 'react-native-elements'
import * as firebase from "firebase";
import { styles } from './styles'
import Icons from 'react-native-vector-icons/Feather'
import Modal from "react-native-modal";
import { addVehicles, getVehicles, deleteVehicles, editVehicles } from '../../Actions/Homeactions'
import { addKilometers } from '../../Actions/KilometersAction'

import Swipeout from 'react-native-swipeout';
const { width, height } = Dimensions.get("window")
import { VehicleNumberValidaiton, RequiredValidation } from '../../UtilityFunctions/Validation'
import * as MYVEHICLES from '../../Constant'

import { getRepairDatailForParticular } from '../../Actions/RepairAction'

const hitSlop = { left: 50, right: 50, top: 50, bottom: 50 }

class MyVehicles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalVehicle: [],
            visibleModal: false,
            VehicleName: '',
            VehicleNumber: '',
            // VehicleRegis: '',
            VehicleKilometers: '',
            loader: false,
            isfrom: '',
            key: '',
            statusLoader: true,
            VehicleNumberError: null,
            VehicleNameError: null,
            RegistrationNUmberError: null,
            KilometersError: null
        }


    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid()) // Listen for the hardware back button on Android to be pressed
    }

    componentWillMount() {
        this.getVehicle()
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid()) // Remove listener
    }
    backAndroid() {

        this.props.navigation.goBack() // Return to previous screen
        return true // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
    }
    /************START GET VEHICLE*********** */
    getVehicle() {

        // let userId = firebase.auth().currentUser.uid;
        // this.setState({ getLoading: true })

        // getVehicles(userId).then((res) => {

        //     if (res && res.length > 0) {

        //         console.log(res)
        //         let arr = []
        //         res.forEach((element, index) => {
        //             getRepairDatailForParticular(element.vehicleNumber).then((res) => {
        //                 if (res) {

        //                     element['workDetail'] = res;
        //                     arr.push(element)
        //                     this.setState({
        //                         totalVehicle: arr,
        //                         getLoading: false
        //                     })
        //                 }
        //                 else {

        //                     arr.push(element)
        //                     this.setState({
        //                         totalVehicle: arr,
        //                         getLoading: false
        //                     })
        //                 }
        //             }).catch((err) => {
        //                 console.log("err==", err)
        //             })
        //         });
        //         // console.log(arr)
        //         // this.setState({
        //         //     totalVehicle: res,
        //         //     getLoading: false,
        //         //     statusLoader: true
        //         // })
        //     }
        //     else {
        //         this.setState({
        //             totalVehicle: res,
        //             getLoading: false,
        //             statusLoader: true
        //         })
        //     }
        // }).catch((err) => {

        //     this.setState({
        //         getLoading: false
        //     })
        //     console.log("error===", err)
        // })
    }



    renderSpinner() {
        return (
            <View style={{ position: 'absolute', top: height / 7, left: width / 2 - 40, zIndex: 1000 }}>
                <ActivityIndicator size={'large'} color='#ff3333' />
            </View>
        )
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
    //ends



    _keyExtractor = (item, index) => index + 'VehicleList';
    _renderVehicleView = ({ item, index }) => {

        return (
            <View style={{ flex: 1 }}>
                {/* <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
  <Image source={vehicle} />
</View> */}
                <TouchableOpacity onPress={() => this.props.navigation.navigate('VehicleRepairInfo', { vehicleNumber: item.vehicleNumber, vehicleArr: [item] })}>
                    <View style={{
                        flexDirection: 'column', justifyContent: 'center',
                        backgroundColor: 'white',
                        marginHorizontal: 10,
                        marginVertical: 5,
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                        borderColor: '#dcdcdc',
                        borderWidth: 0.5,
                        margin: 15,
                        borderRadius: 10,
                        //shadowColor: '#dcdcdc',
                        // shadowOffset: { width: 40, height: 50 },
                        shadowOpacity: 0.1,
                        shadowRadius: 10,
                        elevation: 2,
                    }} >
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={{ fontSize: 20, alignItems: 'flex-start', color: 'red', fontWeight: 'bold', fontFamily: 'HiraginoSansCNS-W3' }}>{item.vehicleName}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', paddingBottom: 5 }}>

                            <View style={{ flex: 0.4, flexDirection: 'column' }}>
                                <View><Text style={{ fontSize: 16, color: '#8D8B8E', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold' }}>{MYVEHICLES.VEHICLE_NUMBER}</Text></View>
                                {/* <View><Text style={{ fontSize: 16, color: '#8D8B8E' }}>{MYVEHICLES.REGISTRATION_NO}</Text></View> */}
                                <View><Text style={{ fontSize: 16, color: '#8D8B8E', fontFamily: 'HiraginoSansCNS-W3', fontWeight: 'bold' }}>{MYVEHICLES.KILOMETRES}</Text></View>
                                {/* <View><Text style={{ fontSize: 16, color: '#8D8B8E' }}>{MYVEHICLES.STATUS}</Text></View> */}

                            </View>
                            <View style={{ flex: 0.6, flexDirection: 'column' }}>
                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}><Text style={{ fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }}>{item.vehicleNumber}</Text></View>
                                {/* <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}><Text syle={{ fontSize: 16,fontFamily:'HiraginoSansCNS-W3' }}>{item.VehicleRegis}</Text></View> */}
                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}><Text syle={{ fontSize: 16, fontFamily: 'HiraginoSansCNS-W3' }}>{item.kilometer}</Text></View>



                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    {/* {
                                this.state.statusLoader ?
                                    <View>
                                        <ActivityIndicator size={'small'} color='#ff3333' />
                                        {this.getStatus(item)}
                                    </View>
                                    : */}
                                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("RepairWorkDetail", { item: item.workDetail })}>
                                        <Text style={item && item.workDetail && item.workDetail.workStatus == 'Completed' ? { fontSize: 12, color: 'green' } : { fontSize: 12, color: 'red' }}>
                                            {item && item.workDetail && item.workDetail.workStatus ? item.workDetail.workStatus : ''}
                                        </Text>
                                    </TouchableOpacity> */}
                                    {/* } */}
                                </View>


                            </View>
                            {/* <View style={{ flex: 0.3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View></View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Kilometers', { vehicleInfo: item, getVehicle: this.getVehicle.bind(this), })}>
                            <View style={{
                                width: width / 4,
                                backgroundColor: "#ff3333",
                                borderRadius: 50
                            }}>
                                <Text style={{ color: 'white', alignSelf: 'center', padding: 5 }}>+ {MYVEHICLES.PLUS_KILOMETRES}</Text>
                            </View>
                        </TouchableOpacity>
                        <View></View>
                    </View> */}
                        </View>
                        {/* <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 5 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Kilometers', { vehicleInfo: item, getVehicle: this.getVehicle.bind(this), })}>
                                <View style={{
                                    width: width / 4,
                                    backgroundColor: "#ff3333",
                                    borderRadius: 50
                                }}>
                                    <Text style={{ color: 'white', alignSelf: 'center', padding: 5 }}>+ {MYVEHICLES.PLUS_KILOMETRES}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View> */}

                    </View>
                </TouchableOpacity>

            </View>
        )
    }



    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header title={MYVEHICLES.MY_VEHICLES} navigateClick={() => this.props.navigation.navigate('DrawerOpen')} />

                    {
                        this.state.getLoading && this.getAppointmentSpinner()

                    }
                    <ScrollView>
                        <View style={{ flexDirection: 'row', padding: 10, marginBottom: 5, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#8D8B8E' }}>
                            {/* <View style={{ flex: 1 }}></View> */}
                            <View style={{ flex: 1 }}><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{MYVEHICLES.MY_VEHICLES}</Text></View>

                            {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <TouchableOpacity hitSlop={hitSlop} onPress={() => {
                                    this.setState({ isfrom: 'add' }, () => {
                                        this.showModal()
                                    })
                                }}>
                                    <Icons name='plus' color='white' size={25} />
                                </TouchableOpacity>
                            </View> */}
                        </View>
                        {
                            this.state.getLoading ?
                                null :

                                <View style={{ flex: 1 }}>

                                    <ScrollView>
                                        <FlatList
                                            extraData={this.state.totalVehicle}
                                            data={this.state.totalVehicle}
                                            keyExtractor={this._keyExtractor.bind(this)}
                                            renderItem={this._renderVehicleView.bind(this)}
                                            ListHeaderComponent={() => (!this.state.totalVehicle.length ?
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 }}>
                                                    <Text style={{ fontSize: 16, color: 'black', }}>{MYVEHICLES.DONT_HAVE_VEHICLE}</Text>
                                                </View>
                                                : null)
                                            }
                                        />
                                    </ScrollView>
                                </View>


                        }
                    </ScrollView>


                    <View>
                        <Modal
                            isVisible={this.state.visibleModal}
                            backdropColor={'rgba(0.30,0.30,0.30,0.70)'}
                            backdropOpacity={0.4}
                            onBackButtonPress={() => this.setState({
                                visibleModal: false,
                                VehicleName: '',
                                VehicleNumber: '',
                                VehicleKilometers: '',
                                // VehicleRegis: '',
                                VehicleNameError: null,
                                VehicleNumberError: null,
                                RegistrationNUmberError: null,
                                KilometersError: null
                            })}
                            onBackdropPress={() => this.setState({
                                visibleModal: false,
                                VehicleName: '',
                                VehicleNumber: '',
                                VehicleKilometers: '',
                                // VehicleRegis: '',
                                VehicleNameError: null,
                                VehicleNumberError: null,
                                RegistrationNUmberError: null,
                                KilometersError: null
                            })}
                            style={{ width: '95%', alignSelf: 'center', }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.ModalInsideView}>
                                    <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                                        <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
                                            {MYVEHICLES.ADD_YOUR_VEHICLE}</Text>
                                    </View>
                                    {this.state.loader && this.renderSpinner()}

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <FormLabel>{MYVEHICLES.VEHICLE_NAME2}</FormLabel>
                                            <TextInput
                                                style={{ height: 40, fontSize: 12 }}
                                                underlineColorAndroid="#D3D3D3"
                                                placeholder={MYVEHICLES.VEHICLE_NAME_PLACEHOLDER}
                                                maxLength={15}
                                                // onChangeText={(VehicleName) => { this.setState({ VehicleName }) }}

                                                onChangeText={(VehicleName) => this.setState({ VehicleName, VehicleNameError: RequiredValidation(VehicleName, 'VehicleName') }, () => {
                                                })}
                                                value={this.state.VehicleName}
                                            />
                                            {this.state.VehicleNameError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                                {this.state.VehicleNameError}
                                            </FormValidationMessage>
                                            }
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <FormLabel>{MYVEHICLES.VEHICLE_NUMBER}</FormLabel>
                                            <TextInput
                                                style={{ height: 40, fontSize: 12 }}
                                                underlineColorAndroid="#D3D3D3"
                                                placeholder={MYVEHICLES.VEHICLE_NUMBER_PLACEHOLDER}
                                                maxLength={8}
                                                onChangeText={(VehicleNumber) => this.setState({ VehicleNumber, VehicleNumberError: VehicleNumberValidaiton(VehicleNumber) }, () => {
                                                })}
                                                value={this.state.VehicleNumber}
                                            />
                                            {this.state.VehicleNumberError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                                {this.state.VehicleNumberError}
                                            </FormValidationMessage>
                                            }
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>

                                        {/* <View style={{ flex: 1 }}>
                                        <FormLabel>{MYVEHICLES.REGISTRATION_NO}</FormLabel>
                                        <TextInput
                                            style={{ height: 40, fontSize: 12 }}
                                            underlineColorAndroid="#D3D3D3"
                                            placeholder={MYVEHICLES.REGISTRATION_NO_PLACEHOLDER}
                                            maxLength={15}
                                            // onChangeText={(VehicleRegis) => { this.setState({ VehicleRegis }) }}
                                            onChangeText={(VehicleRegis) => this.setState({ VehicleRegis, RegistrationNUmberError: RequiredValidation(VehicleRegis, 'Registration no.') }, () => {
                                            })}
                                            value={this.state.VehicleRegis}
                                        />
                                        {this.state.RegistrationNUmberError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                            {this.state.RegistrationNUmberError}
                                        </FormValidationMessage>
                                        }
                                    </View> */}
                                        <View style={{ flex: 1 }}>
                                            <FormLabel>{MYVEHICLES.KILOMETRES}</FormLabel>
                                            <TextInput
                                                style={{ height: 40, fontSize: 12 }}
                                                underlineColorAndroid="#D3D3D3"
                                                placeholder={MYVEHICLES.KILOMETRES_PLACEHOLDER}
                                                maxLength={15}
                                                keyboardType='numeric'
                                                // onChangeText={(VehicleKilometers) => { this.setState({ VehicleKilometers }) }}
                                                onChangeText={(VehicleKilometers) => this.setState({ VehicleKilometers, KilometersError: RequiredValidation(VehicleKilometers, 'Kilometres') }, () => {
                                                })}
                                                value={this.state.VehicleKilometers}
                                            />
                                            {this.state.KilometersError && <FormValidationMessage labelStyle={{ alignSelf: 'center' }}>
                                                {this.state.KilometersError}
                                            </FormValidationMessage>
                                            }
                                        </View>
                                    </View>



                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, paddingTop: 10 }}>

                                        <View style={{ width: '50%' }}>
                                            <Button
                                                title={MYVEHICLES.CANCEL}
                                                color='white'
                                                onPress={() => this.setState({
                                                    visibleModal: false,
                                                    VehicleName: '',
                                                    VehicleNumber: '',
                                                    VehicleKilometers: '',
                                                    // VehicleRegis: '',
                                                    VehicleNameError: null,
                                                    VehicleNumberError: null,
                                                    RegistrationNUmberError: null,
                                                    KilometersError: null
                                                })}

                                                buttonStyle={{
                                                    backgroundColor: "#504d50",
                                                    borderRadius: 50
                                                }}
                                                textStyle={{ color: '#fff' }}
                                            />
                                        </View>

                                        <View style={{ width: '50%' }}>
                                            <Button
                                                title={this.state.isfrom == 'edit' ? `${MYVEHICLES.UPDATE}` : `${MYVEHICLES.SUBMIT}`}
                                                color='white'
                                                onPress={this.add_Edit}
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
                    </View>
                </View >
            </SafeAreaView>
        )
    }

}

export default MyVehicles