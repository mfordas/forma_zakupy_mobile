import React from "react";
import AsyncStorage from '@react-native-community/async-storage';

const Context = React.createContext();

export class StoreProvider extends React.Component {
  state = {
    isLogged: this.getItem('token') ? true : false,
    me: null
  };

  changeStore = (name, value) => {
    this.setState({ [name]: value });
  };

  getItem = async (key) => {
    try {
      const value = await AsyncStorage.getItem(`${key}`)
      if(value !== null) {
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

  render() {
    return (
      <Context.Provider
        value={{ ...this.state, changeStore: this.changeStore }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
