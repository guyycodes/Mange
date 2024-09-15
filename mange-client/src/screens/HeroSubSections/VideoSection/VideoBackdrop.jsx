import React, { useRef, useEffect } from "react";
import { Button, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { useRouteContext } from "../../../util/context/routeContext";
import {
  REGISTRATION,
  LEARN
} from '../../../util/actions/actions';

export const TitleTextsButton = () => {
  const theme = useTheme();
  const videoRef = useRef(null);
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const { dispatch } = useRouteContext();

    /**
   * Handles routing based on the clicked link.
   *
   * @function
   * @param {string} clickedText - The text of the clicked link
   */
    const handleRouting = (clickedText) => {
      dispatch({ type: REGISTRATION, payload: clickedText === 'Registration' ? 1 : 0 });
      dispatch({ type: LEARN, payload: clickedText === 'Learn' ? 1 : 0 });
    };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.60; // video loop running at 60% speed
    }
  }, []);

  return (
    <Box sx={{
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: { xs: "1rem", md: "2rem" },
      minHeight: '400px', // Ensure minimum height for visibility
      borderRadius: '25px'
    }}>
      {/* Background Video */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, 
        opacity: 0.5, 
      }}>
        <video
          loop={true} 
          muted={true} 
          autoPlay={true}
          playsInline={true}
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          
        >
          <source src="https://imgur.com/bcbIhgV.mp4" type="video/mp4" />
        </video>
        {/* Overlay text  */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 1,
        }} />
      </Box>

      {/* Main Content */}
      <Box sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-end" },
        gap: { xs: "2rem", md: "124px" },
        position: 'relative',
        zIndex: 2,
      }}>
        <Typography variant="h1" component="p" sx={{
          fontFamily: "var(--heading-1-font-family)",
          fontSize: {
            xs: "calc(var(--heading-1-font-size) * 0.6)",
            sm: "calc(var(--heading-1-font-size) * 0.8)",
            md: "var(--heading-1-font-size)"
          },
          fontStyle: "var(--heading-1-font-style)",
          fontWeight: "var(--heading-1-font-weight)",
          letterSpacing: "var(--heading-1-letter-spacing)",
          lineHeight: "var(--heading-1-line-height)",
          marginTop: "-1px",
          position: "relative",
          width: "fit-content",
          textAlign: { xs: "center", md: "left" },
        }}>
          <Box component="span" sx={{ color: "var(--black-700-4d4d4d)" }}>Breaking </Box>
          <Box component="span" sx={{ color: "var(--gold)" }}> Down </Box>
          <Box component="span" sx={{ color: "var(--black-700-4d4d4d)" }}>
            ,<br />
            Health Barriers
          </Box>
        </Typography>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          gap: "24px",
          maxWidth: { xs: "100%", md: "658px" },
        }}>
          <Typography variant="body1" sx={{
            color: "var(--black)",
            fontFamily: "var(--paragraph-font-family)",
            fontSize: "var(--paragraph-font-size)",
            fontStyle: "var(--paragraph-font-style)",
            fontWeight: "var(--paragraph-font-weight)",
            letterSpacing: "var(--paragraph-letter-spacing)",
            lineHeight: "var(--paragraph-line-height)",
            marginTop: "-1px",
            opacity: 0.75,
            position: "relative",
            width: "100%",
            textAlign: { xs: "center", md: "left" },
          }}>
            We are deeply committed to inspiring health, through technology, making a meaningful difference in the lives of all people.
          </Typography>
          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: "24px",
            width: { xs: "100%", sm: "auto" },
          }}>
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: 'var(--gold)',
                width: { xs: "100%", sm: "auto" },
                '&:hover': {
                  bgcolor: 'purple',
                },
              }}
              onClick={() => handleRouting('Learn')}
            >
              Learn More
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => handleRouting('Registration')}
              sx={{ 
                borderColor: 'var(--white)', 
                color: 'var(--white)',
                width: { xs: "100%", sm: "auto", 
                backgroundColor: "var(--black-900-1a1a1a)",
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};