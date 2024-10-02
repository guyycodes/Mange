import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const BackgroundWrapper = ({ children }) => {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [isAuthPage, setIsAuthPage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateBackground = () => {
      const currentPath = location.pathname;
      setIsLoginPage(currentPath.endsWith('/login'));
      setIsAuthPage(
        currentPath.endsWith('/mange/authenticated') || 
        currentPath.endsWith('/mange/authenticated?value=1')
      );
    };

    updateBackground();
  }, [location]); // This will run whenever the location changes

  const backgroundStyle = isLoginPage
    ? {
        background: `url('https://imgur.com/lBd3zf6.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : isAuthPage
    ? {} // No background for auth pages
    : {
        bgcolor: '#040203',
        background: `
          linear-gradient(to left, 
            rgba(4, 2, 3, 0) 20%, 
            rgba(4, 2, 3, 1) 100%
          ),
          url('https://imgur.com/k9a68j3.png')
        `,
        backgroundPosition: 'right',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'auto 100%, auto 100%',
      };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        ...backgroundStyle,
      }}
    >
      {children}
    </Box>
  );
};