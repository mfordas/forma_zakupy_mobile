import axios from 'axios';

import setHeaders from '../utils/setHeaders';
import {
    TYPES
} from '../redux_actions/types';

export const postUser = (data) => async (dispatch) => {
    try {
        const res = await axios({
            method: 'post',
            url: 'http://192.168.0.38:8080/api/users',
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            },
            headers: setHeaders()
        });

        if (res.status === 200) {
            dispatch({
                type: TYPES.REGISTER,
                confirm: true,
            });
        } else {
            dispatch({
                type: TYPES.REGISTER,
                invalidData: true,
                confirm: false,
            });

        }
    } catch (error) {
        dispatch({
            type: TYPES.REGISTER,
            invalidData: true,
            confirm: false,
        });
        Alert.alert(
            'Error Registration:',
             `${error}` ,
            [
              { text: "OK", onPress: () => console.log("Confirmed") }
            ],
            { cancelable: false }
          );
    }
};

export const checkEmail = (email) => async (dispatch) => {
    await axios({
        url: `http://192.168.0.38:8080/api/users/${email}`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        if (response.data) return dispatch({
            type: TYPES.CHECKEMAIL,
            emailTaken: true,
        });
        if (!response.data) return dispatch({
            type: TYPES.CHECKEMAIL,
            emailTaken: false,
        });
    }, (error) => {
        console.log(error);
    });
};

export const resetRegisterState = () => async (dispatch) => {
    return dispatch({
        type: TYPES.RESETREGISTERSTATE,
        invalidData: false,
        confirm: false,
        emailTaken: false
    })
};