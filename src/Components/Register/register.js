import React from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Store from '../../Store';
import Confirm from './confirm';
import ErrorMessage from '../ReusableComponents/ErrorMessage';
import setHeaders from '../../utils/setHeaders';
import mainStyling from '../../main_styling/main_styling';

class Register extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      emailTaken: false,
      invalidData: false,
      confirm: false
    }
  }
  

  static contextType = Store;

  postUser = async () => {
    try {
      if (this.state.password !== this.state.confirmPassword) {
        Alert.alert('Error', 'Wrong password');
      }
      const res = await axios({
        method: 'post',
        url: 'http://192.168.0.38:8080/api/users',
        data: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        },
        headers: setHeaders()
      });

      if (res.status === 200) {
        this.setState({confirm: true});
      } else {
        this.setState({ invalidData: true });
        
      }
    }
    catch (error) {
      this.setState({ invalidData: true });
      Alert.alert('Error Registration:', error.message);
    }
  }

  checkEmail = async () => {
    await axios({
      url: 'http://192.168.0.38:8080/api/users',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      response.data.forEach((data) => {
        if (data.email === this.state.email) {
          this.setState({ emailTaken: true })
        }
      })
    }, (error) => {
      console.log(error);
      console.log(this.state);
    });
  }

  onButtonSubmit = async e => {
    e.preventDefault();
    this.setState({ emailTaken: false })
    await this.checkEmail();
    this.nameValidate(e);
    this.emailValidate(e);
    this.passwordValidate(e);
    if (this.state.emailTaken === false) {
      this.postUser();
    }
    console.log(this.state);
  }

  nameValidate = (e) => {
    if (this.state.name.length < 3 && this.state.invalidData) {
      return <ErrorMessage message='Imię powinno być dłuższe niż 3 znaki'/>;
    }
    else { return null }
  }

  emailValidate = (e) => {
    if (this.state.emailTaken === true) {
      return <ErrorMessage message='Email zajęty'/>;
    }
    if (this.state.email.length === 0 && this.state.invalidData) {
      return <ErrorMessage message='Wpisz e-mail'/>;
    }
    else { return null }
  }

  passwordValidate = (e) => {
    if ((this.state.password !== this.state.confirmPassword) && this.state.invalidData) {
      return <ErrorMessage message='Oba hasła powinny być takie same'/>;
    }
    else if ((this.state.password.length < 8 || this.state.confirmPassword.length < 8) && this.state.invalidData) {
      return <ErrorMessage message='Hasło powinno mieć conajmniej 8 znaków'/>;
    }
    else { return null }
  }

  

  render() {
    return (
      <ScrollView>
        <View style={mainStyling.container} >
          {this.state.confirm === false ? <View style={mainStyling.registerCard} >
          <View>
          <Text style={mainStyling.p}>Witamy w programie Forma Zakupy. Jeśli jeszcze nie posiadasz konta - zarejestruj się</Text>
          </View>
          <View>
            <TextInput  style={mainStyling.input}  onChangeText={text => this.setState({ name: text })}></TextInput>
            {this.nameValidate()}
            <Text style={mainStyling.registerCardText}>Imię</Text>
          </View>
          <View>
            <TextInput style={mainStyling.input} textContentType={'emailAddress'} onChangeText={text => this.setState({ email: text })}></TextInput>
            {this.emailValidate()}
            <Text style={mainStyling.registerCardText}>E-mail</Text>
          </View>
          <View>
            <TextInput  style={mainStyling.input} textContentType={'password'} secureTextEntry={true}  onChangeText={text => this.setState({ password: text })}></TextInput>
            {this.passwordValidate()}
            <Text style={mainStyling.registerCardText}>Hasło</Text>
          </View>
          <View>
            <TextInput style={mainStyling.input} textContentType={'password'} secureTextEntry={true} onChangeText={text => this.setState({ confirmPassword: text })}></TextInput>
            <Text style={mainStyling.registerCardText}>Powierdź hasło</Text>
          </View>
          <View style={mainStyling.containerMenu}>
          <TouchableOpacity style={mainStyling.buttonRegisterCard} onPress={this.onButtonSubmit}><Text style={mainStyling.buttonMenuText}>Zarejestruj</Text></TouchableOpacity>
          </View>
          </View> : <Confirm name={this.state.name} email={this.state.email}/>}
        </View>
      </ScrollView>
    );
  }
}

export default Register;