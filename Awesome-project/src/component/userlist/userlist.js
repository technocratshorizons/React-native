'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NativeModules,
  DeviceEventEmitter,
  ActivityIndicator,
  CameraRoll,
  TouchableOpacity,
  Modal,
  Dimensions,
  FlatList,
  Button,
  AsyncStorage,
  SearchBar,
  TextInput
} from 'react-native';
import Chat from '../chat/chat';

const DEVICE_WIDTH = Dimensions.get('window').width;
const list = []

class UserList extends Component {
   constructor(props) {
    super(props);

    this.state = {
      uploading: false,
      showUploadModal: false,
      uploadProgress: 0,
      uploadTotal: 0,
      uploadWritten: 0,
      uploadStatus: undefined,
      cancelled: false,
      images: [],
      list:[],
      image_url:'http://192.168.2.33:3002/',
      text:'',
      isLoading: false,

    } 
    this.arrayholder = [];
  }

  componentWillMount(){ 

  AsyncStorage.getItem("userId").then((value) => {
    //alert(value);
    //this.setState({"userId": value});
       this.setState({ isLoading: true })


        fetch('http://192.168.2.33:3002/getUserList', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: value,
            }),
          }).then((response) => response.json())
              .then((responseJson) => {
                  console.log(responseJson);
                this.setState({ isLoading: false })
                this.arrayholder = responseJson.data ;

                this.setState({ list: this.state.list.concat( responseJson.data) })
              })
              .catch((error) => {
                this.setState({ isLoading: false })
                
                //alert("Invalid credientails");
                alert(error);
              });

        }).done();
  }



  GoToChatPage(e){
    //alert(e._id);

     let data = {data : e}

    //this.props.navigation.navigate('Chat'); 
      this.props.navigation.navigate('Chat',{param : data});


  }


SearchFilterFunction (text){
    this.setState({text:   text})
    const newData = this.arrayholder.filter(function(item){
    const itemData = item.username.toUpperCase()
    const textData = text.toUpperCase();
    //alert(textData);
     return itemData.indexOf(textData) > -1
    })
  this.setState({list:   newData})
}


render() {
    const data =this.state.data;
    return (


        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.memuIcon} onPress={() => {this.props.navigation.openDrawer(); } }>
                        <Image source={ require('../../assets/img/menu.png') } style={{ width: 25, height: 25}}/>
                    </TouchableOpacity>
                    <Text style={{color:'#fff',flex: 1,fontWeight:'bold',textAlign: 'center',fontSize:18,fontFamily: "Arial", right:70 }}>User List</Text>
                
                </View>
            </View> 

            <View style={styles.list}>

                {this.state.isLoading &&
                <View style={styles.loading}>
                    <ActivityIndicator/>
                </View>}


                <TextInput 
                style={styles.TextInputStyleClass}
                onChangeText={(text) => this.SearchFilterFunction(text)}
                value={this.state.text}
                placeholder="Search User By Name....."
                />

                <FlatList data={this.state.list}  keyExtractor={(item, index) =>index.toString()} renderItem={({item}) => 

                <View style={styles.card}>
                 
                {item.image  ?(
                <Image source={{uri:'http://192.168.2.33:3002/'+item.image}} style={{ height: 150 ,  width:150, left:10}}/>
                ): (
                <Image source={ require('../../assets/img/user.png')} style={{ height: 150 ,  width:150, left:10}}/>
                )}

                    <Text style={styles.Name}>  {item.username}</Text>
                    <Text style={styles.time}>  Email : {item.email}</Text> 
                    <TouchableOpacity style={styles.button} onPress={this.GoToChatPage.bind(this , item)}>
                        <Text>Chat</Text>
                    </TouchableOpacity>

                </View>
                
                }
                /> 
            </View>            
        </View>
    )
  }
}




var styles = StyleSheet.create({
container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',     
    width:DEVICE_WIDTH,
    backgroundColor:'#ebeff0',
    paddingBottom: 25   
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
    left: 0, 
},
headerContainer:{
    flexDirection: 'row',
    alignItems:'center'
},

memuIcon:{
    flex: 1,            
    marginLeft:10
},
searchIcon:{ 
    flex: 1,          
    textAlign: 'right',
    marginRight:10
},
list:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',     
    width:DEVICE_WIDTH,
    top:50,
    paddingBottom:10,
    paddingTop:10,
    paddingLeft:10,
    paddingRight:10,
    margin: 7
},
card:{
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor:'white',
    marginBottom:5,
    marginTop:5,
    width:DEVICE_WIDTH
},
Name:{
    flex: 1,
    fontWeight:'bold',
    color:'#9c27b0',
    fontSize:18,
    fontFamily: "Arial",
    textAlign: 'left'
    
},
last_message:{
    flex: 1,
    fontWeight:'bold',
    color:'#666',
    textAlign: 'left',
    fontSize:14,
    fontFamily: "Arial",
    marginBottom:5
},
time:{
    flex: 1,            
    color:'grey',
    textAlign: 'left',
    fontSize:12,
    fontFamily: 'Arial',
    marginBottom:15,
    
},
button:{
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: '#9c27b0',
    borderRadius: 15,
    padding: 10,
    width: 100,
    justifyContent: 'center', 
    alignItems: 'center',
    color: '#fff'
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
},

TextInputStyleClass:{   
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 7 ,
    backgroundColor : "#FFFFFF",
    width:340
        
}
});

export default UserList;