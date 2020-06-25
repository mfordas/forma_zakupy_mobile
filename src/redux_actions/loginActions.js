import { Alert } from 'react-native';
import axios from 'axios';
import jwt from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';

import setHeaders from '../utils/setHeaders';
import {
  TYPES
} from '../redux_actions/types';
import { getValue } from '../utils/asyncStorageFunctions';

setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(`${key}`, `${value}`)
  } catch (e) {
    console.log(`Error while saving ${key}`);
  }
};

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(`${key}`)
  } catch(e) {
    console.log(`Error while removing ${key}`);
  }

  console.log('Done.');
};

export const login = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'post',
      url: 'http://192.168.0.38:8080/api/auth',
      data: data,
      headers: setHeaders(),
    });

    if (res.status === 203) {
      await setItem('email', data.email);
      dispatch({
        type: TYPES.LOGIN,
          emailVerified: false
      });
    } else if (res.status === 200) {
      const token = res.headers["x-auth-token"];
      await setItem('token', token);
      await setItem('id', jwt(token)._id);
      console.log('works');
      dispatch({
        type: TYPES.LOGIN,
        isLogged: true
      });
    } else {
      dispatch({
        type: TYPES.LOGIN,
          invalidData: true
      });
    }

  } catch (error) {
    dispatch({
      type: TYPES.LOGIN,
        invalidData: true
    });

    Alert.alert(
      "Error Login:",
       `${error}` ,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }
};

export const logout = () => async (dispatch) => {
  await removeItem('token');
  await removeItem('id');

  dispatch({
    type: TYPES.LOGOUT,
    loginData: {
      email: '',
      password: '',
      emailVerified: true,
      invalidData: false
    },
    isLogged: false,
    me: {}
  });
};

export const myData = () => async (dispatch) => {
  try {
    const response = await axios({
      url: "http://192.168.0.38:8080/api/users/me",
      method: "GET",
      headers: setHeaders()
    });
    console.log(response.status);
    if (response.status === 400) {
      await removeItem('token');

      dispatch({
        type: TYPES.GETMYDATA,
        isLogged: false,
        me: {},
      });
      return;
    }
    const data = await response.data;
    dispatch({
      type: TYPES.GETMYDATA,
      isLogged: true,
      me: data,
    });
  } catch (error) {
    Alert.alert(
      'Serwer nie odpowiada',
       `Error ${error}` ,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

};

export const loginCheck  = () => async (dispatch) => {
  await getValue('token') ? dispatch({
    type: TYPES.LOGINCHECK,
    isLogged: true,
  }) : dispatch({
    type: TYPES.LOGINCHECK,
    isLogged: false,
  });

};