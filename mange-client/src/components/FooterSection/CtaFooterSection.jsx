import {
  ArrowUpward,
  Facebook,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

/**
 * FooterSection component for the application.
 * Renders the footer with quick links, contact information, and social media icons.
 *
 * @function
 * @returns {JSX.Element} The rendered FooterSection component
 */
export const FooterSection = () => {
  const navigate = useNavigate();
    /**
   * Scrolls the window to the top smoothly.
   *
   * @function
   * @param {React.MouseEvent<HTMLButtonElement>} e - The click event
   */
  const scrollTo = (e, v) => {
    e.preventDefault();
    window.scrollTo({
      top: v,
      behavior: 'smooth',
    });
  };

  return (
    <Box component="footer" sx={{ bgcolor: 'black', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4} sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Logo */}
            <Typography variant="h5" style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: '#d4af37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              letterSpacing: '2px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              marginBottom: '10px',
            }}>
              <span style={{ fontSize: '32px', marginRight: '10px' }}>M</span>ANGE
            </Typography>
            <Typography variant="body2">
              Your AI-powered health companion
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{textDecoration:'underline'}} gutterBottom>
              Quick Links
            </Typography>
            <Stack direction="column" spacing={1} alignItems="center">
              <Button color="inherit" onClick={(e) => scrollTo(e, 0)}>Home</Button>
              <Button color="inherit" onClick={() => navigate('/login')}>Login/Register</Button>
              <Button color="inherit" onClick={(e) => scrollTo(e, 600)}>Learn More</Button>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: info@mange.com
            </Typography>
            <Typography variant="body2">
              Phone: (555) 123-4567
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <IconButton color="inherit" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><Facebook /></IconButton>
          <IconButton color="inherit" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><Instagram /></IconButton>
          <IconButton color="inherit" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaXTwitter /></IconButton>
          <IconButton color="inherit" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><LinkedIn /></IconButton>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<ArrowUpward />}
            onClick={(e)=>{scrollTo(e,0)}}
          >
            Back to Top
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 4 }}>
          © 2024 Mange. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};