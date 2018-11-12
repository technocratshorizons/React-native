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
    SafeAreaView
} from 'react-native'
import Header from '../../Common/Header'
import { styles } from './styles'
import * as firebase from "firebase";
import { getInvoices } from '../../Actions/Homeactions'
import moment from 'moment'


class MyInvoices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalInvoices: []
        }

    }

    componentWillMount() {
        // let userId = firebase.auth().currentUser.uid;
        let userId = '_qweqwe23423533453455';

        

        getInvoices(userId).then((res) => {
            if (res) {
                this.setState({
                    totalInvoices: res
                })
                console.log(this.state.totalInvoices)
            } else {
                this.setState({
                    totalInvoices: res
                })
            }
        }).catch((err) => {
            console.log("err...", err)
        })
    }

    _keyExtractor = (item, index) => index + 'invoicesList';
    _renderVehicleView = ({ item, index }) => {
        let date = moment(item.createdAt).format("DD MMM YYYY")
        return (

            <View style={styles.vehicleFlatlistView}>
                <Text style={styles.vehicleText}>{item.vechicleNumber}</Text>
                <View style={styles.mainView}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text></Text>
                        <Text style={[styles.orderNumber, { color: 'black' }]}>{item.orderNumber}</Text>
                        <Text style={styles.orderNumber}>repair status: <Text style={item && item.workStatus == 'Completed' ? { color: 'green', fontStyle: 'italic' } : { color: 'red', fontStyle: 'italic' }}>
                            {item.workStatus}
                        </Text></Text>
                        <Text style={styles.orderNumber}>payment status: <Text style={item && item.paymentStatus == 'Pending' ? { color: 'green', fontStyle: 'italic' } : { color: 'red', fontStyle: 'italic' }}>
                            {item.paymentStatus}
                        </Text></Text>
                    </View>
                    <View style={styles.repairTextAndDate}>
                        <Text style={styles.repairCost}><Text style={styles.dollarText}>$</Text>{(item.amount).toFixed(2)}</Text>
                        <Text style={styles.invoiceCreatedDate}>
                            {item.createdAt}
                            {/* {date} */}
                            {/* { moment(new Date(item.createdAt)).format("DD MMM YYYY")} */}
                        </Text>
                    </View>
                </View>
            </View >
        )
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <Header title="My Invoices" navigateClick={() => this.props.navigation.navigate('DrawerOpen')} />
                <ScrollView>
                    <View style={styles.myInvoices}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.myInvoiceText}>My Invoices </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>

                        <ScrollView>
                            <FlatList
                                extraData={this.state.totalInvoices}
                                data={this.state.totalInvoices}
                                keyExtractor={this._keyExtractor.bind(this)}
                                renderItem={this._renderVehicleView.bind(this)}
                                ListHeaderComponent={() => (!this.state.totalInvoices.length ?
                                    <View style={styles.nodataView}>
                                        <Text style={styles.nodataText}>You don't have any invoices </Text>
                                    </View>
                                    : null)
                                }
                            />
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
            </SafeAreaView>
        )
    }
}

export default MyInvoices