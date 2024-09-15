import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CssBaseline } from '@mui/material';
import { RouteContextProvider } from './util/context/routeContext.jsx';


// Render the app with the theme
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <RouteContextProvider>
        <CssBaseline /> {/* Normalize the CSS and add global styles */}
        <App />
      </RouteContextProvider>

  </React.StrictMode>,
);