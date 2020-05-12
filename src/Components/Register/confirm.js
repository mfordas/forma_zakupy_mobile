import React from 'react';
import Store from '../../Store';
import mainStyling from '../../main_styling/main_styling';
import { View, Text, TouchableOpacity } from 'react-native';
import * as RootNavigation from '../../utils/rootNavigation';

class Confirm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: this.props.name,
            email: this.props.email,
        }
    }


    static contextType = Store;

    render() {
        return (
            <View style={mainStyling.container}>
                <View style={mainStyling.registerCard}>
                    <Text style={mainStyling.p}>{this.state.name}, dziękujemy za rejestrację! Na adres: {this.state.email} została wysłana wiadomość z linkiem aktywującym konto. Jeśli wiadomości nie ma w wiadomościach odebranych, sprawdź także SPAM.</Text>
                    <TouchableOpacity style={mainStyling.buttonRegisterCard} onPress={RootNavigation.navigate('Login')}></TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Confirm;