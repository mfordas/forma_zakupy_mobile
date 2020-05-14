import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Store from '../../Store';
import axios from 'axios';
import jwt from 'jwt-decode';
import mainStyling from '../../main_styling/main_styling';
import setHeaders from '../../utils/setHeaders';
import ErrorMessage from '../ReusableComponents/ErrorMessage';

class Login extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      emailVerified: true,
      invalidData: false
    }
  }
  

  static contextType = Store;

  setItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(`${key}`, `${value}`)
    } catch (e) {
      // saving error
    }
  };

  onButtonSubmit = async e => {
    e.preventDefault();
    console.log(this.state);
    const data = {email: this.state.email,
      password:this.state.password};
    delete this.state["invalidData"];
    try {
      const res = await axios({
        method: 'post',
        url: 'http://192.168.0.38:8080/api/auth',
        data: data,
        headers: setHeaders(),
      });
      console.log(res.status);

      if(res.status === 203) {
        this.setItem('email', this.state.email);
        this.setState({emailVerified: false});
      } else if (res.status === 200) {
        const token = res.headers["x-auth-token"];
        this.setItem('token', token);
        this.setItem('id', jwt(token)._id);
        this.context.changeStore('isLogged', true);
        this.setState({ isLogged: true });
      } else {
        this.setState({ invalidData: true });
      }
    }
    catch (error) {
      Alert.alert('Error', error.message);
      this.setState({ invalidData: true });
    }
  }

  loginValidate = (e) => {
    if (this.state.emailVerified === true && this.state.invalidData) {
      return <ErrorMessage message='Zły e-mail lub hasło'/>
    }
    if (this.state.emailVerified === false && this.state.invalidData){
      return <ErrorMessage message='Adres e-mail niezweryfikowany'/>
    }
    else { return null }
  }


  render() {
  
    return (
       <ScrollView>
        <View style={mainStyling.container}>
          <View style={mainStyling.registerCard}>
          <View>
          <Text style={mainStyling.p}>Witamy w programie Forma Zakupy. Jeśli jeszcze nie posiadasz konta - zarejestruj się</Text>
          </View>
          <View>
            <TextInput  style={mainStyling.input} textContentType={'emailAddress'} onChangeText={text => this.setState({ email: text })}></TextInput>
            <Text style={mainStyling.registerCardText}>E-mail</Text>
          </View>
          <View>
            <TextInput style={mainStyling.input} textContentType={'password'} secureTextEntry={true} onChangeText={text => this.setState({ password: text })}></TextInput>
            <Text style={mainStyling.registerCardText}>Hasło</Text>
            {this.loginValidate()}
          </View>
          <View style={mainStyling.containerMenu}>
          <TouchableOpacity style={mainStyling.buttonRegisterCard} onPress={this.onButtonSubmit}><Text style={mainStyling.buttonMenuText}>Zaloguj</Text></TouchableOpacity>
          </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Login;