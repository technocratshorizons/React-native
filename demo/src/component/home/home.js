import React, { Component } from 'react';
import {
      StyleSheet,Text,Image,
      View, StatusBar,Dimensions,TextInput,
      TouchableOpacity,onButtonPress,
      FlatList,
      RefreshControl
    } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DetailPage from '../home/detail';
const DEVICE_WIDTH = Dimensions.get('window').width;
import DATA from './data';



export default class Home extends Component{
    constructor(props , context) {
     super(props , context);
     this.state = {
        data: DATA
       
      };
    }

    goToDetailPage(e){
        this.props.navigation.navigate('DetailPage',{ param: e });        
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
                     <Text style={{color:'#fff',flex: 1,fontWeight:'bold',textAlign: 'center',fontSize:18,fontFamily: "Arial", right:70 }}>Home</Text>
                 </View>
                </View >          
                <View style={styles.list}>
                  <FlatList data={data}  keyExtractor={(item, index) =>index.toString()} renderItem={({item}) => 
                    <View style={styles.card}>
                                            
                        <Image source={{uri:item.picture}} style={{  width:DEVICE_WIDTH, height: 150}}/>
                        <Text style={styles.Name} onPress={this.goToDetailPage.bind(this,item)}>  {item.name}</Text>
                        <Text style={styles.last_message}>  {item.last_message}</Text>
                        <Text style={styles.time}>  LastUpdate : {item.time}</Text> 
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
    width:DEVICE_WIDTH,
    backgroundColor:'#ebeff0',    
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
    marginTop:5
},

Name:{
    flex: 1,
    fontWeight:'bold',
    color:'#9c27b0',
    textAlign: 'left',
    fontSize:18,
    fontFamily: "Arial",
    
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
}
});
          