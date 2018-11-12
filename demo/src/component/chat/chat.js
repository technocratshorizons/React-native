'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  Dimensions,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;



class Chat extends Component {
     constructor(props) {
    super(props);
    this.state = {

      demo: [
        {id:1, date:"9:50 am", type:'in',  message: "Heloooooo"},
        {id:2, date:"9:50 am", type:'out', message: "Hey"} ,
        {id:3, date:"9:50 am", type:'in',  message: "How r u"}, 
        {id:4, date:"9:50 am", type:'in',  message: "Where r from u"}, 
        {id:5, date:"9:50 am", type:'out', message: "Fn n nu"}, 
        {id:6, date:"9:50 am", type:'out', message: "India"}, 
        {id:7, date:"9:50 am", type:'in',  message: "Oka Good"}, 
        {id:8, date:"9:50 am", type:'in',  message: "India is a beautiful Country "},
        {id:9, date:"9:50 am", type:'in',  message: "I like indian peoples"},
      ],
      isLoading: false,
      button: false,
      name_address : '',
      recevierId:'',
      data: [],
      senderId:''
    };
  }

  sendMessage(text){
    alert(text);
         
    this.textInput.clear()
     AsyncStorage.getItem("userId").then((value) => {
      this.setState({ isLoading: true })

      fetch('http://192.168.2.33:3002/saveChatData', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'message'    : this.state.name_address,
            'recevierId' : this.state.recevierId,
            'senderId'   : value
          }),
        }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({ isLoading: false })

            const messageDate = {
              'message'    : this.state.name_address,
              'recevierId' : this.state.recevierId,
              'senderId'   : value
            }
            this.scrollView.scrollToEnd()
            this.state.data.push({'recevierId': messageDate.recevierId, 'senderId' : messageDate.senderId, 'message':messageDate.message, 'created_on': new Date()});
          })
          .catch((error) => {
          //alert("Invalid credientails");
          alert(error);
          });
     }).done();
  }

 
     

   componentDidMount(){

    let detail = this.props.navigation.state.params.param;
    this.setState({"recevierId": detail.data._id});

    AsyncStorage.getItem("userId").then((value) => {
      this.setState({"senderId": value});
  
      this.setState({ isLoading: true })
      fetch('http://192.168.2.33:3002/getUserChat', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'recevierId' : detail.data._id,
            'senderId'   : value
          }),
        }).then((response) => response.json())
          .then((responseJson) => {
            //alert(responseJson.data)

            this.setState({ data: this.state.data.concat( responseJson.data) })
            this.setState({ isLoading: false })

          })
          .catch((error) => {
            this.setState({ isLoading: false })
            
          //alert("Invalid credientails");
          alert(error);
          });

      }).done();
  }

    renderDate = (date) => {
      // alert(new Date(date).toLocaleString())
    return(
      <Text style={styles.time}>
        {new Date(date).toLocaleString()}
      </Text>
    );
  }


  render() {
    return (
      <View style={styles.container}>

       <View style={styles.topContainer}>
           <View style={styles.headerContainer}>

               <TouchableOpacity style={styles.memuIcon} onPress={() => {this.props.navigation.openDrawer(); } }>
                    <Image source={ require('../../assets/img/menu.png') } style={{ width: 25, height: 25}}/>
               </TouchableOpacity>
               <Text style={{color:'#fff',flex: 1,fontWeight:'bold',textAlign: 'center',fontSize:18,fontFamily: "Arial", right:80 }}>Chat</Text>
              
           </View>
        </View>

        {this.state.isLoading &&
          <View style={styles.loading}>
              <ActivityIndicator/>
          </View>}


        <FlatList style={styles.list}
          data={this.state.data}
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{        
              this.scrollView.scrollToEnd({animated: true});
          }}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={(message) => {


            const item = message.item;
            let inMessage = item.senderId == this.state.senderId;
            let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
            return (
              <View style={[styles.item, itemStyle]}>
                {!inMessage && this.renderDate(item.created_on)}
                <View style={[styles.balloon]}>
                  <Text>{item.message}</Text>
                </View>
                {inMessage && this.renderDate(item.created_on)}
              </View>
            )
          }}/>
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Write a message..."
                underlineColorAndroid='transparent'
                onChangeText={(name_address) => this.setState({name_address})}
                ref={input => { this.textInput = input }}
                />
          </View>
         
           {this.state.name_address != '' &&
            <TouchableOpacity style={styles.btnSend} onPress= {this.sendMessage.bind(this)}>
              <Image source={{uri:"https://png.icons8.com/small/75/ffffff/filled-sent.png"}} style={styles.iconSend}  />
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
container:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',     
  width:DEVICE_WIDTH,
  backgroundColor:'#e4e0e0',
  paddingBottom: 5   
},
topContainer:{
  paddingTop: 12,
  paddingBottom: 15,
  backgroundColor:'#9c27b0',
  width:DEVICE_WIDTH,
  position: 'absolute',
  top: 0,
  flex: 1,      
  right: 0,
  left: 0
},
headerContainer:{
  flexDirection: 'row',
  alignItems:'center'
},
list:{
  paddingHorizontal: 17,
  top:50,
  marginBottom:40
},
footer:{
  flexDirection: 'row',
  height:50,
  backgroundColor: '#eeeeee',
  paddingHorizontal:10,
  padding:5,
},
btnSend:{
  backgroundColor:"#00BFFF",
  width:40,
  height:40,
  borderRadius:360,
  alignItems:'center',
  justifyContent:'center',
},
iconSend:{
  width:30,
  height:30,
  alignSelf:'center',
},
inputContainer: {
  borderBottomColor: '#F5FCFF',
  backgroundColor: '#FFFFFF',
  borderRadius:30,
  borderBottomWidth: 1,
  height:40,
  flexDirection: 'row',
  alignItems:'center',
  flex:1,
  marginRight:10,
},
inputs:{
  height:40,
  marginLeft:16,
  borderBottomColor: '#FFFFFF',
  flex:1,
},
balloon: {
  maxWidth: 350,
  padding: 15,
  borderRadius: 20,
},
itemIn: {
  alignSelf: 'flex-start'
},
itemOut: {
  alignSelf: 'flex-end'
},
time: {
  alignSelf: 'flex-end',
  margin: 15,
  fontSize:12,
  color:"#808080",
},
item: {
  marginVertical: 14,
  flex: 1,
  flexDirection: 'row',
  backgroundColor:"#eeeeee",
  borderRadius:300,
  padding:5,
},
memuIcon:{
  flex: 1,            
  marginLeft:10
},
loading: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  opacity: 0.5,
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center'
}
});  

export default Chat;