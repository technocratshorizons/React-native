import React, { Component } from 'react';
import {StyleSheet,Text,Image, FlatList, View, StatusBar,Dimensions,TextInput,TouchableOpacity,onButtonPress} from 'react-native';
import Register from '../register/Register';
import Contacts from 'react-native-contacts';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import simpleContacts from 'react-native-simple-contacts';

const DEVICE_header = Dimensions.get('window').width;
const deviceMax = DEVICE_header/2;
const first = deviceMax/2;
const deviceMin = DEVICE_header-first;


const DEVICE_WIDTH = Dimensions.get('window').width-20;
export default class ContactList extends Component{
    constructor(props , context) {
     super(props , context);
     //this.getContacts= this.getContacts.bind(this);
     this.state = {
         contacts :[],
         color:''
     }
    
    }

 
 componentDidMount(){   
    simpleContacts.getContacts().then((contacts) => {
        console.log( JSON.parse(contacts));
        var contacts = JSON.parse(contacts);
        var arr = [];
        for(let i=0;i<contacts.length;i++){       
         var fL = contacts[i].name;
         var z = fL.charAt(0)
         var letters = '0123456789ABCDEFGHIJKLMNOPQRTSWXYZ';
         var color = '#';
         for (var j = 0; j < 6; j++) {
          color += letters[Math.floor(Math.random() * 16)];         
         }                  
         arr.push({"name":fL,"number":  contacts[i].number,"color":color,"firstLetter":z})
        }        
         this.setState({contacts:arr})
        })
}


 MakeCall(e){
    RNImmediatePhoneCall.immediatePhoneCall(e);
 }  
 
 render(){
 
  
    return (
        <View style={styles.container}>
             <View style={styles.topContainer}>
               <View style={styles.headerContainer}>
                   <TouchableOpacity style={styles.memuIcon} onPress={() => {this.props.navigation.navigate('DrawerOpen'); } }>
                        <Image source={ require('../../assets/img/menu.png') } style={{ width: 25, height: 25}}/>
                   </TouchableOpacity>
                   <Text style={{color:'#fff',flex: 1,fontWeight:'bold',textAlign: 'center',fontSize:18,fontFamily: "Arial"}}>My Contacts</Text>
                  <Text style={styles.searchIcon}>
                      <Image source={ require('../../assets/img/search.png') } style={{ width: 50, height: 50}}/>
                  </Text>
               </View>
              </View >          
              <View style={styles.list}>
                <FlatList data={this.state.contacts} keyExtractor={(item, index) =>index.toString()}  renderItem={({item}) => 
                  <View key={item.recordID} style={{width:DEVICE_header,flexDirection: 'row',flex:1,paddingLeft:10}}>
                      <Text style={{width: first/2, height: 50,borderRadius: 50,textAlignVertical:'center',backgroundColor:item.color,textAlign:'center', color:'#fff',}}> 
                         <Text style={styles.innerText} color='#fff'>{item.firstLetter}</Text>
                      </Text>
                      <View style={{width:deviceMin,marginLeft:10}}>
                       <Text style={styles.last_message} > {item.name}</Text>
                       <Text style={styles.time}  onPress={this.MakeCall.bind(this,item.number)}><Icon name="phone-square" size={20} color="#dbbbf6"/> {item.number}</Text> 
                      </View>
                  </View>
                }
               /> 
              </View>       
              
        </View>
       
    )
     
     
}
}

const styles = StyleSheet.create({
container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',     
    width:DEVICE_header
        
},
topContainer:{
    paddingTop: 12,
    paddingBottom: 15,
    backgroundColor:'#9c27b0',
    width:DEVICE_header,
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
    marginLeft:20
},
searchIcon:{ 
    flex: 1,        
    textAlign: 'right',
    marginRight:20
},
list:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',     
    width:DEVICE_header,
    top:55,       
    marginTop:10,      
},    
innerText:{               
    fontFamily:'Arial',
    fontSize:18,
    marginLeft:20,
    marginTop:20
},   
last_message:{
    flex: 1,
    width:DEVICE_header,
    fontWeight:'bold',        
    textAlign: 'left',
    color:'#666',
    fontSize:16,
    fontFamily: "Arial",
    marginBottom:5,
    marginTop:5
},
time:{
    flex: 1,     
    width:DEVICE_header,
    textAlign: 'left',
    fontSize:14,
    color:'#dbbbf6',
    fontFamily: "Arial",       
    borderBottomColor: '#9c27b0',
    borderBottomWidth: 1,
    paddingBottom:10 
}
    
   
});