import React  from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import * as RootNavigation from '../../utils/rootNavigation';
import { logout, myData } from '../../redux_actions/loginActions';
import mainStyling from '../../main_styling/main_styling';

const Menu = ({ loginData, logout, myData }) => {
    const handleLogout = async () => {
        await logout();
    };

    if(loginData.isLogged && loginData.me === null){
        myData();
    };

    return ( <View style={[mainStyling.containerMenu, {backgroundColor: 'white'}]}>
    {!loginData.isLogged &&
        (
            <>
                <TouchableOpacity style={mainStyling.buttonMenu} onPress={() => RootNavigation.navigate("Login")} ><Text style={mainStyling.buttonMenuText} >Logowanie</Text></TouchableOpacity>
                <TouchableOpacity style={mainStyling.buttonMenu} onPress={() => RootNavigation.navigate("Register")}><Text style={mainStyling.buttonMenuText} >Rejestracja</Text></TouchableOpacity>
            </>
        )
        }
    {loginData.isLogged &&
    (
        <>
        <TouchableOpacity style={mainStyling.buttonMenu} onPress={() => RootNavigation.navigate("PrivateShoppingLists")}><Text style={mainStyling.buttonMenuText}>Moje Listy zakupów</Text></TouchableOpacity>
                <TouchableOpacity style={mainStyling.buttonMenu}onPress={() => RootNavigation.navigate("CommonShoppingLists")}><Text style={mainStyling.buttonMenuText}>Wspólne listy zakupów</Text></TouchableOpacity>
                <TouchableOpacity style={mainStyling.buttonMenu} onPress={() => handleLogout()}><Text style={mainStyling.buttonMenuText}>Wyloguj</Text></TouchableOpacity>
        </>
    )}
        </View>
    )

}

const mapStateToProps = (state) => ({
    loginData: state.loginData,
  });
  
  Menu.propTypes = {
    loginData: PropTypes.object
  }
  
  export default connect(mapStateToProps, { logout, myData })(Menu);

