import React, { Component } from 'react'

import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions, AsyncStorage
} from 'react-native'
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormLabel, Text, FormInput, Card, Button, FormValidationMessage } from 'react-native-elements'
import { loginUser, clearErrorMessge } from '../../../Actions/AuthAction';
import { CustomSpinner } from '../../../Common/CustomSpinner';
import CustomToast from '../../../Common/CustomToaster'
import { RequiredValidation, EmailValidation, PasswordValidation } from '../../../UtilityFunctions/Validation'
import * as firebase from "firebase";
import Forgotpassword from '../../Forgotpassword/Forgotpassword';
const { height, width } = Dimensions.get('window')


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailError: null,
      passwordError: null,
      password: null,
      email: null,
      errorTypeColor: '',
      isLoading: false,
    }
  }
  async componentWillReceiveProps(nextProps) {
    if (nextProps.formError && !nextProps.successMessage) {
      this.setState({ errorTypeColor: 'red' })
      await this.refs.defaultToastBottomWithDifferentColor.ShowToastFunction(nextProps.formError);
      this.props.clearErrorMessge()
    }
    if (nextProps.successMessage) {
      debugger
      this.setState({ errorTypeColor: 'green' })
      await this.refs.defaultToastBottomWithDifferentColor.ShowToastFunction(nextProps.successMessage);
      this.props.clearErrorMessge()
      this.props.navigation.navigate('Dashboard')
    }
  }
  // check form is Valid
  isValid() {
    const { email, password } = this.state;
    let valid = false;
    if (email && email.length > 0 && password && password.length > 0) {
      valid = true;
    }
    if (!email && !password) {
      this.setState({
        emailError: RequiredValidation(email, 'Email'),
        passwordError: RequiredValidation(password, 'Password')
      },

      );
    } else if (!email) {
      this.setState({ emailError: RequiredValidation(email, 'Email') });
    }
    else if (!password) {
      this.setState({ passwordError: RequiredValidation(password, 'Password') });
    }
    return valid;
  }

  //submit login form
  // login() {
  //   if (this.isValid()) {
  //     let { email, password } = this.state
  //     this.props.loginUser(email, password)
  //     // this.props.navigation.navigate('Dashboard')
  //   } else {
  //   }
  // }


  //submit login form
  login = () => {
    alert('working');
    this.setState({ isLoading: true })
    const { navigate } = this.props.navigation;

    if (this.isValid()) {
      let { email, password } = this.state
      // firebase.auth().signInWithEmailAndPassword(email, password)
      //   .then((success) => {
          //alert('Login' + JSON.stringify(success));
          //console.log(success.user.uid)

          const uid = {
            'uid': success.user.uid,
          }
         // AsyncStorage.setItem("uid", JSON.stringify(uid))
          navigate('Drawer');
        //},
          // (error) => {
          //   this.setState({ isLoading: false })
          //   let errorCode = error.code;
          //   let errorMessage = error.message;

          //   if (errorCode === 'auth/wrong-password') {
          //     alert('Invalid Email');
          //   }
          //   else {
          //     alert(errorMessage);
          //   }
          //   console.log(error);
          // });
    }
  }



  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#03A9F4', justifyContent: 'center', alignContent: 'center',
      }}>
        {/* {this.state.isLoading && this.renderSpinner()} */}

       
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', }}>

          <Card
            titleStyle={{ color: '#03A9F4', fontSize: 20 }}
            containerStyle={{ backgroundColor: 'whitesmoke' }}
            title="LOGIN">

            <FormLabel>Email</FormLabel>
            <FormInput
              placeholder="Please enter a email"
              name="email"
              onChangeText={(email) => this.setState({ email, emailError: RequiredValidation(email, 'Email') }, () => {
              })}

            />
            {this.state.emailError && <FormValidationMessage>
              {this.state.emailError}
            </FormValidationMessage>
            }

            <FormLabel>Password</FormLabel>
            <FormInput
              placeholder="Please enter a password"
              name="password"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({ password, passwordError: RequiredValidation(password, 'Password') }, () => {
              })}
            />
            {this.state.passwordError && <FormValidationMessage>
              {this.state.passwordError}
            </FormValidationMessage>
            }

            {
              this.state.isLoading ?
                <ActivityIndicator size={'large'} color='#5890FF' />
                :

                <Button
                  onPress={this.login}
                  backgroundColor='#03A9F4'
                  buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 30 }}
                  title='Login' />
            }
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Forgotpassword')}>
            <Text style={{ marginTop: 10, alignSelf: 'center' }}>
              Forgot Password ?
              </Text>
            </TouchableOpacity>
            <View style={{ marginTop: 10, alignSelf: 'center', flexDirection: 'row' }}>
              <Text style={{}}> Not yet Registered ?</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                <Text style={{ color: '#03A9F4', alignSelf: 'center' }} > Sign Up</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={{marginTop:10}}>
            <Button
              backgroundColor='#03A9F4'
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='Signup' />
             </View> */}
          </Card>
        </View>
        <CustomToast
          ref="defaultToastBottomWithDifferentColor"
          backgroundColor={this.state.errorTypeColor} position="bottom" />
      </View>
    );
  }
}

//mapping reducer states to component
/*const mapStateToProps = (state) => {
  return {
    user: state.Auth.user,
    isLoading: state.Auth.isLoading,
    formError: state.Auth.formError,
    successMessage: state.Auth.successMessage
  }
}
//mapping dispatcheable actions to component
function mapDispathToProps(dispatch) {
  return bindActionCreators({ loginUser, clearErrorMessge }, dispatch);
}
//Connecting component with redux structure to get or dispatch data
export default connect(mapStateToProps, mapDispathToProps)(Login)*/
