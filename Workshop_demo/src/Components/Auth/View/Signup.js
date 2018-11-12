import React, { Component } from 'react'

import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator, AsyncStorage
} from 'react-native'
//Redux
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import { FormLabel, FormInput, Card, Button, FormValidationMessage } from 'react-native-elements'
import { RequiredValidation, EmailValidation, PasswordValidation, ConfirmPassword } from '../../../UtilityFunctions/Validation'
//import { createAccount } from '../../../Actions/AuthAction';
import { CustomSpinner } from '../../../Common/CustomSpinner';
import CustomToast from '../../../Common/CustomToaster'
import * as firebase from "firebase";
import { config } from '../../../../App';

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailError: null,
      passwordError: null,
      confirmPassword: null,
      nameError: null,
      confirmPasswordError: null,
      errorTypeColor: ''

    }
  }

  // check form is Valid
  isValid() {
    const { email, password, name, confirmPassword } = this.state;
    let valid = false;
    if ((email && email.length > 0) &&
      (name && name.length > 0) &&
      (confirmPassword && confirmPassword.length > 0) &&
      (password && password.length > 0)
    ) {
      valid = true;
    }
    if (!email && !password && !name && !confirmPassword) {
      this.setState({
        emailError: RequiredValidation(email, 'Email'),
        passwordError: RequiredValidation(password, 'Password'),
        nameError: RequiredValidation(name, 'Name'),
        confirmPasswordError: RequiredValidation(confirmPassword, 'Confirm Password')
      });
    } else if (!name) {
      this.setState({ nameError: RequiredValidation(name, 'Name') });
    }
    else if (!email) {
      this.setState({ emailError: RequiredValidation(email, 'Email') });
    }
    else if (!password) {
      this.setState({ passwordError: PasswordValidation(password, 'Password') });
    }
    else if (!password) {
      this.setState({ passwordError: RequiredValidation(confirmPassword, 'Confirm Password') });
    }
    return valid;
  }


  //submit signup form
  registerUser = () => {
    const { navigate } = this.props.navigation;
    if (this.isValid()) {
      let { name, email, password, confirmPassword } = this.state
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((success) => {
          console.log(success);

          navigate('Drawer');
          //let userId = firebase.auth().currentUser.uid;
          let userId = '_qweqwe23423533453455';
          //let userId = success.user.uid;
          let dbref = firebase.database().ref().child("/users/" + userId)
          dbref.set({
            email:email,
            username: name,
            role:'user',
            status:'Active',
            uid:userId

          })


          const uid = {
            'uid': success.user.uid,
          }
          AsyncStorage.setItem("uid", JSON.stringify(uid))
        }, (error) => {
          let errorCode = error.code;
          let errorMessage = error.message;

          if (errorCode === 'auth/wrong-password') {
            alert('Invalid Email');
          }
          else {
            alert(errorMessage);
          }
          console.log(error);

        });
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#03A9F4', justifyContent: 'center', alignContent: 'center',
      }}>
        {this.props.isLoading && <CustomSpinner />}
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', }}>
          <Card
            titleStyle={{ color: '#03A9F4', fontSize: 20 }}
            containerStyle={{ backgroundColor: 'whitesmoke' }}
            title="SIGNUP">
            <FormLabel>Name</FormLabel>
            <FormInput
              placeholder="Please enter a name"
              onChangeText={(name) => this.setState({ name, nameError: RequiredValidation(name, 'name') }, () => {
              })}
            />
            {this.state.nameError && <FormValidationMessage>
              {this.state.nameError}
            </FormValidationMessage>
            }
            <FormLabel>Email</FormLabel>
            <FormInput
              placeholder="Please enter a email"
              name="email"
              onChangeText={(email) => this.setState({ email, emailError: EmailValidation(email) }, () => {
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
              onChangeText={(password) => this.setState({ password, passwordError: PasswordValidation(password, 'password') }, () => {
              })}
            />
            {this.state.passwordError && <FormValidationMessage>
              {this.state.passwordError}
            </FormValidationMessage>
            }
            <FormLabel>Confirm Password</FormLabel>
            <FormInput
              placeholder="Please enter a password"
              name="confirmPassword"
              secureTextEntry={true}
              onChangeText={(confirmPassword) => this.setState({ confirmPassword, confirmPasswordError: ConfirmPassword(this.state.password, confirmPassword, 'Confirm Password') }, () => {
              })}
            />
            {this.state.confirmPasswordError && <FormValidationMessage>
              {this.state.confirmPasswordError}
            </FormValidationMessage>
            }
            <Button
              onPress={this.registerUser}
              backgroundColor='#03A9F4'
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 30 }}
              title='Signup' />
            <View style={{ marginTop: 10, alignSelf: 'center', flexDirection: 'row' }}>
              <Text style={{}}>Already have an account ? </Text>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Text style={{ color: '#03A9F4', alignSelf: 'center' }} > Login </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
        <CustomToast
          ref="defaultToastBottomWithDifferentColor"
          backgroundColor={this.state.errorTypeColor} position="bottom" />
      </View>
    );
  }
}
/*
//mapping reducer states to component
const mapStateToProps = (state) => {
  return {
    successMessage: state.Auth.successMessage,
    isLoading: state.Auth.isLoading,
    formError: state.Auth.formError
  }
}
//mapping dispatcheable actions to component
const mapDispathToProps = (dispatch) => {
  return bindActionCreators({ createAccount }, dispatch);
}

//Connecting component with redux structure to get or dispatch data
export default connect(mapStateToProps, mapDispathToProps)(Signup)*/

