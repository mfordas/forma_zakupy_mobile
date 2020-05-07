import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import logoSrc from "../../img/logotyp-08.png";
import mainStyling from '../../main_styling/main_styling';



class LogoHomePage extends React.Component {

    render() {
        return (
        <View style={[{flex: 1}, mainStyling.logoContainer]}>
            <Image style={mainStyling.logo} source={logoSrc} />
            <Text style={mainStyling.zakupy}>Zakupy</Text>
            </View>
        );
    }
}

export default LogoHomePage;







