import { Box } from '@mui/material';
import React from 'react';
import { useRouteContext } from '../context/routeContext';

export const BackgroundWrapper = ({ children }) => {
  const routeContext = useRouteContext();
  const isLoginPage = routeContext.registration === 1;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        ...(isLoginPage
          ? {
              background: `url('https://imgur.com/lBd3zf6.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
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
            }),
      }}
    >
      {children}
    </Box>
  );
};