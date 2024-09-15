import {
    HOME, 
    REGISTRATION,
    LEARN
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
    }
}