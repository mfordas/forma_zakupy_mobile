import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Confirm from './confirm';
import ErrorMessage from '../ReusableComponents/ErrorMessage';
import mainStyling from '../../main_styling/main_styling';
import { postUser, checkEmail } from '../../redux_actions/registerActions';

class Register extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      dataProcessingAgreement: false
    }
  }

  onButtonSubmit = async e => {
    e.preventDefault();
    await this.props.checkEmail(this.state.email);
    this.nameValidate();
    this.emailValidate();
    this.passwordValidate();
    if (this.props.registerData.emailTaken === false) {
      await this.props.postUser(this.state);
    }
  }

  nameValidate = () => {
    if (this.state.name.length < 3 && this.props.registerData.invalidData) {
      return <ErrorMessage message='Imię powinno być dłuższe niż 3 znaki'/>;
    }
    else { return null }
  }

  emailValidate = () => {
    if (this.props.registerData.emailTaken === true) {
      return <ErrorMessage message='Email zajęty'/>;
    }
    if (this.state.email.length === 0 && this.props.registerData.invalidData) {
      return <ErrorMessage message='Wpisz e-mail'/>;
    }
    else { return null }
  }

  passwordValidate = () => {
    if ((this.state.password !== this.state.confirmPassword) && this.props.registerData.invalidData) {
      return <ErrorMessage message='Oba hasła powinny być takie same'/>;
    }
    else if ((this.state.password.length < 8 || this.state.confirmPassword.length < 8) && this.props.registerData.invalidData) {
      return <ErrorMessage message='Hasło powinno mieć conajmniej 8 znaków'/>;
    }
    else { return null }
  }

  dataProcessingAgreementValidate = () => {
    if ((this.state.dataProcessingAgreement === false) && this.props.registerData.invalidData) {
      return <ErrorMessage message='Musisz zaakceptować zgodę na przetwarzanie danych'/>;
    }
    else { return null }
  }

  render() {
    return (
      <ScrollView>
        <View style={mainStyling.container} >
          {this.props.registerData.confirm === false ? <View style={mainStyling.registerCard} >
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

const mapStateToProps = (state) => ({
  registerData: state.registerData,
});

Register.propTypes = {
  registerData: PropTypes.object
}

export default connect(mapStateToProps, { postUser, checkEmail })(Register);