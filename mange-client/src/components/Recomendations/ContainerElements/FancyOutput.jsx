import React, { useState, useEffect } from 'react';
import { Paper, Typography, Fade, Box } from '@mui/material';

export const FancyOutputDisplay = ({ output, setShowSaveButton }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayText('');
    setIndex(0);
    setShowSaveButton(false);
  }, [output]);

  useEffect(() => { 
    if (index <= output.length) {
      const timer = setTimeout(() => {
        setDisplayText(output.slice(0, index));
        setIndex((prevIndex) => prevIndex + 1);
      }, 10); // Adjust typing speed here
      return () => clearTimeout(timer);
    } else if (index > output.length && output.length > 0) {
      setShowSaveButton(true);
    }
  }, [index, output]);



  return (
    <Fade in={!!output}>
      <Paper 
        elevation={3}
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: '#f0f8ff',
          borderRadius: '15px',
          border: '1px solid #1976d2',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" gutterBottom color="primary">
          Generated Plan
        </Typography>
        <Box sx={{ 
          backgroundColor: '#ffffff', 
          borderRadius: '8px', 
          p: 2, 
          minHeight: '200px',
          maxHeight: '500px',
          overflowY: 'auto'
        }}>
          <Typography 
            variant="body1" 
            sx={{ 
              whiteSpace: 'pre-wrap',
              textAlign: 'left',
              fontFamily: 'monospace',
              lineHeight: 1.6,
              fontSize: '0.9rem'
            }}
          >
            {displayText}
          </Typography>
        </Box>
      </Paper>
    </Fade>
  );
};