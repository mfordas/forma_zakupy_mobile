import axios from 'axios';

import setHeaders from '../utils/setHeaders';
import {
    TYPES
} from '../redux_actions/types';
import { removeItem, getValue } from '../../src/utils/asyncStorageFunctions';

export const deleteAccount = () => async (dispatch) => {
    try {
        const id = await getValue('id');
        const res = await axios({
            url: `http://192.168.0.38:8080/api/users/${id}`,
            method: "DELETE",
            headers: setHeaders()
        });

        if (res.status === 200) {
            await removeItem('token');
            await removeItem('id');
            dispatch({
                type: TYPES.DELETEACCOUNT,
                accountDeleted: true
            });
        }

    } catch (error) {
        console.log(error)
    }

};

export const resetPersonalDataState = () => async (dispatch) => {
    dispatch({
        type: TYPES.RESETPERSONALDATASTATE,
        accountDeleted: false
    });
};