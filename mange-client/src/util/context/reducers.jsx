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
        case (HOME) : {
            return {...state, home: action.payload}
        }
        case (REGISTRATION) : {
            return {...state, registration: action.payload}
        }
        case (LEARN) : {
            return {...state, learn: action.payload}
        }
        case (VALID_USER) : {
            return {...state, validUser: action.payload}
        }
        case (INVALID_USER) : {
            return {...state, invalidUser: action.payload}
        }
        case (JWT) : {
            return {...state, jwt: action.payload}
        }
        case (VERIFY_LOGIN) : {
            return {...state, verifyLogin: action.payload}
        }
        case (FALLBACK) : {
            return {...state, fallback: action.payload}
        }
    }
}