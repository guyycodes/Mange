import React, { useState } from 'react';
import { Stack, Box, Typography, Button, useTheme } from '@mui/material';
import { AccordionComponent } from './Accordian';
import { motion } from 'framer-motion';

export const About = () => {
  const theme = useTheme();
  const textColor = theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary;
  
  const [learnMore, setLearnMore] = useState(false);
  
  const handleLearnMoreClick = () => {
    setLearnMore(!learnMore);
  };

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
      spacing={0}
      sx={{ color: textColor, alignItems: 'flex-start' }}
    >
      <Box>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            alignItems: 'flex-start'
          }}
        >
          {!learnMore ? (
            <>
              <Typography variant="h4" fontWeight="600" color={'var(--black-50-f2f2f2)'} sx={{'&:hover': {bgcolor: 'var(--gold)'},
              }}>
                Your Health Journey
              </Typography>
              <Typography variant="body1" color={'var(--black-50-f2f2f2)'}  sx={{ maxWidth: '600px' }}>
                Embark on a personalized wellness journey with our AI-powered health companion.
                Tailored nutrition plans, fitness routines, mental wellness strategies,
                and more, all designed to help you achieve your unique health goals.
              </Typography>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <AccordionComponent/>
            </motion.div>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                '&:hover': {
                  bgcolor: 'var(--gold)',
                },
              }}
              onClick={handleLearnMoreClick}
            >
              {learnMore ? 'Return' : "Discover More"}
            </Button>
          </Box>
        </Stack>
      </Box>
      <Box 
        sx={{
          position: 'absolute',
          display: 'flex',
          transform: learnMore ? 'translateY(70vh) translateX(15vh)' : 'translateY(60vh)',
          zIndex: learnMore ? -5 : 0,
        }}
      >
      </Box>
    </Stack>
  );
};