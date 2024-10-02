//app.jsx
import React, { useEffect, useState, useCallback  } from 'react';
// import { UserForm } from './screens/Home/sections/Registration/InputForm';
import { LandingPage } from './screens/Landing';
import { SignInSection } from './screens/Login/Container';
import { ProtectedRoutes } from './util/DataIntegrity/protectedRoutes';
import { Redirection } from './screens/Login/Redirects';
import { BackgroundWrapper } from './util/Wrappers/Background';
import { ValidateToken } from './screens/Login/Redirects/ValidateIncomingTokens'
import { OAuthCallback } from './screens/Login/SignIn/OAuthCallback';
import { Error404 } from './screens/ErrorPages';
import { ProfileContainer } from './components/index'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {



  const [userValidationSequence, setUserValidationSequence] = useState(false);
  const [authFailure, setAuthFailure] = useState(false);
  const [jwt, setJWT] = useState(null);
  const [passwordRecovery, setPasswordRecovery] = useState(false)
  const[recoveryFailure, setRecoveryFailure] = useState(false)

 useEffect(() => {
    /**
     * Checks for JWT in local storage
     *
     * @function
     */
    const getJWT = () => {
      try {
        const storedJWT = localStorage.getItem('gemini_jwt');
        if (storedJWT) {
          // console.log('JWT found in local storage');
          setJWT(false);
        } else {
          // console.log('JWT not found in local storage');
          setJWT(true);
        }
      } catch (error) {
        console.error('Error accessing local storage:', error);
        setJWT(true);
      }
    };

    getJWT();
  }, []);

  // Conditional component for protected route
  const ProtectedComponent = () => {
    return jwt ? <Redirection /> : <ProfileContainer />;
  };

// routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <BackgroundWrapper><LandingPage /></BackgroundWrapper>
  },
  {
    path: "/login",
    element: 
    <BackgroundWrapper>
      <SignInSection 
        setPasswordRecovery={setPasswordRecovery} 
        passwordRecovery={passwordRecovery} 
        authFailure={authFailure} 
        recoveryFailure={recoveryFailure} 
        validationSequence={userValidationSequence} 
        setUserValidationSequence={setUserValidationSequence} 
    />
    </BackgroundWrapper>
  },
  {
    path: "/mange/authenticated",
    element: <BackgroundWrapper><ProtectedRoutes component={ProtectedComponent} endpoint={null} checkAuth={false} /></BackgroundWrapper>
  },
  {
  path: "/validate",
  element: 
  <BackgroundWrapper>
    <ValidateToken 
      setPasswordRecovery={setPasswordRecovery} 
      setUserValidationSequence={setUserValidationSequence} 
      setAuthFailure={setAuthFailure} 
    />
    </BackgroundWrapper>
  },
  {
    path: "/oauth/callback",
    element: <BackgroundWrapper><OAuthCallback /></BackgroundWrapper>
  },
  {
    path: "/logout",
    element: <BackgroundWrapper><Redirection /></BackgroundWrapper>
  },
  {
    path: "/reset",
    element: 
    <BackgroundWrapper>
      <ValidateToken 
        setPasswordRecovery={setPasswordRecovery} 
        setRecoveryFailure={setRecoveryFailure} 
        setUserValidationSequence={setUserValidationSequence} 
        setAuthFailure={setAuthFailure} 
      />
      </BackgroundWrapper>
  },
  {
    path: "/passwordReset",
    element:       
    <SignInSection 
        setPasswordRecovery={setPasswordRecovery} 
        passwordRecovery={passwordRecovery} 
        authFailure={authFailure} 
        recoveryFailure={recoveryFailure} 
        validationSequence={userValidationSequence} 
        setUserValidationSequence={setUserValidationSequence} 
    />
  },
  {
    path: "/*",
    element: <Error404/>
  }
]);
  
return (
    <>
    <RouterProvider router={router}/> 
    </>
  );
}

export default App;
