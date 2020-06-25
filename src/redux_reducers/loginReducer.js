import {
    TYPES
} from '../redux_actions/types';

const initialState = {
    loginData: {
        email: '',
        password: '',
        emailVerified: true,
        invalidData: false
    },
    isLogged: false,
    me: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPES.LOGIN:
            return {
                ...state,
                loginData: action.loginData,
                isLogged: action.isLogged,
            };
        case TYPES.LOGOUT:
            return {
                ...state,
                loginData: action.loginData,
                isLogged: action.isLogged,
                me: action.me
            };
        case TYPES.GETMYDATA:
            return {
                ...state,
                isLogged: action.isLogged,
                me: action.me,
            };
        case TYPES.LOGINCHECK:
            return {
                ...state,
                isLogged: action.isLogged,
            };
        default:
            return state;
    }
}