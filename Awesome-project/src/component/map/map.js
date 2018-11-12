'use strict';

import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Modal,
  TouchableHighlight,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  Image,
  AsyncStorage
} from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width-20;
import Icon from 'react-native-vector-icons/FontAwesome';
import {Calendar} from 'react-native-calendars';
import  { SwipeListView , SwipeRow } from 'react-native-swipe-list-view';


class Map extends Component {
    constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      date: '',
      title: '',
      comment:'',
      data:[],
      data1:[]
    };
    this.onDayPress = this.onDayPress.bind(this);
  }


  componentWillMount(){ 

    const TodayDate = new Date().toISOString().split('T')[0]
    this.setState({"date": TodayDate});

    AsyncStorage.getItem("userId").then((value) => {
      //alert(value);
      //this.setState({"userId": value});
         this.setState({ isLoading: true })
  
  
          fetch('http://192.168.2.29:3002/get_events', {
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

                this.setState({ data: this.state.data.concat( responseJson.data) })
                this.setState({ data1: this.state.data1.concat( responseJson.data) })

                 // alert(responseJson.data.title)
                })
                .catch((error) => {
                  //alert("Invalid credientails");
                  alert(error);
                });
  
          }).done();
    }  

setModalVisible() {
    this.setState({modalVisible: false});
}


onDayPress(day) {
  this.setState({ date: day.dateString });    
  this.setState({ selected: day.dateString  });

 const a =  this.state.data1.filter(function(item, index, array){  
    if(day.dateString == item.date){
      return item;
    }
  });
  this.setState({ "data": a})
}

GoToAddEvent(){
  this.setState({modalVisible: true});
}

addEvent() {
  AsyncStorage.getItem("userId").then((value) => {
  if(this.state.title == '' || this.state.title == undefined){
    ToastAndroid.show('Please Enter Text', ToastAndroid.BOTTOM)
  }else{
  // alert(this.state.date + ' ' +this.state.text+ ' ' +this.state.comment);
   fetch('http://192.168.2.33:3002/add_events', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date   : this.state.date,
      title  : this.state.title,
      comment: this.state.comment,
      userId : value
    }),
  }).then((response) => response.json())
      .then((responseJson) => {

       
        //alert(responseJson.data._id);

        if(responseJson.status == 1){
         ToastAndroid.show('Events added successfully.', ToastAndroid.BOTTOM)
         this.componentWillMount();
         this.setState({modalVisible: false});       
        }else{
         ToastAndroid.show('Invalid credientails.', ToastAndroid.BOTTOM)
        }
      })
      .catch((error) => {
        //alert("Invalid credientails");
        alert(error);
      });
  }
}).done();
}

renderDate = (date) => {
return(
  <Text style={styles.time}>
    {new Date(date).toLocaleString()}
  </Text>
);
}



 render() {

  const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
       <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View>
            <View>
              <View style={styles.content1}>
                <View style={styles.topContainer}>
                 <View style={styles.headerContainer}>
                     <Text style={styles.title}>Add Event</Text>                  
                 </View>
                </View >          
              </View>  
            <Icon name="close" 
              onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
              }}
             style={{
                    position: 'absolute',
                    right: 10,
                    top: 20,
                    bottom: 0,
                    fontWeight:20,
                    color:'#fff',
                    fontSize:18
              }} />
            <TextInput style = {styles.input} 
              autoCapitalize="none" 
              underlineColorAndroid='transparent'
              onChangeText={(date)=>  this.setState({date})}
              autoCorrect={false}                
              returnKeyType="next" 
              placeholder='Selected Date' 
              placeholderTextColor='#666'
              editable={false} 
              selectTextOnFocus={false}
              value={this.state.date}/>

            <TextInput style = {styles.input} 
              autoCapitalize="none" 
              underlineColorAndroid='transparent'
              onChangeText={(title)=> this.state.title = title} 
              autoCorrect={false}                
              returnKeyType="next" 
              placeholder='Enter Event Title' 
              placeholderTextColor='#666'/>

            <TextInput style = {styles.input}
              autoCapitalize="none" 
              underlineColorAndroid='transparent'
              multiline={true}
              numberOfLines={4}
              placeholder='Enter Event Description' 
              onChangeText={(comment) => this.setState({comment})}
              value={this.state.comment}
              placeholderTextColor='#666'
              returnKeyType="next" 
              autoCorrect={false}/>

            <TouchableOpacity style={styles.buttonContainer} >
               <Text  style={styles.buttonText} onPress={this.addEvent.bind(this)}>Add Event</Text>
            </TouchableOpacity>
            </View>
          </View>
        </Modal>

         <View style={styles.content1}>
                <View style={styles.topContainer}>
                 <View style={styles.headerContainer}>
                     <TouchableOpacity style={styles.memuIcon} onPress={() => { navigate('Home'); } }>
                       <Icon name="arrow-left" color="#fff" size={20} />

                     </TouchableOpacity>
                     <Text style={styles.title}>Calendar</Text>
                     <TouchableOpacity style={styles.searchIcon}>
                       <Icon name="plus" size={20} color="#fff"  onPress= {this.GoToAddEvent.bind(this)}/>
                     </TouchableOpacity>                  
                 </View>
                </View >         
            </View> 
        
        
        <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: '#9c27b0'}}}
        />

        
        <FlatList
            style={styles.root}
            extraData={this.state}
            data={this.state.data}

            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator}/>
              )
            }}


              renderItem={(item) => {
          const Notification = item.item;
          return(
            <View style={styles.container1}>
              <TouchableOpacity onPress={() => {}}>
              <Icon style={styles.image} name="book" size={50} color="#9c27b0"/>
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text  style={styles.name}>{Notification.title}</Text>
                  <Text style={styles.time}>
                  {Notification.date /* {this.renderDate(Notification.created_on)} */}

                  </Text>
                </View>
                <Text rkType='primary3 mediumLine'>{Notification.comment}</Text>
              </View>
            </View>
          );
        }}


        />


    {/* <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 20}}>
      <TouchableOpacity onPress={() => { this.setState({ state: 3 }) }}><Text style={{fontSize: 11, padding: 5, color: '#FFCE2B'}}>ADD MORE NOTES</Text></TouchableOpacity>
      <TouchableOpacity onPress={this._startOver.bind(this)} style={{backgroundColor: '#FFCE2B', borderRadius: 2, alignItems: 'center', justifyContent: 'center', padding:5, width: 115 }}><Text style={{color: 'white', fontSize: 11}}>START OVER</Text></TouchableOpacity>
    </View> */}

     <View style= {styles.demo}>
      <TouchableOpacity onPress={() => { this.setState({ state: 3 }) }}><Text style=
      {styles.text1}>ADD MORE NOTES</Text></TouchableOpacity>
      
      <TouchableOpacity onPress={this._startOver.bind(this)} style={styles.text2}><Text style={styles.innerText}>START OVER</Text></TouchableOpacity>
    </View>

      </ScrollView>  
    );
  }
}

const styles = StyleSheet.create({

  demo :{
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-around', 
    marginTop: 20
  },

  text1:{

    fontSize: 11,
    padding: 5, 
    color: '#FFCE2B'
  },

  text2: {
    backgroundColor: '#FFCE2B', 
    borderRadius: 2,
    alignItems: 'center', 
    justifyContent: 'center',
    padding:5,
    width: 115 
  },

  innerText:{

    color: 'white', 
    fontSize: 11

  },


  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
    input:{
        height: 50,
        paddingVertical: 15,
        backgroundColor: '#fff',          
        marginTop:20,
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
        justifyContent: 'center',
        right : 10,
        left : 10
 },
 
  buttonContainer:{
        backgroundColor: '#9c27b0',        
        paddingVertical: 15,
        width:DEVICE_WIDTH,
        padding: 20,
        marginTop:20,
        borderRadius: 5, 
        right : 10,
        left : 10    
 },
  buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        width:DEVICE_WIDTH,
        fontSize:18            
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
    left: 0,
    
    
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
title:{     
    color:'#fff',
    flex: 1,
    fontWeight:'bold',
    textAlign: 'center',
    fontSize:18,
    fontFamily: "Arial",
    right:0  
},
root: {
  backgroundColor: "#ffffff",
  marginTop:10,
},
container1: {
  paddingLeft: 19,
  paddingRight: 16,
  paddingVertical: 12,
  flexDirection: 'row',
  alignItems: 'flex-start'
},
content: {
  marginLeft: 16,
  flex: 1,
},
contentHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 6
},
separator: {
  height: 1,
  backgroundColor: "#CCCCCC"
},
image:{
  width:45,
  height:45,
  borderRadius:20,
  marginLeft:10
},
time:{
  fontSize:11,
  color:"#808080",
},
name:{
  fontSize:16,
  fontWeight:"bold",
},


searchIcon:{             
  paddingLeft:5,
  width:'10%',
  paddingRight:5
},
rowBack: {
  alignItems: 'center',
  backgroundColor: '#DDD',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingLeft: 15,
}
});

export default Map;