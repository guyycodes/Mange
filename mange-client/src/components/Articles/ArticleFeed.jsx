import React, { useState } from 'react';
import { Box, Paper, Avatar, Typography, Grid, Button, Input } from '@mui/material';


// New components
export const ArticlesView = () => (
  <Box>
    <Typography variant="h5" gutterBottom>Articles</Typography>
    {/* Implement RSS feed rows here */}
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6">Technology News</Typography>
      {/* Add scrollable row of article cards */}
    </Box>
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6">Science Updates</Typography>
      {/* Add scrollable row of article cards */}
    </Box>
    {/* Add more rows as needed */}
  </Box>
);