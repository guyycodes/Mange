import React from 'react';
import { Button, Typography, Box, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const OverlayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 120px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const Error404 = () => {
  const [errorType, setErrorType] = React.useState('');
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="sm" sx={{
      backgroundImage: 'url("https://u-static.haozhaopian.net/uid_a11c591b902d461dbef89c51be64a5df/aiImage/40a624345ffd4576be181d6d41c64ac3.jpg")',
      backgroundSize: 'cover',  
      backgroundRepeat: 'no-repeat',  
      backgroundPosition: 'center',  
      height: '100vh',  
      display: 'flex',
      alignItems: 'center',  
      justifyContent: 'center',
      borderRadius: '1rem',
      position: 'relative',
    }}>
      <OverlayText>404 Not Found</OverlayText>
      <Paper elevation={3} sx={{ 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 2,
        
      }}>
        <Typography variant="h4" gutterBottom>
          Oops! Page Not Found
        </Typography>
      
        <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </Typography>

        <Button variant="contained" color="primary" onClick={handleRedirect}>
          Go to Home Page
        </Button>
      </Paper>
    </Container>
  );
};