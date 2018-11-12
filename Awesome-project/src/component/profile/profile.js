import React , { Component }from 'react';
import { Dimensions,  StyleSheet,Platform,  ScrollView,ToastAndroid,  View,  Image,  Text,TouchableOpacity, AsyncStorage, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import editUser from '../register/editUser';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebaseApp from '../firebase';
// import ImagePicker from 'react-native-image-crop-picker';

const DEVICE_WIDTH = Dimensions.get('window').width;
const midWidth = DEVICE_WIDTH-DEVICE_WIDTH/2;
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;


class Contact extends Component {
  constructor(props){
    super(props);

    this.state = {   
     
        image_uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
        profile_pic:'',
        recordId :'',
        userDetail:'',
        userId:'',
        username:'',
        email:'',
        phone:'',
        gender:'',
        isLoading: false,
        data:''

    };
}


componentWillMount(){ 

  AsyncStorage.getItem("userId").then((value) => {
    //alert(value);
    //this.setState({"userId": value});
       this.setState({ isLoading: true })


        fetch('http://192.168.2.33:3002/profile', {
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
                this.setState({ isLoading: false })
                this.setState({"username": responseJson.data.username});
                this.setState({"email": responseJson.data.email});
                this.setState({"phone": responseJson.data.phone});
                this.setState({"gender": responseJson.data.gender});
                this.setState({"userId": responseJson.data._id});
                this.setState({"image_uri": responseJson.data.image});
              })
              .catch((error) => {
                //alert("Invalid credientails");
                alert(error);
              });

        }).done();
  }

 

  selectPhotoTapped() {

      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        noData: false,
        storageOptions: {
          skipBackup: true
        }
      };
  
      ImagePicker.showImagePicker(options, (response) => {
        //alert('Response = ', response);
  
        if (response.didCancel) {
          alert('User cancelled photo picker');
        }
        else if (response.error) {
          alert('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          alert('User tapped custom button: ', response.customButton);
        }
        else { 
           
          this.setState({image_uri: response.uri})

            AsyncStorage.getItem("userId").then((value) => {


              RNFetchBlob.fetch('POST', 'http://192.168.2.33:3002/editProfilePic', {
                  Authorization : "Bearer access-token",
                  otherHeader : "foo",
                   'Content-Type' : 'multipart/form-data',
                  //'Content-Type': 'image/png; charset=utf-8'
                }, [
                  // element with property `filename` will be transformed into `file` in form data
                  // { name : 'avatar', filename : 'avatar.png', data: binaryDataInBase64},
                  // // custom content type
                  // { name : 'avatar-png', filename : 'avatar-png.png', type:'image/png', data: binaryDataInBase64},
                  // // part file from storage
                  { name : 'avatar', 'filename' :response.fileName, 'type':response.type, 'data':RNFetchBlob.wrap(response.uri)},
                  { name : 'name', data : value},
                  // elements without property `filename` will be sent as plain text
                 
                ]).then((resp) => {
                  //alert(resp.data);
                    ToastAndroid.show('profile image updated successfully.', ToastAndroid.BOTTOM);

                  // ...
                }).catch((err) => {
                alert(err);

                  // ...
                })
          
              })
        }
      });
    }
    
    
    goToEditUser(e){
      let data = {"key" :this.state.recordId , data : e}
      this.props.navigation.navigate('editUser',{param : data});
    }

    render(){

        const { navigate } = this.props.navigation;
        return(
        
          <View style={styles.container}>
            <View style={styles.content1}>
                <View style={styles.topContainer}>
                 <View style={styles.headerContainer}>
                     <TouchableOpacity style={styles.memuIcon} onPress={() => { navigate('Home'); } }>
                       <Icon name="arrow-left" color="#fff" size={20} />
                     </TouchableOpacity>
                     <Text style={styles.title}>Profile</Text>
                     <TouchableOpacity style={styles.searchIcon}>
                       <Icon name="edit" size={20} color="#fff" onPress= {this.goToEditUser.bind(this,this.state)}/>
                     </TouchableOpacity>                  
                 </View>
                </View>          
            </View>   

            <View style={styles.content2}>
              <ScrollView scrollsToTop={false} style={styles.menu}>         
          
                  <View style={styles.avatarContainer}>
                   {this.state.image_uri  ? (
                    <Image source={{uri:'http://192.168.2.29:3002/'+this.state.image_uri}} style={styles.avatar}/>
                    ): (
                    <Image source={ require('../../assets/img/user.png')} style={styles.avatar}/>
                    )}     
                  </View> 
                 
                  <Text style={styles.camera} ><Icon name="camera" size={15} color="#9c27b0" onPress={this.selectPhotoTapped.bind(this)}/></Text>         
                  <Text style={styles.name}> {this.state.username}</Text>
                  <View>
                      <Text  style={styles.item}><Icon name="user" size={20} color="#9c27b0"/><Text>  {this.state.username}</Text></Text>                                       
                      <Text  style={styles.item}><Icon name="envelope" size={20} color="#9c27b0"/>   {this.state.email}</Text>
                      <Text  style={styles.item}><Icon name="phone" size={20} color="#9c27b0"/>   {this.state.phone}</Text>
                      <Text  style={styles.item}><Icon name="user" size={20} color="#9c27b0"/>   {this.state.gender}</Text>
                      {this.state.isLoading &&
                  <View style={styles.loading}>
                      <ActivityIndicator/>
                  </View>
                  }
                      
                  </View>             
                </ScrollView>
            </View>
          </View>
        ) 
    } 
}


const styles = StyleSheet.create({
container: {
  flex: 1,
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
searchIcon:{             
  paddingLeft:5,
  width:'10%',
  paddingRight:5
},
title:{     
  fontWeight:'bold',
  color:'#fff',
  textAlign: 'center',
  fontSize:20,
  fontFamily: "Arial",
  width:'80%'
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
  
content2: {
  width: '100%',
  height: '100%',   
  backgroundColor: '#fff',
  justifyContent: 'center',
  alignItems: 'center',
},
menu: {
  flex: 1,
  width: DEVICE_WIDTH,
  height: DEVICE_WIDTH.height,
  top:0,
  backgroundColor: '#fff',
}, 
avatarContainer: {        
  backgroundColor: '#fff',
  width:DEVICE_WIDTH,
  alignItems: 'center',               
  flex: 1,
},
      
avatar: {
  width: 100,
  height: 100,
  borderRadius: 50,
  marginTop: 20,
  marginBottom: 20,
  alignItems: 'center',              
  flex: 1,
},
camera:{
  flex: 1,
  width:DEVICE_WIDTH,       
  textAlign: 'center',
},
name: {       
  textAlign: 'center',              
  fontWeight:'bold', 
  color:'#9c27b0',
  fontSize:18,
  fontFamily: "Arial",
  marginBottom: 40,  
},
item: {
  flex: 1, 
  flexDirection: 'row',
  width:DEVICE_WIDTH,  
  fontSize: 16,
  color:'#9c27b0',
  fontFamily: "Arial",
  fontWeight: '300',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
  fontFamily: "Arial",       
  fontWeight:'bold',
  borderBottomColor: '#9c27b0',
  borderBottomWidth: 1,
}
})

export default Contact;