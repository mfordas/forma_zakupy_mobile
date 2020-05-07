import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Store from '../../Store';

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
        window.location.reload();
    };

    

    return ( <div className="containerMenu">
    {!isLogged &&
        (
            <>
                <NavLink className="buttonMenu" to="/home">Logowanie</NavLink>
                <NavLink className="buttonMenu" to="/register">Rejestracja</NavLink>
            </>
        )
        }
    {isLogged &&
    (
        <>
        <NavLink className="buttonMenu" to="/shoppingLists">Moje Listy zakupów</NavLink>
        <NavLink className="buttonMenu" to="/commonShoppingLists">Wspólne listy zakupów</NavLink>
        <NavLink className="buttonMenu" to="/logout" onClick={handleLogout}>Wyloguj</NavLink>
        </>
    )}
        </div>
    )

}


export default Menu;

