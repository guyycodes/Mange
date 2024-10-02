import React, { useState } from 'react';
import { Box, Paper, Avatar, Typography, Grid, Button, Input } from '@mui/material';



export const MobileAppView = () => (
    <Box>
      <Typography variant="h5" gutterBottom>Mobile App</Typography>
      <Button variant="contained" color="primary" href="#" target="_blank">
        Download for iOS
      </Button>
      <Button variant="contained" color="secondary" href="#" target="_blank" sx={{ ml: 2 }}>
        Download for Android
      </Button>
    </Box>
  );