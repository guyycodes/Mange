import React, { useState } from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Contact, FAQAccordion } from './ContactSectionElements';
import { motion } from 'framer-motion';
import icons from '../../assets/iconRegistry';


export const ContactContainer = () => {
  const [toggleForm, setToggleForm] = useState(false);
  
  const formVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const displayForm = () => {
    setToggleForm(!toggleForm);
    console.log(toggleForm);
  };

  return (
    <Container
      sx={{
        padding: 0,
        overflow: 'hidden',
        height: 'fit-content',
        justifyContent: 'flex-start',
        mb: 8,
        color: '#74b9ff',
      }}
    >
      {!toggleForm && (
        <motion.div
          layout
          variants={formVariants}
          initial="visible"
          animate={toggleForm ? 'hidden' : 'visible'}
          transition={{ duration: 0.5 }}
          style={{ height: '100%' }}
        >
          <Typography variant="h4" fontWeight="bold" mb={4}>
            Contact Us
          </Typography>
          <img
            src={icons.trust}
            alt="Trust"
            style={{
              objectFit: 'cover',
              width: '50%',
              borderRadius: 10,
            }}
          />

          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            sx={{ mt: 6 }}
            onClick={displayForm}
          >
            Get in Touch
          </Button>
        </motion.div>
      )}
      <motion.div
        layout
        variants={formVariants}
        initial="hidden"
        animate={toggleForm ? 'visible' : 'hidden'}
        transition={{ duration: 0.5 }}
        style={{ height: '100%' }}
      >
        {toggleForm && <Contact displayForm={displayForm} />}
      </motion.div>
      <Box my={4}>
        <FAQAccordion/>
      </Box>
    </Container>
  );
};