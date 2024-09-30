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

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {


  const [userValidationSequence, setUserValidationSequence] = useState(false);
  const [authFailure, setAuthFailure] = useState(false);

  useEffect(() => {

  }, [userValidationSequence]);



// routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <BackgroundWrapper><LandingPage /></BackgroundWrapper>
  },
  {
    path: "/login",
    element: <BackgroundWrapper><SignInSection authFailure={authFailure} validationSequence={userValidationSequence} /></BackgroundWrapper>
  },
  {
    path: "/mange/authenticated",
    element: <BackgroundWrapper><ProtectedRoutes component={Redirection} endpoint={null} checkAuth={false} /></BackgroundWrapper>
  },
  {
  path: "/validate",
  element: <BackgroundWrapper><ValidateToken setUserValidationSequence={setUserValidationSequence} setAuthFailure={setAuthFailure} /></BackgroundWrapper>
  },
  {
    path: "/oauth/callback",
    element: <BackgroundWrapper><OAuthCallback /></BackgroundWrapper>
  },
  {
    path: "*",
    element:  <Error404/>
  }
]);
  
return (
    <>
    <RouterProvider router={router}/> 
    </>
  );
}

export default App;
