import {
    HOME, 
    REGISTRATION,
    LEARN,
    VALID_USER,
    INVALID_USER,
    JWT,
    VERIFY_LOGIN,
    FALLBACK
 } from '../actions/actions'

export const reducer = (state, action) => {
    switch (action.type){
        case HOME:
        case REGISTRATION:
        case LEARN:
        case VALID_USER:
        case INVALID_USER:
        case VERIFY_LOGIN:
        case FALLBACK:
            return {...state, [action.type.toLowerCase()]: action.payload};
        case JWT:
            return {...state, jwt: action.payload};
        default:
            return state;
    }
}