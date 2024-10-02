import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Container, MenuItem, Snackbar } from '@mui/material';
import { Send } from '@mui/icons-material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export const Contact = ({ displayForm }) => {
  const hoverBoxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.10)';
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const subjects = [
    'Account Issues',
    'Technical Support',
    'Billing Inquiries',
    'Feature Request',
    'Bug Report',
    'Data Privacy Concerns',
    'Platform Usage Help',
    'AI Recommendation Feedback',
    'General Inquiry',
    'Other'
  ];

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (response.ok) {
        setSnackbarMessage('Your message has been sent successfully!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setSnackbarMessage('Failed to send message. Check your email and try again.');
      }
    } catch (error) {
      setSnackbarMessage('An error occurred. Please try again later.');
    }

    setSnackbarOpen(true);
  };

  return (
    <Box
      sx={{
        bgcolor: 'grey.300',
        p: 0,
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        '&:hover': {
          boxShadow: hoverBoxShadow,
          transition: "transform 0.25s ease-in-out",
          transform: 'scale(1.0)'
        }
      }}
    >
      <Typography variant="h4" align="center">
        CONTACT
      </Typography>
      <Typography variant="h6" align="center">
        How can we assist you today?
      </Typography>

      <Container maxWidth="sm" sx={{ my: 2 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField 
              fullWidth 
              label="Name" 
              name="Name" 
              required 
              variant="outlined" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField 
              fullWidth 
              label="Reply Email" 
              name="Email" 
              type="email" 
              required 
              variant="outlined" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              select
              label="Subject"
              name="Subject"
              value={subject}
              onChange={handleSubjectChange}
              required
              variant="outlined"
            >
              {subjects.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Message"
              name="Message"
              multiline
              rows={4}
              required
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between">
              <Button
                startIcon={<ArrowBackOutlinedIcon />}
                variant="contained"
                onClick={displayForm}
                sx={{
                  color: 'black',
                  bgcolor: 'grey.300',
                  '&:hover': {
                    boxShadow: hoverBoxShadow,
                    transition: "transform 0.25s ease-in-out",
                    transform: 'scale(1.0)'
                  }
                }}
              >
                Return
              </Button>
              <Button
                startIcon={<Send />}
                variant="contained"
                type="submit"
                sx={{
                  color: 'grey.500',
                  bgcolor: 'grey.300',
                  '&:hover': {
                    boxShadow: hoverBoxShadow,
                    transition: "transform 0.25s ease-in-out",
                    transform: 'scale(1.0)'
                  }
                }}
              >
                SEND MESSAGE
              </Button>
            </Stack>
          </Stack>
        </form>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};