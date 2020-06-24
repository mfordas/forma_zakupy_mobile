import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import {Provider} from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { store } from './src/redux_store/reduxStore';
import LogoHomePage from './src/Components/Homepage/logo';
import Menu from './src/Components/Menu';
import LoginContent from './src/Components/Login';
import Register from './src/Components/Register';
import ShoppingListContent from './src/Components/ShoppingList';
import { navigationRef } from './src/utils/rootNavigation';


const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};


const App = ({ loginData }) => {

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer ref={navigationRef} theme={MyTheme}>
      <LogoHomePage />
      <Menu />
          <Stack.Navigator>
          {!loginData.isLogged && (
            <>
            <Stack.Screen name="Login" component={LoginContent} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
            </>
            )}
          {loginData.isLogged && (
            <>
            <Stack.Screen name="ShoppingList" component={ShoppingListContent} options={{headerShown: false}}/>
            </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  loginData: state.loginData,
});

Menu.propTypes = {
  loginData: PropTypes.object
}

const AppConnected = connect(mapStateToProps, { })(App);


const AppContext = () => {
  return (
  <Provider store={store}>
<AppConnected/>
</Provider>
  )
}

export default AppContext;
