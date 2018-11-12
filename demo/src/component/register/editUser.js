import React, { Component } from 'react';
import {StyleSheet,Text,Image, View,StatusBar,Dimensions,TextInput,TouchableOpacity,ToastAndroid, onButtonPress,Picker, ScrollView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from '../login/Login';
// import Conatct from '../profile/Conatct';
import firebaseApp from '../firebase';
import Geocoder from 'react-native-geocoder';
import Icon from 'react-native-vector-icons/FontAwesome';



const DEVICE_WIDTH = Dimensions.get('window').width-20;
export default class editUser extends Component{
    constructor(props , context) {
     super(props , context);
     this.state={
        username:'',
        email: '',       
        phone:'',
        userId:''
      }
    }
  
   
  componentDidMount(){

      console.log(this.props.navigation.state.params.param)
      let detail = this.props.navigation.state.params.param;
      this.setState({username : detail.data.username})
      this.setState({email : detail.data.email})
      this.setState({phone : detail.data.phone})
      this.setState({userId : detail.data.userId})

  }
    
  updateUser(){
  
    console.log(this.state.username)
    console.log(this.state.email)
    console.log(this.state.phone)

     fetch('http://192.168.2.33:3002/editProfile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        phone: this.state.phone,
        userId : this.state.userId
      }),
    }).then((response) => response.json())
        .then((responseJson) => {
          //alert(responseJson.data._id);

        if(responseJson.status == 1){
             ToastAndroid.show('User updated successfully.', ToastAndroid.BOTTOM);
        }else{
             ToastAndroid.show('Invalid credientails.', ToastAndroid.BOTTOM)
        }
      })
        .catch((error) => {
             ToastAndroid.show('Something went wrong.', ToastAndroid.BOTTOM)
    });
  }
      

    
render(){ 
    const { navigate } = this.props.navigation;
    return(
        <View style={styles.container}>
            <ScrollView>             
                <View style={styles.content1}>
                    <View style={styles.topContainer}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity style={styles.memuIcon} onPress={() => { navigate('Contact'); } }>
                        <Icon name="arrow-left" color="#fff" size={20} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Edit Profile</Text>                
                    </View>
                    </View >          
                </View>   

                <TextInput style = {styles.input} 
                autoCapitalize="none" 
                underlineColorAndroid='transparent'
                onChangeText={(username)=>  this.setState({username})}
                autoCorrect={false}                
                returnKeyType="next"               
                value = {this.state.username}
                placeholderTextColor='#666'/>

                <TextInput style = {styles.input} 
                autoCapitalize="none" 
                underlineColorAndroid='transparent'
                onChangeText={(email)=> this.setState({email})} 
                autoCorrect={false}                
                returnKeyType="next"               
                value = {this.state.email}
                editable={false}
                placeholderTextColor='#666'/>

            

            <TextInput style = {styles.input} 
                autoCapitalize="none" 
                underlineColorAndroid='transparent'
                onChangeText={(phone)=> this.setState({phone}) }
                autoCorrect={false}                
                returnKeyType="next"
                value = {this.state.phone}
                placeholderTextColor='#666'/>
                
                
                <TouchableOpacity style={styles.buttonContainer}  onPress={this.updateUser.bind(this)}>
                <Text  style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View> 
     ) 
}
}

const styles = StyleSheet.create({
container:{
    flex: 1 
},  
content1: {
    width: '100%',
    height: 50,   
    backgroundColor: '#9c27b0',
    justifyContent: 'center',
    alignItems: 'center',
},
topContainer:{
    paddingTop: 15,
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
    alignItems:'center',
    width:'100%'
},
memuIcon:{       
    width:'10%',
    paddingLeft:5,
    paddingRight:5
},
headerContent:{
    fontWeight:'bold', 
    color:'#9c27b0',
    fontSize:26,
    fontFamily: "Arial",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20
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
    alignItems: 'center',
    left:10,
    right:10
},
Picker:{
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
buttonContainer:{
    backgroundColor: '#9c27b0',        
    paddingVertical: 15,
    width:DEVICE_WIDTH,
    padding: 20,
    marginTop:20,
    borderRadius: 5,
    left:10,
    right:10 
},
 buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    width:DEVICE_WIDTH,
    fontSize:18       
},
 title:{     
    fontWeight:'bold',
    color:'#fff',
    textAlign: 'center',
    fontSize:20,
    fontFamily: "Arial",
    width:'80%'
},  
})
