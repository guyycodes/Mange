import { Alert, Box, Container, Fade, LinearProgress, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import icons from '../../../assets/iconRegistry';
import { ProfileContainer } from '../../../components/index'
import { useNavigate } from 'react-router-dom';
import { useRouteContext } from '../../../util/context/routeContext';
import { ProtectedRoutes } from '../../../util/DataIntegrity/protectedRoutes';
// This component wraps the login sequence for validating a new user from their email sign up alert
/**
 * Array of facts about diabetes and STJDA to display during token validation.
 * @type {string[]}
 */
const facts = [
  "Regular physical activity can reduce the risk of chronic diseases by up to 50%.",
  "Understanding your family health history can help you make informed decisions about preventive care.",
  "Nutrition education has been shown to significantly improve dietary habits and overall health.",
  "People who are actively engaged in their health decisions tend to have better health outcomes.",
  "Knowledge about mental health can lead to earlier intervention and better management of conditions.",
  "Staying informed about health topics can help you communicate more effectively with healthcare providers.",
  "Health literacy is associated with improved self-care and reduced hospitalization rates.",
];

/**
 * ValidateToken component handles the token validation process and displays
 * a loading screen with rotating facts before showing the SignInSection.
 * 
 * @component
 * @returns {React.ReactElement} The rendered ValidateToken component
 */
export const Redirection = () => {
const navigate = useNavigate();
  /**
   * Handles routing based on the clicked link.
   * @param {string} clickedText - The text of the clicked link
   */
  const { dispatch } = useRouteContext();
  const [loading, setLoading] = useState(true);
  const [currentFact, setCurrentFact] = useState(0);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);

  useEffect(() => {

    /**
     * Interval to rotate through facts during loading.
     * @type {number}
     */
    const rotationInterval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length);
    }, 3500);

    /**
     * Interval to update the progress bar during loading.
     * @type {number}
     */
    const progressInterval = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    // Start token validation after a delay
    setTimeout(() => {
      manageUI();
    }, 12800); // 12800, or 12.8 seconds

    // Cleanup function to clear intervals
    return () => {
      clearInterval(rotationInterval);
      clearInterval(progressInterval);
    };
  }, [dispatch]);

    /**
   * Manages the UI while validation occurs.
   * @async
   * @function manageUI
   */
    const manageUI = async () => {
      try {
        // Start fading out the background
        const fadeOutInterval = setInterval(() => {
          setBackgroundOpacity((prevOpacity) => {
            const newOpacity = prevOpacity - 0.1;
            if (newOpacity <= 0) {
              clearInterval(fadeOutInterval);
              return 0;
            }
            return newOpacity;
          });
        }, 50);

      } catch (error) {
        console.error('Validation failed:', error);
        setError('Validation failed.');
      } finally {
        setLoading(false);
        if(location.pathname.endsWith('/logout')){
          // delay so the fade out looks ok
          setTimeout(() => {
         
            navigate('/')
          }, 750);

        }
      }
    };

  return (
    <>
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#ffffff', // Static background color
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
            backgroundSize: '400% 400%',
            animation: 'gradient 12s ease infinite',
            opacity: backgroundOpacity,
            transition: 'opacity 0.5s ease',
          }}
        />
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Fade in={loading } timeout={850}>
              <Box sx={{ display: loading ? 'block' : 'none', width: '100%' }}>
                <Box
                  component="img"
                  src={icons.trust}
                  alt="Logo"
                  sx={{
                    width: '150px',
                    height: 'auto',
                    marginBottom: 3
                  }}
                />
                <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 'bold', color: 'white' }}>
                  Managing Your Account
                </Typography>
                <Box sx={{ width: '100%', mb: 4, height: '4px' }}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
                <Paper 
                  elevation={6}
                  sx={{
                    p: 3,
                    mb: 4,
                    width: '100%',
                    height: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '15px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                    '&:hover': {
                      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
                    },
                    overflow: 'hidden' // Prevent content from expanding the Paper
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
                    Did You Know?
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    overflow: 'auto' // Allow scrolling if content is too long
                  }}>
                    {facts[currentFact]}
                  </Typography>
                </Paper>
              </Box>
            </Fade>
            <Fade in={!loading } timeout={750}>
              <Box sx={{ display: !loading ? 'block' : 'none' }}>
                <ProtectedRoutes component={ProfileContainer} endpoint={null} checkAuth={false} />
              </Box>
            </Fade>
            {error && (
              <Alert severity="error" sx={{ mt: 4 }}>
                {error}
              </Alert>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};