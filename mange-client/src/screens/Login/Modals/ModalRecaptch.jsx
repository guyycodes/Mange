import React, { useState } from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  Button, 
  FormControlLabel, 
  Checkbox, 
  CircularProgress 
} from '@mui/material';
import ReCAPTCHA from "react-google-recaptcha";

export const ModalWithRecaptcha = ({ 
  modalOpen, 
  setModalOpen, 
  askNewUser, 
  spinner, 
  termsAccepted, 
  setTermsAccepted, 
  sendConfirmation, 
  submitUser, 
  formsData, 
  renderTermsAndConditions,
  fadeOut
}) => {
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  const handleRecaptchaChange = (value) => {
    setRecaptchaVerified(!!value);
  };

  const isOkButtonDisabled = !termsAccepted || !recaptchaVerified;

  return (
    <Modal
      open={modalOpen}
      disableEscapeKeyDown
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%', 
        left: '50%',
        transform: 'translate(-50%, -50%)', 
        width: 400, 
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 1s ease-out'
      }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {askNewUser ? 'We didn\'t find an account for those credentials\nCreate an account?' : 'Terms & Conditions'}
        </Typography>
        {spinner ? (
          <CircularProgress />
        ) : (
          <>
            <Typography id="modal-modal-description" sx={{ mt: 2, maxHeight: 300, overflow: 'auto' }}>
              {renderTermsAndConditions()}
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
              label="I accept the terms and conditions"
            />
            <Box mt={2} display="flex" justifyContent="center">
              <ReCAPTCHA
                sitekey="YOUR_RECAPTCHA_SITE_KEY"
                onChange={handleRecaptchaChange}
              />
            </Box>
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => {
                  askNewUser ? sendConfirmation(formsData) : submitUser(formsData);
                }}
                disabled={isOkButtonDisabled}
              >
                OK
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={() => {
                  setTermsAccepted(false); 
                  setModalOpen(false);
                  setRecaptchaVerified(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};