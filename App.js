import React, { useEffect, useContext } from 'react';
import 'react-native-gesture-handler';
import {SafeAreaView, View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LogoHomePage from './src/Components/Homepage/logo';
import Menu from './src/Components/Menu';
import LoginContent from './src/Components/Login';
import Register from './src/Components/Register';
import ShoppingListContent from './src/Components/ShoppingList';

import Context, {StoreProvider} from './src/Store';
import setHeaders from "./src/utils/setHeaders";
import { navigationRef } from './src/utils/rootNavigation';

const Stack = createStackNavigator();

const App = () => {
  const { isLogged, changeStore } = useContext(Context);
  console.log(isLogged);

  useEffect(() => {
    if (!isLogged) return;
    (async () => {
      try {
        const response = await fetch("http://192.168.0.38:8080/api/users/me", setHeaders());
        console.log(response);
        if (response.status === 400) {
          localStorage.removeItem("token");
          changeStore("isLogged", false);
          changeStore("me", null);
          return;
        }
        const data = await response.json();
        changeStore("isLogged", true);
        changeStore("me", data);
      } catch (ex) {
        // console.error("Serwer nie odpowiada");
        // console.error("Error", ex);
      }
    })();
  }, [changeStore, isLogged]);

  

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
      <LogoHomePage />
      <Menu />
      <View style={{flex: 1, flexGrow: 1}}> 
          <Stack.Navigator >
          {!isLogged && (
            <>
            <Stack.Screen name="Login" component={LoginContent} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
            </>
            )}
          {isLogged && (
            <>
            <Stack.Screen name="ShoppingList" component={ShoppingListContent} options={{headerShown: false}}/>
            </>
            )}
          </Stack.Navigator>
          </View>
        </NavigationContainer>
      </SafeAreaView>
  );
};


const AppContext = () => {
  return (
<StoreProvider>
<App/>
</StoreProvider>
  )
}

export default AppContext;
