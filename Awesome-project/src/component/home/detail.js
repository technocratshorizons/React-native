import React, { Component } from 'react';
import {
      StyleSheet,Text,Image,
      View, StatusBar,Dimensions,TextInput,
      TouchableOpacity,
      TouchableHighlight,
      onButtonPress,
      FlatList,
      ScrollView,
      RefreshControl
    } from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
import DATA from './data';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageSlider from 'react-native-image-slider';


let pic = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
  };

export default class DetailPage extends Component{
    constructor(props , context) {
    super(props , context);
     this.state = {
         detailed :'',
        
     }
    }

    componentDidMount(){
        this.setState({detailed:this.props.navigation.state.params.param});
    } 
    
      
    render() {
        return (
          <View style={styles.container}>
            <View style={styles.content1}>
                <View style={styles.topContainer}>
                 <View style={styles.headerContainer}>
                     <TouchableOpacity style={styles.memuIcon} onPress={() => {this.props.navigation.navigate('Home'); } }>
                     <Icon name="arrow-left" size={20} color="#fff" style={{marginLeft:10}}/>

                     </TouchableOpacity>
                     <Text style={{color:'#fff',flex: 1,fontWeight:'bold',textAlign: 'center',fontSize:18,fontFamily: "Arial"}}>{this.state.detailed.name}</Text>                  
                 </View>
                </View >          
               
            </View>
            <ImageSlider images={[
                'https://placeimg.com/640/640/nature',
                'https://placeimg.com/640/640/people',
                'https://placeimg.com/640/640/animals',
                'https://placeimg.com/640/640/beer',
            ]}/>
            <View style={styles.content2}>
                   <Text style={{ fontWeight:'bold',fontSize:18,color:'#fff'}}>{this.state.detailed.name}</Text>
                   <Text style={{ fontWeight:'bold',fontSize:16,color:'#fff'}}>{this.state.detailed.last_message}</Text>
                   <Text style={{ fontWeight:'bold',fontSize:12,color:'#fff'}}>{this.state.detailed.time}</Text>
            </View>
          </View>
        );
      }
    }
    
const styles = StyleSheet.create({
container: {
    flex: 1
},
slider: { backgroundColor: '#000', height: 350 },
content1: {
    width: '100%',
    height: 50,
    marginBottom: 10,
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
    alignItems:'center'
},

content2: {
    width: '100%',
    height: 100,
    marginTop: 10,
    backgroundColor: '#dbbbf6',
    justifyContent: 'center',
    alignItems: 'center',
},
contentText: { 
    color: '#fff'
}

}); 
        