import React from "react";

import {getValue} from './utils/asyncStorageFunctions';

const Context = React.createContext();

export class StoreProvider extends React.Component {
  state = {
    isLogged: false,
    me: null
  };

  changeStore = (name, value) => {
    this.setState({ [name]: value });
  };

  async componentDidMount() {
    const tokenCheck = await getValue("token") ? true : false
    return this.setState({isLogged: tokenCheck});
  }

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
