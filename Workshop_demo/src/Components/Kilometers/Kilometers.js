import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Text,
    ActivityIndicator, AsyncStorage, FlatList, ScrollView, Dimensions,
    TextInput,
    Picker,
    SafeAreaView,
    Alert,
} from 'react-native'
import Header from '../../Common/Header'
import { Button, Icon, FormLabel } from 'react-native-elements'
import * as firebase from "firebase";
import moment from 'moment'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addKilometers, getKilometers } from '../../Actions/KilometersAction'
import { getVehicles, editVehicles } from '../../Actions/Homeactions'
import { styles } from './styles'
const { width, height } = Dimensions.get("window")
import Modal from "react-native-modal";
const datas = [
    // { date: '12 May 2018', VehicleNumber: 'HCW2058', state: 'Completed', kilometer: 38522 },
    // { date: '02 May 2018', VehicleNumber: 'HCW2058', state: 'Completed', kilometer: 32002 },
    // { date: '26 April 2018', VehicleNumber: 'HCW2058', state: 'Completed', kilometer: 28000 },
    // { date: '26 April 2018', VehicleNumber: 'HCW2058', state: 'Completed', kilometer: 25000 },
]
import * as KILOMETRES from '../../Constant'


class Kilometers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            kilometer: '',
            data: '',
            datas: [],
            loader: false,
            selectedService: 0,
            totalVehicle: [],
            serviceItems: [],
            visibleModal: false,
            vehicleKilometers: ''

        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state
        console.log("params.vehicleInfo", params.vehicleInfo)
        console.log("params.vehicleInfo.VehicleKilometers", params.vehicleInfo.vehicleKilometers)

        this.setState({
            vehicleKilometers: params.vehicleInfo.vehicleKilometers,
            loader: true
        }, () => {
            console.log(this.state.vehicleKilometers)



        })
        let userId = '_qweqwe23423533453455';


        //let userId = firebase.auth().currentUser.uid;


        getKilometers(params.vehicleInfo.vehicleNumber).then((res) => {
            if (res && res.length > 0) {
                this.setState({
                    datas: res.reverse()
                }, () => {
                    this.setState({ data: this.state.datas, loader: false })
                })
            }
            else {
                this.setState({ loader: false })
                console.log("error")
            }
        }).catch((err) => {
            this.setState({ loader: false })
            console.log(err)
        })

    }



    componentWillReceiveProps(nextProps) {

        if (nextProps && nextProps.kilometers) {
            console.log(nextProps.kilometers)
            this.setState({
                datas: nextProps.kilometers
            })
        }
    }




    addKilometersToHistory = () => {
        const { params } = this.props.navigation.state

        let userId = '_qweqwe23423533453455';

        // let userId = firebase.auth().currentUser.uid;
        let data = {
            uid: userId,
            VehicleNumber: params.vehicleInfo.VehicleNumber,
            kiloMeter: this.state.kilometer,
            storeDate: new Date()
        }
        addKilometers(data).then((res) => {
            if (res) {
                this.setState({ loader: true })
                console.log("res========", res)
                let vehicleInfo = {
                    VehicleName: params.vehicleInfo.VehicleName,
                    VehicleNumber: params.vehicleInfo.VehicleNumber,
                    // VehicleRegis: params.vehicleInfo.VehicleRegis,
                    VehicleKilometers: this.state.kilometer,
                    key: params.vehicleInfo.key,
                    uid: userId
                }
                editVehicles(vehicleInfo, params.vehicleInfo.key, userId).then((res) => {

                    getKilometers(params.vehicleInfo.VehicleNumber).then((res) => {
                        if (res && res.length > 0) {
                            this.setState({
                                datas: res.reverse(),
                                data: this.state.kilometer,
                                vehicleKilometers: this.state.kilometer
                            }, () => {
                                this.props.dispatch({
                                    type: 'ADD_KILOMETERS_LIST', kilometers: this.state.datas ? this.state.datas : 0
                                })
                                this.setState({ loader: false, vehicleKilometers: this.state.kilometer, visibleModal: false, kilometer: '' })
                            })
                        }
                        else {
                            this.setState({ loader: false, visibleModal: false, vehicleKilometers: this.state.kilometer, kilometer: '' })
                            console.log("error")
                        }
                    }).catch((err) => {
                        this.setState({ loader: false, visibleModal: false, vehicleKilometers: this.state.kilometer, kilometer: '' })
                        console.log(err)
                    })

                }).catch((err) => {
                    console.log(err)
                    this.setState({ loader: false, visibleModal: false })
                })
            }
        }).catch((err) => {
            this.setState({ loader: false, visibleModal: false })
            console.log(err)
        })
    }



    addtoHistory() {
        const { params } = this.props.navigation.state
        console.log("params", params)
        console.log("this.state.vehicleKilometers", this.state.vehicleKilometers)
        if (this.state.kilometer != '') {
            // let CurrentDate = new Date();

            if (parseFloat(this.state.kilometer) <= parseFloat(this.state.vehicleKilometers)) {
                Alert.alert(
                    `${KILOMETRES.ALERT}`,
                    `${KILOMETRES.WANT_TO_ADD_KILOMETERS}`,
                    [

                        { text: 'Cancel', onPress: () => console.log("Cancel pressed"), style: 'cancel' },
                        {
                            text: 'OK', onPress: () => {
                                this.addKilometersToHistory()
                            }
                        },
                    ],
                    { cancelable: false }
                )
            }
            else {
                this.addKilometersToHistory()
            }
        }
        else {
            alert(`${KILOMETRES.FILL_ALL_ENTRIES}`);
        }

    }

    _keyExtractor = (item, index) => index + 'RepairList';
    _renderItemView = ({ item, index }) => {
        return (

            <View style={styles.historyKiloMeterView}>
                <View style={styles.vehicleView}>
                    <Text style={{ padding: 5, color: '#6B6B6B' }}>{moment(item.storeDate).format('DD MMM YYYY')}</Text>
                    <Text style={{ padding: 5, color: '#969696' }}>{KILOMETRES.VEHICLE_NUMBER}: <Text style={{ color: '#6B6B6B' }}>{item.vehicleNumber}</Text></Text>
                </View>
                <View style={styles.kiloMetersView}>
                    <Text style={styles.totalKilometer}>
                        {item.kiloMeter}
                        <Text style={{ color: 'grey', fontSize: 18 }}> {KILOMETRES.PLUS_KILOMETRES}</Text>
                    </Text>
                </View>
            </View>
        );
    }

    showModal = () => {

        this.setState({ visibleModal: true })

    }
    renderSpinner() {
        return (
            <View style={{ position: 'absolute', top: height / 7, left: width / 2 - 40, zIndex: 1000 }}>
                <ActivityIndicator size={'large'} color='#ff3333' />
            </View>
        )
    }
    gobacktoPrevious = () => {
        this.props.navigation.state.params.getVehicle();
        this.props.navigation.goBack()
    }



    render() {
        const { params } = this.props.navigation.state

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header
                        title={`${params.vehicleInfo.vehicleName + `${' ('}` + `${KILOMETRES.KILOMETRES}` + `${')'}`}`}
                        navigateClick={() => this.gobacktoPrevious()}
                        plus={() => this.showModal()}
                        icon='plus'
                        leftIcon='ios-arrow-back'
                    />
                    <View style={styles.historyView}>
                        <Text style={styles.historyText}>{KILOMETRES.HISTORY}</Text>
                    </View>
                    {
                        this.state.loader ?
                            null :
                            <ScrollView>
                                <View>
                                    <FlatList
                                        extraData={this.state.data}
                                        data={this.state.datas}
                                        keyExtractor={this._keyExtractor.bind(this)}
                                        renderItem={this._renderItemView.bind(this)}
                                        ListHeaderComponent={() => (!this.state.data.length ?
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 }}>
                                                <Text style={{ fontSize: 16, color: 'black', }}>{KILOMETRES.NOHISTORY}</Text>
                                            </View>
                                            : null)
                                        }
                                    />
                                </View>
                            </ScrollView>
                    }
                    {this.state.loader && <View style={styles.activityIndicator}>
                        <ActivityIndicator color='#ff3333' size='large' />
                    </View>}

                    <View>
                        <Modal
                            isVisible={this.state.visibleModal}
                            backdropColor={'rgba(0.30,0.30,0.30,0.70)'}
                            backdropOpacity={0.4}
                            onBackButtonPress={() => this.setState({ visibleModal: false, kilometer: '' })}
                            onBackdropPress={() => this.setState({ visibleModal: false, kilometer: '' })}
                            style={{ width: '95%', alignSelf: 'center', }}>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={styles.ModalInsideView}>
                                    <View style={{ marginTop: 10, marginBottom: 10, marginHorizontal: 5 }}>
                                        <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
                                            {KILOMETRES.CURRENT_KILOMETRES}
                                        </Text>
                                    </View>
                                    {this.state.loader && this.renderSpinner()}

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 0.4 }}><FormLabel>{KILOMETRES.KILOMETRES}</FormLabel></View>
                                        <View style={{ flex: 0.6 }}>
                                            <TextInput
                                                style={{ height: 40, fontSize: 12 }}
                                                underlineColorAndroid="#D3D3D3"
                                                placeholder={KILOMETRES.ENTER_KILOMETRES_PLACEHOLDER}
                                                maxLength={15}
                                                keyboardType="numeric"
                                                onChangeText={(text) => this.setState({ kilometer: text })}
                                                value={this.state.kilometer}
                                            />
                                        </View>
                                    </View>

                                    {/* <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 0.4 }}><FormLabel>Select vehicle</FormLabel></View>
                                    <View style={{ flex: 0.6 }}>
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={this.state.selectedService}
                                            onValueChange={(service) => (this.setState({ selectedService: service }))} >
                                            <Picker.Item value={0} label='Select Vehicle' />
                                            {this.state.serviceItems}
                                        </Picker>
                                    </View>
                                </View> */}

                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 30 }}>
                                        <View style={{ width: '50%' }}>
                                            <Button
                                                title={KILOMETRES.ADD}
                                                color='white'
                                                onPress={() => this.addtoHistory()}
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
                </View>
            </SafeAreaView>
        );
    }
}


function mapStateToProps(state) {
    return {
        kilometers: state.kilometers.kilometersList
    }
}

function mapDispathToProps(dispatch) {
    return bindActionCreators({ dispatch }, dispatch);
}
export default connect(mapStateToProps, mapDispathToProps)(Kilometers)




