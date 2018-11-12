import React , { Component }from 'react';
import { Dimensions,  StyleSheet,  ScrollView,  View,  Image,  Text , AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const DEVICE_WIDTH = Dimensions.get('window').width;
import { StackNavigator } from 'react-navigation';
// import firebaseApp from '../firebase';
import Login from '../login/Login';
import Home from '../home/home';
import ContactList from '../contacts/contacts';
import Register from '../register/Register';
import DetailPage from '../home/detail';
import UserList from '../userlist/userlist';
import Google from '../google/google';




export default class SideMenu extends Component{

  constructor(props){
    super(props);

    this.state = {   
        name:'',
        user_Image:''
    };

    console.disableYellowBox = true;
}



  logout() {
    try {
        //firebaseApp.auth().signOut();
        AsyncStorage.removeItem('username')
        this.props.navigation.navigate('Login');      

    } catch (error) {
        alert(error);
    }
  }

  componentWillMount(){ 

    AsyncStorage.getItem("username").then((value) => {
      //alert(value);
      this.setState({"name": value});
    }).done();

    AsyncStorage.getItem("userImage").then((value) => {
      alert(value);

      var image_Url =  'http://192.168.2.33:3002/' + value;
      //alert(image_Url)
      this.setState({"user_Image": image_Url});

      //this.setState({"name": value});
    }).done();
  }



  contactList() {
    try {
      //firebaseApp.auth().signOut();
      this.props.navigation.navigate('ContactList');       
    } catch (error) {
      alert(error);
    }
  }
  
  render(){

    const { navigate } = this.props.navigation;

    return(

      <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{uri: this.state.user_Image}} />
        <Text style={styles.name}>{this.state.name}</Text>
      </View>
      
  

      <Text onPress={() => navigate("Contact")} style={styles.item}> <Image source={ require('../../assets/img/profile.png') } style={{ width: 50, height: 50}}/>   Profile</Text>

      <Text onPress={() => navigate("UserList")} style={styles.item}> <Image source={ require('../../assets/img/user.png') } style={{ width: 50, height: 50}}/>  User List</Text>

      <Text onPress={() => navigate("Google")} style={styles.item}> <Image source={ require('../../assets/img/menu.png') } style={{ width: 50, height: 50}}/>  Calendar</Text>

      <Text onPress={this.logout.bind(this)} style={styles.item}> <Image source={ require('../../assets/img/logout.png') }  style={{ width: 50, height: 50}}/>   Logout</Text>
    
      </ScrollView>
    )
    
  } 
} 



const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_WIDTH.height,
    backgroundColor: '#9c27b0',
   
  },
  avatarContainer: {
    marginBottom: 20,  
    marginRight:50,
    backgroundColor: '#9c27b0',
    width:DEVICE_WIDTH,
    
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,  
    marginLeft:80,    
    flex: 1,
  },
  name: {
    position: 'absolute',
    alignItems: 'center',
    top: 120,      
    marginLeft:90,
    textAlign: "center",
    fontWeight:'bold', 
    color:'#fff',
    fontSize:18,
    fontFamily: "Arial",  
  },
  item: {
    fontSize: 16,
    color:'#fff',
    fontFamily: "Arial",
    fontWeight: '300',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: "Arial",       
    fontWeight:'bold',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
});