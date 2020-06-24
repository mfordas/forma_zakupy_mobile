import axios from 'axios';
import jwt from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';

import setHeaders from '../utils/setHeaders';
import {
  TYPES
} from '../redux_actions/types';

setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(`${key}`, `${value}`)
  } catch (e) {
    // saving error
  }
};

const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(`${key}`)
  } catch(e) {
    // remove error
  }

  console.log('Done.')
}

export const login = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'post',
      url: 'http://192.168.0.38:8080/api/auth',
      data: data,
      headers: setHeaders(),
    });

    if (res.status === 203) {
      localStorage.setItem('email', data.email);
      dispatch({
        type: TYPES.LOGIN,
        loginData: {
          emailVerified: false
        },
      });
    } else if (res.status === 200) {
      const token = res.headers["x-auth-token"];
      setItem('token', token);
      setItem('id', jwt(token)._id);
      dispatch({
        type: TYPES.LOGIN,
        isLogged: true
      });
    } else {
      dispatch({
        type: TYPES.LOGIN,
        loginData: {
          invalidData: true
        },
      });
    }

  } catch (error) {
    console.error('Error Login:', error);
    dispatch({
      type: TYPES.LOGIN,
      loginData: {
        invalidData: true
      },
    });
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
  } catch (ex) {
    console.error("Serwer nie odpowiada");
    console.error("Error", ex);
  }

};