import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import * as RootNavigation from '../../utils/rootNavigation';
import mainStyling from '../../main_styling/main_styling';
import { resetRegisterState } from '../../redux_actions/registerActions';

class Confirm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: this.props.name,
            email: this.props.email,
        }
    }

    render() {
        return (
            <View style={mainStyling.container}>
                <View style={mainStyling.registerCard}>
                    <Text style={mainStyling.p}>{this.state.name}, dziękujemy za rejestrację! Na adres: {this.state.email} została wysłana wiadomość z linkiem aktywującym konto. Jeśli wiadomości nie ma w wiadomościach odebranych, sprawdź także SPAM.</Text>
                    <TouchableOpacity style={mainStyling.buttonRegisterCard} onPress={() => {this.props.resetRegisterState(); RootNavigation.navigate('Login')}}></TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    registerData: state.registerData,
  });
  
  Confirm.propTypes = {
    registerData: PropTypes.object
  };
  
  export default connect(mapStateToProps, { resetRegisterState })(Confirm);