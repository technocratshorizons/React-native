import React, { Component } from 'react';
import {StyleSheet,Text,Image, View,StatusBar,Dimensions,TextInput,TouchableOpacity,ToastAndroid, onButtonPress,Picker, ScrollView, ActivityIndicator, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from '../login/Login';
import firebaseApp from '../firebase';
import Geocoder from 'react-native-geocoder';
import DatePicker from 'react-native-datepicker';
import { CheckBox } from 'react-native-elements';
import RadioGroup from 'react-native-radio-buttons-group';



const DEVICE_WIDTH = Dimensions.get('window').width-20;
export default class Register extends Component{
    constructor(props , context) {
     super(props , context);
     this.state={
         
        PickerValueHolder : 'Male',      
        username:'',
        email: '',
        password: '',
        phone:'',
        cpassword : '',
        token:'',
        date: new Date(),
        isLoading: false,
        checked1:false,
        checked2:false,
        checked3:false,
        data: [
            {
                label: 'Default value is same as label',
                value: "Default value",
                color:'#9c27b0',
                size:25

            },
            {
                label: 'Value is different',
                value: "I'm not same as label",
                color:'#9c27b0',
                size:25


            },
            {
                label: 'Color',
                value: 'green',
                color:'#9c27b0',
                size:25


            },
            {
                disabled: false,
                value: 'Disabled',
                color:'#9c27b0',
                size:25


            },
            {
                label: 'Size',
                value: 32,
                color:'#9c27b0',
                size:25

            },
        ],
      }
    }

    onPress = data => this.setState({ data });

    componentDidMount() {

        AsyncStorage.getItem("app_token").then((value) => {
            // alert(value)
            this.setState({"token":value});
        
        })
    }
    

    Register(){
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(this.state.username == '' || this.state.username == undefined){

            ToastAndroid.show('Please Enter User Name.', ToastAndroid.BOTTOM)

        }else if(this.state.email == '' || this.state.email == undefined){

            ToastAndroid.show('Please Enter Email Address.', ToastAndroid.BOTTOM)

        }else if(reg.test(this.state.email) === false){

            ToastAndroid.show('Please Enter Valid Email Address.', ToastAndroid.BOTTOM)

        }else if (this.state.password == '' || this.state.password == undefined){

            ToastAndroid.show('Please Enter Password.', ToastAndroid.BOTTOM)

        }else if (this.state.cpassword == '' || this.state.cpassword == undefined){

            ToastAndroid.show('Please Enter Confirm password.', ToastAndroid.BOTTOM)

        }else if (this.state.password  !=  this.state.cpassword){

            ToastAndroid.show('Password And Confirm password Does Not Match.', ToastAndroid.BOTTOM)

        }else if (this.state.phone == '' ||  this.state.phone == undefined){

            ToastAndroid.show('Please Enter Contact Number.', ToastAndroid.BOTTOM)

        }else{

          this.setState({ isLoading: true })


          //alert('username:' + this.state.username  +' '+'email: ' + this.state.email +' ' + 'password :' +this.state.password +' '+'phone: ' + this.state.phone +' '+'Picker: ' + this.state.PickerValueHolder)
          fetch('http://192.168.2.33:3002/register', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.state.username,
              email: this.state.email,
              password: this.state.password,
              phone: this.state.phone,
              gender: this.state.PickerValueHolder,
              token:this.state.token

            }),
          }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false })

              //alert(responseJson)
              if(responseJson.status == 2){
                ToastAndroid.show('Email Already exists try with anthore one.', ToastAndroid.BOTTOM)
              }else{
                ToastAndroid.show('Registation successfully.', ToastAndroid.BOTTOM)
              }
            })
            .catch((error) => {
               ToastAndroid.show('Something went wrong .', ToastAndroid.BOTTOM)
            });
        }
    }
  
   
    
 render(){ 
    
    const { navigate } = this.props.navigation;
    let selectedButton = this.state.data.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
   
    
     return(
        <View style={styles.container}> 
         <ScrollView>            
         
            <TextInput style = {styles.input} 
               autoCapitalize="none" 
               underlineColorAndroid='transparent'
               onChangeText={(username)=> this.state.username = username}
               autoCorrect={false}                
               returnKeyType="next" 
               placeholder='User Name' 
               placeholderTextColor='#666'/>

            <TextInput style = {styles.input} 
               autoCapitalize="none" 
               underlineColorAndroid='transparent'
               onChangeText={(email)=> this.state.email = email} 
               autoCorrect={false}                
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

            <TextInput style = {styles.input}   
              returnKeyType="go" 
              onChangeText={(cpassword)=> this.state.cpassword = cpassword}
              underlineColorAndroid='transparent'
              ref={(input)=> this.passwordInput = input} 
              placeholder='Confirm Password' 
              placeholderTextColor='#666' 
              secureTextEntry/>


            <TextInput style = {styles.input} 
              autoCapitalize="none" 
              underlineColorAndroid='transparent'
              onChangeText={(phone)=> this.state.phone = phone}
              autoCorrect={false}                
              returnKeyType="next" 
              placeholder='Contact Number' 
              placeholderTextColor='#666' keyboardType='numeric' maxLength={10}/>

             <Picker style = {styles.Picker} selectedValue={this.state.PickerValueHolder}   
              onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
      
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />

              
            </Picker>

              <DatePicker
                    style={{width: 300}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2018-01-01"
                    maxDate="2030-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                  />

                <CheckBox
                  checkedColor='#9c27b0'
                  uncheckedColor='#9c27b0'
                  title="Press me"
                  checked={this.state.checked1}
                  onPress={() => this.setState({ checked1: !this.state.checked1 })}
                />
                <CheckBox
                  checkedColor='#9c27b0'
                  uncheckedColor='#9c27b0'
                  title="Press me"
                  checked={this.state.checked2}
                  onPress={() => this.setState({ checked2: !this.state.checked2 })}
                />

                <CheckBox
                  uncheckedColor='#9c27b0'
                  checkedColor='#9c27b0'
                  title="Press me"
                  checked={this.state.checked3}
                  onPress={() => this.setState({ checked3: !this.state.checked3 })}
                />


                
                <RadioGroup radioButtons={this.state.data} onPress={this.onPress} />
                <Text style={styles.valueText}>
                    Value = {selectedButton}
                </Text>


            <TouchableOpacity style={styles.buttonContainer}  onPress={this.Register.bind(this)}>
             <Text  style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>

            <Text onPress={() => navigate("Login")}>Already have account?Login</Text>
            </ScrollView>


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
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
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
},
buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    width:DEVICE_WIDTH,
    fontSize:18          
},
valueText: {
    fontSize: 18, 
    marginBottom: 50,
} 
})
