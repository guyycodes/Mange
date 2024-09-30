import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Box, Typography, Button, IconButton, Switch, TextField } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import LockIcon from '@mui/icons-material/Lock';
import icons from '../../assets/iconRegistry';
import { SidebarMenu } from './PopoutElements/SidebarMenu';
import { SpaceBar } from '@mui/icons-material';


export const SlideOut = ({ handleTabSelection }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selected, setSelected] = useState(0);
  const [isAIOn, setIsAIOn] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
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

  const handleOpenUpgradeModal = () => {
    // Implement the logic to open the upgrade modal
    console.log("Open upgrade modal");
  };

  const handleImageUpload = (event) => {
    // Implement the logic for image upload
    console.log("Image uploaded:", event.target.files[0]);
  };

  return (
    <>
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
                backgroundImage: `url(https://imgur.com/0c4bor6.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: '10'
              }} >
                <SidebarMenu handleTabSelection={handleTabSelection} selected={selected} />
              </Box>
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
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
            {hasAIAccess ? (
              <>
                <Switch
                  checked={isAIOn}
                  onChange={toggleAI}
                  color="primary"
                  className="ai-toggle"
                />
                <Typography variant="subtitle2" sx={{ color: 'white', flex: 1, marginLeft: '10px' }}>
                  AI Assistant
                </Typography>
              </>
            ) : (
              <>
                <LockIcon 
                  sx={{ color: 'white', marginRight: '10px', cursor: 'pointer' }} 
                  onClick={handleOpenUpgradeModal}
                />
                <Typography variant="subtitle2" sx={{ color: 'white', flex: 1 }}>
                  Upgrade to Unlock
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleOpenUpgradeModal}
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'white',
                    },
                  }}
                >
                  Unlock
                </Button>
              </>
            )}
          </Box>
          
          <motion.div
            ref={chatWindowRef}
            initial={{ height: 0, width: '100%' }}
            animate={{ 
              height: isAIOn ? 'auto' : 0,
              width: isAIOn ? '100vw' : '100%',
              maxWidth: '400px',
            }}
            transition={{ duration: 0.3 }}
            style={{ 
              overflow: 'hidden',
              position: 'absolute',
              left: 0,
              bottom: '100%',
              backgroundColor: 'rgba(20, 121, 204, 0.9)',
              borderRadius: '8px 8px 0 0',
              boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Box sx={{ 
              height: '360px',
              overflowY: 'auto', 
              marginBottom: '10px', 
              backgroundColor: 'rgba(255, 255, 255, 0.05)', 
              borderRadius: '4px', 
              padding: '10px',
              margin: '10px'
            }}>
              {chatMessages.map((msg, index) => (
                <Typography key={index} variant="body2" sx={{ color: msg.type === 'user' ? 'white' : '#90caf9', marginBottom: '5px' }}>
                  {msg.type === 'user' ? 'You: ' : 'AI: '}{msg.content}
                </Typography>
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '0 10px 10px 10px' }}>
              <TextField
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ 
                  flex: 1, 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  input: { color: 'white' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
                placeholder="Type a message..."
              />
              <IconButton onClick={handleChatSubmit} sx={{ color: 'white', marginLeft: '5px' }}>
                <SendIcon />
              </IconButton>
              <IconButton component="label" sx={{ color: 'white' }}>
                <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                <ImageIcon />
              </IconButton>
            </Box>
          </motion.div>
        </Box>
      )}
    </Box>
    </>
  );
};