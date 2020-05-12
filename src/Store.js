import React from "react";

import {getValue} from './utils/asyncStorageFunctions'

const Context = React.createContext();

export class StoreProvider extends React.Component {
  state = {
    isLogged: getValue("token") ? true : false,
    me: null
  };

  changeStore = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Context.Provider
        value={{ isLogged: this.state.isLogged, changeStore: this.changeStore}}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;
