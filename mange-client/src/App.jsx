//app.jsx
import React, { useEffect, useState, useCallback  } from 'react';
// import { UserForm } from './screens/Home/sections/Registration/InputForm';
import { LandingPage } from './screens/Landing';
import { SignInSection } from './screens/Login/Container';
import { useRouteContext } from './util/context/routeContext';
import { ProtectedRoutes } from './util/DataIntegrity/protectedRoutes';
import { Redirection } from './screens/Login/Redirects';
import { BackgroundWrapper } from './util/Wrappers/Background';
import { USE_CUSTOM_POST_HOOK } from "./util/reactHooks/POST_HOOK";
import { JWT } from "./util/actions/actions";

function App() {

  const scrollNow = (location) =>{
    // Scroll now
    (() => {
      window.scrollTo({
        top: location,
        behavior: 'smooth',
      });
    })();
  }
  const routeContext = useRouteContext();
  const { dispatch } = useRouteContext();
  const [currentView, setCurrentView] = useState('/');
  const [userValidationSequence, setUserValidationSequence] = useState(false);
  const [authFailure, setAuthFailure] = useState(false);


  const setContext = useCallback((result, data) => {
    if (result === 'ValidUser') {
      dispatch({ type: VALID_USER, payload: 1 });
      dispatch({ type: JWT, payload: data });
    } else if (result === 'jwt') {
      dispatch({ type: JWT, payload: data });
    }
  }, [dispatch]);
  /**
 * Determines the current view based on the context object
 * and updates the view accordingly.
 * 
 * @param {Object} context - An object containing various flags
 */
const printElementWithValueOne = (context) => {
  // Loop through each property in the object
  for (const key in context) {
      // Check if the property's value is strictly equal to 1
      if (context[key] === 1) {
          switch (key) {
              case 'home':
                  setCurrentView('/');
                  scrollNow(0);
                  break;
              case 'learn':
                  setCurrentView('/');
                  scrollNow(600);
                  break;
              case 'registration':
                  window.history.pushState({}, null, '/login');
                  setCurrentView('/login');
                  context[key] = 0;
                  break;
              default:
                  setCurrentView(`/${key}`);
          }
          // Exit the loop after finding the first property with value 1
          break;
      }
      
  }
};

  useEffect(() => {
    window.history.pushState({}, null, '/');
   
    if (routeContext.valid_user === 1 && routeContext.jwt) {
      console.log('validUser');
      window.history.pushState({}, null, '/mange/authenticated?value=1');
      setCurrentView('/mange/authenticated?value=1');
    } else {
      printElementWithValueOne(routeContext);
    }
  
  }, [routeContext, routeContext.jwt, routeContext.validUser]);

  const {
    sendRequest: validateTokenRequest,
    loading: tokenValidationLoading,
    error: tokenValidationError,
    response: tokenValidationResponse,
    LoadingComponent: TokenValidationLoadingIndicator
  } = USE_CUSTOM_POST_HOOK('http://localhost:8080/api/validate-token', 'POST');

  useEffect(() => {
    const validateToken = async (token) => {
        try {
            const result = await validateTokenRequest({ token });
            if (result && result.data && result.data.valid) {

                setUserValidationSequence(true);
                setContext('ValidUser', result.data);
                window.history.pushState({}, null, '/login');
                setCurrentView('/login')

            } else {
                console.error('Token is invalid');
                setAuthFailure(true);
                setCurrentView('/')
                alert("The verification link is invalid or has expired. Please request a new verification email.");
            }
        } catch (error) {
            console.error('Error validating token:', error);
            alert("An error occurred while verifying your account. Please try again later or contact support.");
        }
    };

    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
        validateToken(token);
    }
}, []);

  return (
    <>
      <BackgroundWrapper>
        { currentView === '/' && <LandingPage /> }
        { currentView === '/mange/authenticated?value=1' && <ProtectedRoutes component={Redirection} endpoint={null} checkAuth={false} /> }
        { currentView === '/login' && <SignInSection authFailure={authFailure} validationSequence={userValidationSequence} /> }
        {/* { currentView === '/mange/authenticated?value=1' && <TestComponent/>} */}
        </BackgroundWrapper>
    </>
  );
}

export default App;
