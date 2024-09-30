// routecontext.jsx
import React, { useContext, useReducer } from "react";
import { reducer } from "./reducers";

// here we are creating a context to pass around the app
const RouteContext = React.createContext()

export const useRouteContext = () => useContext(RouteContext)

const initialState = {
    Routes: {
        registration: "",
        home: "",
        learn: "",
        invalidUser: "",
        validUser: "",
        verifyLogin: "",
        fallback: "",
    },
    home: 0,
    registration: 0,
    learn: 0,
    validUser: 0,
    invalidUser: 0,
    verifyLogin: 0,
    fallback: 0,
    jwt: null,
};

export const RouteContextProvider = ({ children })=>{
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <RouteContext.Provider value={{...state, dispatch}}>
            {children}
        </RouteContext.Provider>
    )
}