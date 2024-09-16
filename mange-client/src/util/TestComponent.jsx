import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Switch, 
  FormControlLabel,
  Paper
} from '@mui/material';

export const TestComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [switchState, setSwitchState] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setSwitchState(event.target.checked);
  };

  const handleButtonClick = () => {
    alert(`Input value: ${inputValue}\nSwitch state: ${switchState}`);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Test Component
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <TextField 
          label="Test Input" 
          variant="outlined" 
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
        />
      </Box>
      
      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          control={
            <Switch 
              checked={switchState}
              onChange={handleSwitchChange}
              color="primary"
            />
          }
          label="Test Switch"
        />
      </Box>
      
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleButtonClick}
      >
        Test Button
      </Button>
    </Paper>
  );
};