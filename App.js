import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import LogoHomePage from './src/Components/Homepage/logo';

const App: () => React$Node = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <LogoHomePage/>
      </SafeAreaView>
    </>
  );
};

export default App;
