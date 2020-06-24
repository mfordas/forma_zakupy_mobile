import {
    TYPES
} from '../redux_actions/types';

const initialState = {
    emailTaken: false,
    invalidData: false,
    confirm: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPES.REGISTER:
            return {
                ...state,
                confirm: action.confirm,
                    invalidData: action.invalidData,
            };
        case TYPES.CHECKEMAIL:
            return {
                ...state,
                emailTaken: action.emailTaken,
            };
        case TYPES.RESETREGISTERSTATE:
            return {
                ...state,
                confirm: action.confirm,
                    invalidData: action.invalidData,
                    emailTaken: action.emailTaken
            }
            default:
                return state;
    }
}