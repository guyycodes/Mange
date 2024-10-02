import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRouteContext } from '../../../util/context/routeContext';
import { JWT } from '../../../util/actions/actions';


export const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useRouteContext();

    /**
   * Handles rsetting the JWT to context
   *
   * @function
   * @param {string}
   */
    const setContext = (result, data) => {
        if (result === 'jwt') {
            dispatch({ type: JWT, payload: data });
        }
    };

  useEffect(() => {
    const processAuthentication = () => {
      // Check for JWT in URL parameters
      const params = new URLSearchParams(location.search);
      const jwtFromUrl = params.get('token');

      // Check for JWT in cookies
      const jwtFromCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('user_token='))
        ?.split('=')[1];

      const jwt = jwtFromUrl || jwtFromCookie;

      if (jwt) {
        // console.log('JWT captured:', jwt);
        setContext('jwt', jwt);
        navigate('/mange/authenticated');
      } else {
        console.error('No JWT found');
        navigate('/login');
      }
    };

    processAuthentication();
  }, [navigate, setContext, location]);

  return <div>Processing authentication...</div>;
};

export default OAuthCallback;