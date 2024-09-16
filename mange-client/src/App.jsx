import React, { useEffect, useState } from 'react';
// import { UserForm } from './screens/Home/sections/Registration/InputForm';
import { LandingPage } from './screens/Landing';
import { SignInSection } from './screens/Login/Container';
import { useRouteContext } from './util/context/routeContext';
import { ProtectedRoutes } from './util/DataIntegrity/protectedRoutes';
import { TestComponent } from './util/TestComponent';
import { BackgroundWrapper } from './util/Wrappers/Background';

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
  
  const [currentView, setCurrentView] = useState('/');

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
                  setCurrentView('/login');
                  console.log('registration');
                  break;
              case 'validUser':
                  setCurrentView('/mange/authenticated?value=1');
                  console.log('validUser');
                  break;
              case 'invalidUser':
                  setCurrentView('/mange/authenticated?value=0');
                  console.log('invalidUser');
                  break;
              case 'failedLogin':
                  setCurrentView('/mange/authenticated?failure=1');
                  console.log('failedLogin');
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
  // Call the function with your context
  printElementWithValueOne(routeContext);
  }, [routeContext]);


  return (
    <>
      <BackgroundWrapper>
        { currentView === '/' && <LandingPage /> }
        { currentView === '/mange/authenticated?value=1' && <ProtectedRoutes component={<TestComponent/>} endpoint={null} checkAuth={false} /> }
        { currentView === "/login" && <SignInSection/> }
        </BackgroundWrapper>
    </>
  );
}

export default App;
