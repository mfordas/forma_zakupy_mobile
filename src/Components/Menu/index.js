import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as RootNavigation from '../../utils/rootNavigation';
import Store from '../../Store';
import mainStyling from '../../main_styling/main_styling';

const removeItem = async (key) => {
    try {
      await AsyncStorage.removeItem(`${key}`)
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }


const Menu = () => {
    const { isLogged, changeStore } = useContext(Store);
    const handleLogout = () => {
        removeItem('token');
        removeItem('id');
        changeStore('isLogged', false);
        changeStore('hasCharacter', null)
        console.log(isLogged);
    };

    return ( <View style={[mainStyling.containerMenu, {backgroundColor: 'white'}]}>
    {!isLogged &&
        (
            <>
                <TouchableOpacity style={mainStyling.buttonMenu} onPress={() => RootNavigation.navigate("Login")} ><Text style={mainStyling.buttonMenuText} >Logowanie</Text></TouchableOpacity>
                <TouchableOpacity style={mainStyling.buttonMenu} onPress={() => RootNavigation.navigate("Register")}><Text style={mainStyling.buttonMenuText} >Rejestracja</Text></TouchableOpacity>
            </>
        )
        }
    {isLogged &&
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


export default Menu;

