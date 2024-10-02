import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';
import { USE_CUSTOM_POST_HOOK } from '../../../util/reactHooks/POST_HOOK';
import { buildJwtDto } from '../../../util/DataIntegrity/buildJWT_DTO'
import { validateReset } from '../../../util/validate/validatePassReset';


export const ForgotPasswordModal = ({ open, onClose, setPasswordRecovery, passwordRecovery }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);

  // reset request
  const {
    sendRequest: UseHook_resetRequest,
    requestLoading,
    error: requestError,
    response: requestResponse,
    LoadComponent: requestStatusIndicator
} = USE_CUSTOM_POST_HOOK('http://localhost:8080/api/password/reset-request', 'POST');

// actual reset itself
const {
    sendRequest: UseHook_resetPassword,
    resetLoading,
    error: resetError,
    response: resetResponse,
    LoadComponent: resetStatusIndicator
} = USE_CUSTOM_POST_HOOK('http://localhost:8080/api/password/reset', 'POST');

  useEffect(() => {
    // Reset state when the modal opens
    if (open) {
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
      setMessage('');
    }
  }, [open]);

  // requesting a reset
  const resetRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
    const payload = buildJwtDto(email, newPassword)
      // API call to request a reset link
      const response = await UseHook_resetRequest(payload); 
      console.log('response in modal', response);
      if(response?.status === 200){
        setSuccess(true);
        localStorage.setItem('temp_email', response.data);
        setMessage("Password reset instructions sent, if the email exists.");
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  /// reseting the password/////////////////////////////////////////////////////
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // Validate password using validateReset
    const validationResult = await validateReset(newPassword, formRef.current);
    if (validationResult !== 0) {
        // If validation fails, the error messages will be displayed by validateReset
        return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const em = localStorage.getItem('temp_email')
      // API call to reset password
      const payload = buildJwtDto(em, newPassword)
      const result = await UseHook_resetPassword(payload)
      console.log('result after resting: ', result);
      localStorage.removeItem('temp_email')
      setMessage(result.data);
    if(result.status === 200){
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setPasswordRecovery(false); // Reset to initial state
      }, 1750);
    }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog 
    open={open} 
    onClose={(event, reason) => {
      if (reason !== 'backdropClick') {
        onClose();
      }
    }}
    disableEscapeKeyDown
  >
      <DialogTitle>{passwordRecovery ? 'Reset Password' : 'Forgot Password'}</DialogTitle>
      <DialogContent>
        {!passwordRecovery ? (
          <>
            <Typography variant="body1" gutterBottom>
              Enter your email address and we'll send you a link to reset your password.
            </Typography>
            <form onSubmit={handleResetPassword} ref={formRef}>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </form>
          </>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              Enter your new password.
            </Typography>
            <form onSubmit={handleResetPassword}>
              <TextField
                autoFocus
                margin="dense"
                id="newPassword"
                label="New Password"
                type="password"
                fullWidth
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <TextField
                margin="dense"
                id="confirmPassword"
                label="Confirm New Password"
                type="password"
                fullWidth
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </form>
          </>
        )}
        {message && (
          <Typography color={message.includes('error') ? 'error' : 'primary'} variant="body2" style={{ marginTop: 16 }}>
            {message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{success ? 'Close' : 'Cancel'}</Button>
        <Button 
          onClick={passwordRecovery ? handleResetPassword : resetRequest} 
          disabled={isLoading || success}
        >
          {isLoading ? <CircularProgress size={24} /> : (passwordRecovery ? 'Reset Password' : 'Send Reset Link')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};