import React, { useEffect, useContext } from 'react';
import 'react-native-gesture-handler';
import {SafeAreaView, View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LogoHomePage from './src/Components/Homepage/logo';
import Menu from './src/Components/Menu';
import Login from './src/Components/Login'

import Context, {StoreProvider} from './src/Store';
import setHeaders from "./src/utils/setHeaders";
import LoginContent from './src/Components/Login';

const Stack = createStackNavigator();

const App = () => {
  const { isLogged, changeStore } = useContext(Context);

  useEffect(() => {
    if (!isLogged) return;
    (async () => {
      try {
        const response = await fetch("/api/users/me", setHeaders());
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
        console.error("Serwer nie odpowiada");
        console.error("Error", ex);
      }
    })();
  }, [changeStore, isLogged]);

  

  return (
    <SafeAreaView style={{flex: 1}}>
      <LogoHomePage />
      {/* <Menu />  */}
      <View style={{flex:7}}>
      <NavigationContainer >
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerTitle: props => <Menu {...props} /> }}/>
          </Stack.Navigator>
        </NavigationContainer>
        </View>
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
