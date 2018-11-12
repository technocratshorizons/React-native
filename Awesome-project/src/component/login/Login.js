import React, { Component } from 'react';
import {StyleSheet,Text,Image, View, StatusBar,Dimensions,TextInput,ToastAndroid, TouchableOpacity,onButtonPress, AsyncStorage, ActivityIndicator} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from '../home/home';
import firebaseApp from '../firebase';
const DEVICE_WIDTH = Dimensions.get('window').width-20;


export default class Login extends Component{
    constructor(props , context) {
     super(props , context);
     this.state={          
        email: '',
        password: '',
        isLoading: false,
        token:''
      }
    }


  componentDidMount() {
    AsyncStorage.getItem("app_token").then((value) => {
    // alert(value)
    this.setState({"token":value});
    })
  }
    

  login(){
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(this.state.email == '' || this.state.email == undefined){

      ToastAndroid.show('Please Enter Email Address', ToastAndroid.BOTTOM)

    }else if(reg.test(this.state.email) === false){

      ToastAndroid.show('Please Enter Valid Email Address', ToastAndroid.BOTTOM)

    }else if (this.state.password == '' || this.state.password == undefined){
      
      ToastAndroid.show('Please Enter Password', ToastAndroid.BOTTOM)

    }else{
     // alert('email: ' + this.state.email + ' password: ' + this.state.password)
       this.setState({ isLoading: true })
      fetch('http://192.168.2.33:3002/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          token:this.state.token
        }),
      }).then((response) => response.json())
        .then((responseJson) => {
        this.setState({ isLoading: false })
        //alert(responseJson.data._id);
        if(responseJson.status == 1){
          AsyncStorage.setItem('userId', responseJson.data._id);
          AsyncStorage.setItem('username', responseJson.data.username);
          AsyncStorage.setItem('userImage', responseJson.data.image);
          ToastAndroid.show('you logged in successfully.', ToastAndroid.BOTTOM)
          this.props.navigation.navigate('Home');           
        }else{
          ToastAndroid.show('Invalid credientails.', ToastAndroid.BOTTOM)
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        //alert("Invalid credientails");
        alert(error);
      });
    }
  }
      
    
  render(){  
        
    const { navigate } = this.props.navigation
    let pic = { uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'};
      return(
        
      <View style={styles.container}>              

          <TextInput style = {styles.input} 
              autoCapitalize="none" 
              underlineColorAndroid='transparent'
              onChangeText={(email)=> this.state.email = email} 
              autoCorrect={false} 
              keyboardType='email-address' 
              returnKeyType="next" 
              placeholder='Email' 
              placeholderTextColor='#666'/>

          <TextInput style = {styles.input}   
              returnKeyType="go" 
              onChangeText={(password)=> this.state.password = password}
              underlineColorAndroid='transparent'
              ref={(input)=> this.passwordInput = input} 
              placeholder='Password' 
              placeholderTextColor='#666' 
              secureTextEntry/>

          <TouchableOpacity style={styles.buttonContainer}   onPress={this.login.bind(this)}>
                      <Text  style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          
          <Text>Forget Password</Text>
          <Text onPress={() => navigate("Register")}>Don't have account?SIGNUP</Text>

            {this.state.isLoading &&
            <View style={styles.loading}>
                <ActivityIndicator/>
            </View>
            }      
      </View> 
    )
  }
}

const styles = StyleSheet.create({
container:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},   
input:{
  height: 50,
  paddingVertical: 15,
  backgroundColor: '#fff',          
  marginTop:10,
  marginBottom:15, 
  color: '#9c27b0',
  width:DEVICE_WIDTH,
  borderRadius: 5,          
  borderTopColor: '#9c27b0',
  borderTopWidth: 2,

  borderLeftColor: '#9c27b0',
  borderLeftWidth: 2,

  borderRightColor: '#9c27b0',
  borderRightWidth: 2,

  borderBottomColor: '#9c27b0',
  borderBottomWidth: 2,
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
buttonContainer:{
  backgroundColor: '#9c27b0',        
  paddingVertical: 15,
  width:DEVICE_WIDTH,
  padding: 20,
  marginTop:20,
  borderRadius: 5    
},
buttonText:{
  color: '#fff',
  textAlign: 'center',
  fontWeight: '700',
  width:DEVICE_WIDTH,
  fontSize:18             
}
   
})