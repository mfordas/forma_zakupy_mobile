import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import mainStyling from '../../main_styling/main_styling';
import * as RootNavigation from '../../utils/rootNavigation';

class Verification extends React.Component {
    constructor(props) {
        super(props);

        this.state = { verified: '' };
    }

    async componentDidMount() {
        const response = await fetch(`http://192.168.0.38:8080/api/users/verification/${this.props.match.params.token}`)
            .catch(() => this.setState({ verified: false }));


        if (response.status === 200)
            this.setState({ verified: true });
        else 
            this.setState({ verified: false });
    }

    statusComponent() {
        if (this.state.verified === '') {
            return (
                <Text style={mainStyling.p} >Weryfikacja konta</Text>

            );
        }
        else if (this.state.verified === true) {
            return (
                <View style={mainStyling.container} >
                <Text style={mainStyling.p}>Konto zweryfikowane</Text>
                <View>
                <TouchableOpacity></TouchableOpacity>
                <NavLink className="buttonMenu" to="/home">Zaloguj się</NavLink>
                <TouchableOpacity style={mainStyling.buttonMenu} onPress={() => RootNavigation.navigate("Login")} ><Text style={mainStyling.buttonMenuText} >Zaloguj się</Text></TouchableOpacity>
                </View>
                </View>
            );
        }
        else {
            return (
                <Text style={mainStyling.p} >Błąd weryfikacji, spróbuj ponownie lub skontaktuj się z nami - forma_zakupy@fordas.pl</Text>
            );
        }
    }

    render() {
        return (
                this.statusComponent()
        );
    }
};

export default Verification;