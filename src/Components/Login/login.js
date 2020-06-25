import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import mainStyling from '../../main_styling/main_styling';
import ErrorMessage from '../ReusableComponents/ErrorMessage';
import { login } from '../../redux_actions/loginActions';


class Login extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  onButtonSubmit = async e => {
    e.preventDefault();
    const data = {email: this.state.email,
      password:this.state.password};
      await this.props.login(data);
  }

  loginValidate = (e) => {
    if (this.props.loginData.loginData.emailVerified === true && this.props.loginData.loginData.invalidData) {
      return <ErrorMessage message='Zły e-mail lub hasło'/>
    }
    if (this.props.loginData.loginData.emailVerified === false && this.props.loginData.loginData.invalidData){
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

const mapStateToProps = (state) => ({
  loginData: state.loginData,
});

Login.propTypes = {
  loginData: PropTypes.object
}

export default connect(mapStateToProps, {login})(Login);