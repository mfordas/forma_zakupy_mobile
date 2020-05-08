import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView, View, Text} from 'react-native';

import LogoHomePage from './src/Components/Homepage/logo';
import Menu from './src/Components/Menu';

import Context, {StoreProvider} from './src/Store';
import setHeaders from "./src/utils/setHeaders";

const App = () => {
  const { isLogged, changeStore } = useContext(Context);

  // useEffect(() => {
  //   if (!isLogged) return;
  //   (async () => {
  //     try {
  //       const response = await fetch("/api/users/me", setHeaders());
  //       if (response.status === 400) {
  //         localStorage.removeItem("token");
  //         changeStore("isLogged", false);
  //         changeStore("me", null);
  //         return;
  //       }
  //       const data = await response.json();
  //       changeStore("isLogged", true);
  //       changeStore("me", data);
  //     } catch (ex) {
  //       console.error("Serwer nie odpowiada");
  //       console.error("Error", ex);
  //     }
  //   })();
  // }, [changeStore, isLogged]);


  return (
    <SafeAreaView style={{flex: 1}}>
        <LogoHomePage />
        <Menu />
        <View style={{flex: 3}}></View>
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
