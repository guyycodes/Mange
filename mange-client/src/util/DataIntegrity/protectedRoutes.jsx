import { jwtDecode } from 'jwt-decode';
import { USE_CUSTOM_GET_HOOK } from "../reactHooks/GET_HOOK";
import React, {useState, useEffect} from "react";
import {
    HOME,
    REGISTRATION,
  } from '../actions/actions';
  import { useRouteContext } from '../context/routeContext';

/**
 * ProtectedRoutes component for handling authentication and conditional rendering. ust be used with the custom Hook
 * @param {Object} props - Component props
 * @param {React.ComponentType} props.component - The component to render if authenticated
 * @param {string} props.endpoint - The API endpoint for fetching user data
 * @param {boolean} [props.checkAuth=false] - Whether to perform an additional auth check
 * @returns {React.ReactElement|null} The protected component or null
 * @param {endpoint} is the endpoint to fetch the currently logged in users data
 * @param {checkAuth} is a boolean that determines if we are fetching the currently logged in user
 */
export const ProtectedRoutes = ({ component: Component, endpoint, checkAuth = false }) => {
    const { fetchData, loading, error, response } = USE_CUSTOM_GET_HOOK(endpoint);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const { dispatch, routeContext } = useRouteContext();

    /**
     * Handles routing based on the clicked link.
     * @param {string} clickedText - The text of the clicked link
     */
    const handleRouting = (clickedText) => {
        dispatch({ type: REGISTRATION, payload: clickedText === 'Registration' ? 1 : 0 });
        dispatch({ type: HOME, payload: clickedText === 'Home' ? 1 : 0 });
    };

    /**
     * Retrieves the JWT from the context.
     * @param {Object} context - The route context
     * @returns {string|null} The JWT if found, null otherwise
     */
    const getJWTFromContext = (context) => {
        const jwt = context?.JWT;
        if (jwt) {
            console.log('JWT value:', jwt);
            return jwt;
        }
        console.log('JWT not found in context');
        return null;
    };

    /**
     * Checks authentication status.
     * @param {Object|string} data - User data or 'skip' for token-only check
     * @param {boolean} loading - Loading status
     * @param {Error|null} error - Error object if any
     * @returns {boolean|null} Authentication status or null if loading
     */
    const authCheck = (data, loading, error) => {
        if (loading) return null;

        const token = getJWTFromContext(routeContext);
        if (!token) return false;

        const decodedToken = jwtDecode(token);
        if (decodedToken.exp < (Date.now() / 1000)) return false;

        if (data === 'skip') {
            return decodedToken.exp > (Date.now() / 1000);
        }

        if (data && decodedToken) {
            return (decodedToken.data.id === data.me.id) && (decodedToken.data.email === data.me.email);
        }

        if (error) {
            console.error("Error fetching user:", error);
            return false;
        }

        return false;
    };

    useEffect(() => {
        /**
         * Checks authentication status and updates state.
         */
        const checkAuthentication = async () => {
            if (checkAuth) {
                const { data, loading, error } = await fetchData();
                if (!loading) {
                    const auth = authCheck(data, loading, error);
                    setIsAuthenticated(auth);
                }
            } else {
                if (!loading) {
                    const auth = authCheck('skip', loading, error);
                    setIsAuthenticated(auth);
                }
            }
        };
        checkAuthentication();
    }, [fetchData, checkAuth, loading, error]);

    if (loading || isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return <Component />;
    } else {
        handleRouting('Registration');
        return null;
    }
}





