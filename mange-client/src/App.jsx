import React, { useEffect, useState } from 'react';
// import { UserForm } from './screens/Home/sections/Registration/InputForm';
import { LandingPage } from './screens/Landing';
import { useRouteContext } from './util/context/routeContext';


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

  const printElementWithValueOne = (context) => {
    // Loop through each property in the object
    for (const key in context) {
        // Check if the property's value is strictly equal to 1
        if (context[key] === 1) {
          if(key === 'home'){
            setCurrentView(`/`)
            scrollNow(0);
          }else if(key === 'learn'){
            setCurrentView(`/`)
            scrollNow(600);
          }else if(key === 'registration'){
            setCurrentView(`/`)
            console.log('registration')
          }else {
            setCurrentView(`/${key}`)
          }
        }
    }
};

  useEffect(() => {
  // Call the function with your context
  printElementWithValueOne(routeContext);
  }, [routeContext]);


  return (
    <>
        {/* <RouterProvider router={router}/>  */}

        { currentView === '/' && <LandingPage /> }
        {/* { currentView === "/registration" && <UserForm/> } */}
    </>
  );
}

export default App;
