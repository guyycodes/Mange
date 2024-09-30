import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Home, Description, DirectionsCar, ContactMail } from '@mui/icons-material';

const MenuButton = ({ icon: Icon, selected, onClick, label }) => (
  <IconButton
    onClick={onClick}
    sx={{
      color: selected ? 'var(--black-900-1a1a1a)' : 'text.secondary',
      '&:hover': { backgroundColor: 'action.hover' },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '80px',
      height: '80px',
      margin: '10px 0',
    }}
  >
    <Icon sx={{ fontSize: 36, mb: 1 }} />
    <Box component="span" sx={{ fontSize: '0.75rem', textAlign: 'center' }}>
      {label}
    </Box>
  </IconButton>
);

export const SidebarMenu = ({ selected, handleTabSelection }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        pt: 2,
        mt: '15vh',
      }}
    >
      <MenuButton
        icon={Home}
        selected={selected === 0}
        onClick={() => handleTabSelection(0)}
        label="Home"
      />
      <MenuButton
        icon={Description}
        selected={selected === 1}
        onClick={() => handleTabSelection(1)}
        label="Articles"
      />
      <MenuButton
        icon={DirectionsCar}
        selected={selected === 2}
        onClick={() => handleTabSelection(2)}
        label="MobileApp"
      />
      <MenuButton
        icon={ContactMail}
        selected={selected === 3}
        onClick={() => handleTabSelection(3)}
        label="Contact"
      />
    </Box>
  );
};