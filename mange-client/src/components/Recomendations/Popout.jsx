import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Box, Typography, Button, IconButton, Switch, TextField } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import LockIcon from '@mui/icons-material/Lock';
import icons from '../../assets/iconRegistry';

export const SlideOut = ({ handleTabSelection, selected }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAIOn, setIsAIOn] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const chatWindowRef = useRef(null);
  const [hasAIAccess, setHasAIAccess] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      const response = await new Promise(resolve => setTimeout(() => resolve({ hasAccess: true }), 1000));
      setHasAIAccess(response.hasAccess);
    };
    checkSubscription();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target) && !event.target.closest('.ai-toggle')) {
        setIsAIOn(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 605) {
        setIsSidebarOpen(false);
        setWindowWidth(window.innerWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleAI = () => {
    if (hasAIAccess) {
      setIsAIOn(!isAIOn);
    } else {
      console.log("Upgrade required to access AI features");
    }
  };

  const handleChatSubmit = () => {
    if (chatInput.trim() && hasAIAccess) {
      setChatMessages([...chatMessages, { type: 'user', content: chatInput }]);
      setChatInput("");
    }
  };

  return (
    <Box className="overlap" sx={{
      height: '100vh',
      position: 'relative',
      width: isSidebarOpen ? '225px' : '50px',
      transition: 'width 0.3s ease-in-out',
      zIndex: '10'
    }}>
      <Box className="menu" sx={{
        height: '100%',
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: '10'
      }}>
        <Box sx={{ position: 'relative', zIndex: '4' }}>
          <Box className="BG" sx={{
            backgroundColor: '#1479cc',
            height: '100vh',
            position: 'absolute',
            top: 0,
            width: isSidebarOpen ? '218px' : '50px',
            transition: 'width 0.3s ease-in-out',
            zIndex: '9'
          }} />
          <IconButton
            sx={{
              position: 'absolute',
              top: '20px',
              right: '-25px',
              backgroundColor: '#1479cc',
              color: 'white',
              borderRadius: '50%',
              zIndex: 11,
              transform: isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease-in-out',
            }}
            onClick={toggleSidebar}
          >
            <ChevronRightIcon />
          </IconButton>
          {isSidebarOpen && (
            <>
              <Box className="logo" sx={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '100px',
                backgroundImage: `url(${icons.logo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: '10'
              }} />
              <Box className="menu-name" sx={{ position: 'absolute', top: '234px', width: '169px', zIndex: '10' }}>
                <Button
                  onClick={() => handleTabSelection(2)}
                  sx={{
                    position: 'absolute',
                    top: '45px',
                    transform: 'translateX(10%)',
                    scale: '1.25',
                    width: '129px',
                    padding: 0,
                    minWidth: 'unset',
                  }}
                >
                  <img alt="My Camper" src={selected === 2 ? icons.myCamperDark : icons.myCamperLight} style={{ width: '100%' }} />
                </Button>
                <Button
                  onClick={() => handleTabSelection(1)}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    width: '129px',
                    padding: 0,
                    minWidth: 'unset',
                  }}
                >
                  <img alt="Forms" src={selected === 1 ? icons.formsDark : icons.formsLight} style={{ width: '100%' }} />
                </Button>
              </Box>
            
                <Button
                  onClick={() => handleTabSelection(3)}
                  sx={{
                    position: 'absolute',
                    top: '328px',
                    width: '107px',
                    padding: 0,
                    minWidth: 'unset',
                    zIndex: '10',
                  }}
                >
                  <img alt="Contact" src={selected === 3 ? icons.contactDark : icons.contactLight} style={{ width: '100%' }} />
                </Button>
              
              <Button
                onClick={() => handleTabSelection(0)}
                sx={{
                  transform: 'translateX(-5%)',
                  position: 'absolute',
                  top: '195px',
                  width: '134px',
                  padding: 0,
                  minWidth: 'unset',
                  zIndex: '10'
                }}
              >
                <img alt="Profile" src={selected === 0 ? icons.profileDark : icons.profileLight} style={{ width: '100%' }} />
              </Button>
            </>
          )}
        </Box>
      </Box>
      {isSidebarOpen && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '20px',
            left: '10px',
            right: '15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '10px',
            zIndex: 11
          }}
        >
          {/* AI Assistant toggle and chat window */}
          {/* ... (AI Assistant code remains the same) */}
        </Box>
      )}
    </Box>
  );
};