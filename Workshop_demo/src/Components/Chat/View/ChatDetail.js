import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    TextInput,
    Text,
    SafeAreaView,
    ActivityIndicator, AsyncStorage, FlatList, ScrollView, Dimensions,
    Keyboard
} from 'react-native'
import Header from '../../../Common/Header'
import * as MESSAGES from '../../../Constant'
import { Button, Icon, CheckBox, Badge } from 'react-native-elements'
import { getUserExits } from '../../../Actions/AuthAction';
import { updateAdminCountNavigate } from '../../../Actions/ChatAction';

import { CustomSpinner } from '../../../Common/CustomSpinner';
import moment from 'moment'
const { width, height } = Dimensions.get("window")
import { styles } from '../styles'

import send from '../../../Assets/img/send.png'
import { sendMessage, getMessages } from '../../../Actions/ChatAction'
import * as firebase from "firebase";
import * as CHATDETAIL from '../../../Constant'



class ChatDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            isLoading: false,
            getLoading: false,
            visibleModal: false,
            username: '',
            textMessage: '',
            renderMessageList: '',
            recieverName: '',
            messages: [ { time: '04:45 PM', from: 'Gaurav', message: 'Hii', money: 350 },
            { time: '04:45 PM', from: 'Gaurav', message: 'How are you doing?', money: 550 },
            { time: '04:45 PM', from: 'Sandeep', message: 'Hey', money: 350 },
            { time: '04:45 PM', from: 'Gaurav', message: 'Did you check you details? Did you check you details? Did you check you details?', money: 350 },
            { time: '04:45 PM', from: 'Gaurav', message: 'no issues found yet', money: 350 },
            { time: '04:45 PM', from: 'Sandeep', message: 'Sorry for the late response', money: 350 }, { time: '04:45 PM', from: 'Gaurav', message: 'oka', money: 350 },
            { time: '04:45 PM', from: 'Sandeep', message: 'yes', money: 350 }]
        },
            this.contentHeight = 0,
            this.scrollViewHeight = 0
    }


    componentWillMount() {
        const { params } = this.props.navigation.state
        let uid = '_qweqwe23423533453455';

        // let uid = firebase.auth().currentUser.uid;
        // getUserExits(uid).then((res) => {
        //     console.log(res, "user")
        //     this.setState({
        //         username: res.name
        //     })
        // }).catch((err) => {
        //     console.log(err)
        // })
        // this.getMessages()

        // let notification = {
        //     orderNumber: params && params.item && params.item.orderNumber ? params.item.orderNumber : null,
        // }
        // updateAdminCountNavigate(notification)
    }


    scrollToBottom = (animated = true) => {
        const scrollHeight = this.contentHeight;
        if (scrollHeight > 0) {

            this.refs.scrollView.scrollTo({ y: scrollHeight, animated: true });

        }
    }

    //Recieving the messages
    // getMessages = () => {
    //     const { params } = this.props.navigation.state
    //     //let orderNumber = params.item.orderNumber?params.item.orderNumber:
    //     firebase.database().ref(`messages/${params.item.orderNumber}`).on("value", snapshort => {
    //         let messages = []
    //         if (snapshort.exists()) {
    //             messages = Object.values(snapshort.val())
    //             this.setState({
    //                 messages: messages,
    //                 recieverName: 'Gaurav',
    //             })
    //         } else {
    //             this.setState({
    //                 messages: messages,
    //                 recieverName: 'Gaurav',
    //             })
    //         }
    //     })
    // }


    //Sending the messages
    sendMessage = () => {
        const { params } = this.props.navigation.state
        if (this.state.textMessage != '' && this.state.textMessage != null) {
            let data = {
                from: this.state.username,
                message: this.state.textMessage,
                orderId: params.item.orderNumber,
                time: moment().format("hh:mm a"),
                to: this.state.recieverName
            }
            let notification = {
                clientCount: 0,
                uid: params.item.uid,
                orderNumber: params.item.orderNumber,
                vehicleName: params.item.vehicleName,
                vehicleNumber: params.item.vehicleNumber,
                workStatus: params.item.workStatus,
                adminCount: 1,
                clientName: params.item.clientName
            }
            sendMessage(data, notification)
            this.setState({ textMessage: '' })
        }
        else {
            alert("Enter some message")
        }
    }



    _keyExtractor = (item, index) => index + 'Chatlist';
    _renderChatListView = ({ item, index }) => {
        return (
            (this.state.username == item.from) ?
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginHorizontal: 5, marginVertical: 2, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'flex-end', alignItems: 'flex-end'
                }}>
                    <View style={{ maxWidth: width - 90, flexDirection: 'column', borderRadius: 5, backgroundColor: 'white', padding: 10, marginHorizontal: 5 }}>
                        <View style={{}}><Text style={{ fontSize: 14, paddingLeft: 5, }}>{item.message}</Text></View>
                        <View style={{}}><Text style={{ fontSize: 10, paddingLeft: 5, paddingTop: 5 }}>{item.time}</Text></View>
                    </View>
                    <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 40, backgroundColor: 'green' }}>
                        <Text style={{ color: 'white', fontWeight: '500', alignSelf: 'center' }}>
                            {item.from.charAt(0)}
                        </Text>
                    </View>
                </View>


                :


                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginHorizontal: 5, marginVertical: 2, paddingHorizontal: 10, paddingVertical: 10
                }}>
                    <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 40, backgroundColor: 'brown' }}>
                        <Text style={{ color: 'white', fontWeight: '500', alignSelf: 'center' }}>
                            {item.from.charAt(0)}
                        </Text>
                    </View>
                    <View style={{ maxWidth: width - 90, borderRadius: 5, backgroundColor: 'white', flexDirection: 'column', padding: 10, marginHorizontal: 5 }}>

                        <View style={{}}><Text style={{ fontSize: 14, paddingRight: 5, }}>{item.message}</Text></View>
                        <View style={{}}><Text style={{ fontSize: 10, paddingRight: 5, }}>{item.time}</Text></View>

                    </View>

                </View>

        );
    }

    gobacktoPrevious = () => {
        const { params } = this.props.navigation.state
        let notification = {
            orderNumber: params && params.item && params.item.orderNumber ? params.item.orderNumber : null,
        }
        updateAdminCountNavigate(notification)
        // if (params && params.getRepairorder()) {

        this.props.navigation.navigate('Chat')
        // }
        // else {
        //     this.props.navigation.goBack()
        // }

    }
    _scrollToIndex = () => {
        setTimeout(() => { this.flatlist.scrollToEnd([{ animated: true }]) }, 100);
    }

    render() {
        const { params } = this.props.navigation.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Header title={CHATDETAIL.CHATROOM}
                        navigateClick={(params.goBackParam) ? () => this.props.navigation.goBack() : () => this.gobacktoPrevious()}
                        leftIcon='ios-arrow-back' />
                    {
                        this.state.isLoading ?
                            <CustomSpinner /> : null
                    }
                    <ScrollView
                        ref="scrollView"
                        onContentSizeChange={(w, h) => { this.contentHeight = h, this.scrollToBottom() }}
                        onLayout={ev => this.scrollViewHeight = ev.nativeEvent.layout.height}
                        keyboardShouldPersistTaps={'handled'}
                    >
                        {
                            this.state.isLoading ?
                                null :
                                <View style={{ marginBottom: 60 }}>

                                    <FlatList
                                        ref={(ref) => this.flatlist = ref}
                                        // inverted
                                        // onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                                        // onLayout={() => this.flatList.scrollToEnd({animated: true})}
                                        extraData={this.state.messages}
                                        data={this.state.messages}
                                        //getItemLayout={this.getItemLayout}
                                        keyExtractor={this._keyExtractor.bind(this)}
                                        renderItem={this._renderChatListView.bind(this)}
                                        ListHeaderComponent={() => (!this.state.messages.length ?
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
                                                <Text style={{ fontSize: 16, color: 'black' }}>No messages</Text>
                                            </View>
                                            : null)
                                        }
                                    />
                                </View>
                        }
                    </ScrollView>

                </View>
                <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'white', flexDirection: 'row', padding: 5 }}>
                    <View style={[styles.chatBox, (this.state.textMessage && this.state.textMessage.trim() != '' ? { flex: 0.8 } : { flex: 1 })]}>
                        <TextInput
                            style={{ height: 40 }}
                            placeholder={CHATDETAIL.TYPE_A_MESSAGE}
                            placeholderTextColor='#999'
                            multiline={true}
                            //onFocus={this.scrollToBottom()}
                            underlineColorAndroid='transparent'
                            onChangeText={(textMessage) => this.setState({ textMessage })}
                            value={this.state.textMessage}
                        />
                    </View>
                    {
                        this.state.textMessage && this.state.textMessage.trim() != '' ?
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={this.sendMessage} hitSlop={{ left: 75, right: 75, top: 75, bottom: 75 }} activeOpacity={0.7}>
                                    <Image source={send} style={{ height: 40, width: 40 }} />
                                    {/* <View>
                                <Text style={{ color: 'red', fontSize: 16, fontWeight: 'bold' }} >Send</Text>
                            </View> */}
                                </TouchableOpacity>
                            </View>
                            :
                            null
                    }

                </View>
            </SafeAreaView >
        );
    }
}

export default ChatDetail


