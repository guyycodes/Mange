import React, {useState, useEffect, useRef} from "react";
import { Container, 
  TextField, 
  Button, 
  Typography, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  Checkbox, 
  FormControlLabel, 
  Avatar,
  Box } 
  from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { countryCodes } from '../../../assets/countryCodes';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { validateNewAccount } from "../../../util/validate/validateNewAccount";
import Pica from 'pica';

// Styled components for more control
const Input = styled(TextField)({
  marginTop: 8,
  marginBottom: 8,
});

export const CreateAccountForm = ({ setTermsAccepted, handleAcceptTerms, openModal, createUser }) => {

  const loginFormRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender:'',
    countryCode: '+1 🇺🇸',
    role: 'user',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    notifications: false,
    profileImage: null,
  });
  const [dateOfBirthError, setDateOfBirthError] = useState(false);

  useEffect(() => {
    return () => {
      // Clean up the object URL when the component unmounts
      if (formData.profileImage instanceof File) {
        URL.revokeObjectURL(URL.createObjectURL(formData.profileImage));
      }
    };
  }, [formData.profileImage]);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

// convert image into base64 string
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const img = new Image();
    img.onload = () => {
      const pica = new Pica();
      const canvas = document.createElement('canvas');
      
      // Set maximum dimensions
      const MAX_WIDTH = 300;
      const MAX_HEIGHT = 300;
      
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;

      pica.resize(img, canvas, {
        unsharpAmount: 80,
        unsharpRadius: 0.6,
        unsharpThreshold: 2
      })
      .then(result => {
        // Convert canvas to base64
        const base64 = result.toDataURL('image/jpeg', 0.8); // 0.8 is the quality, adjust as needed
        
        setFormData(prevState => ({
          ...prevState,
          profileImage: base64
        }));
      })
      .catch(err => {
        console.error('Pica error:', err);
        alert('Error processing image. Please try again.');
      });
    };
    img.src = URL.createObjectURL(file);
  }
};

  const handleSubmit = (event) => { // validates inputs
    console.log(formData)
    event.preventDefault();
    if (!formData.dateOfBirth) {
      setDateOfBirthError(true);
      return;
    }
    const loginForm = loginFormRef.current;
    // separate script to validate form data
    validateNewAccount(formData.email, formData.password, formData.confirmPassword, loginForm)
    .then((result) => {
      if (result === 0) { // form validation function returns 0 if there are no errors
        console.log('The result is 0');
        openModal(true)  // the modal is in the parent component & handle the api call after terms accepted
        handleAcceptTerms(formData)
      }
    })
    .catch((error) => {
      console.error('Error during validation', error);
    });
  };

  const pageVariants = {
    initial: { opacity: 0, x: '100%' },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: '-100%' },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <Container component="main" maxWidth="xs">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{
          alignItems: 'flex-start',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px',
          position: 'relative',
          width: 'auto',
          height: 'fit-content',
          border: '1px solid #d9d9d9',
          borderRadius: '8px',
        }}
      >
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        <form>
          <Box display="flex" justifyContent="flex-start" mt={2} mb={2}>
            <Avatar
             src={formData.profileImage 
              ? (formData.profileImage instanceof File
                  ? URL.createObjectURL(formData.profileImage)
                  : formData.profileImage)                     // Base64 or fallback image path
              : "/default-profile-picture.jpg"} /// this is a placeholder for nothing....
              sx={{ width: 56, height: 56, marginRight: 2 }}
            />
            <TextField
            ref={loginFormRef}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none', // Removes the border
                },
                '&:hover fieldset': {
                  border: 'none', // border is removed even on hover
                },
                '&.Mui-focused fieldset': {
                  border: 'none', // border is removed when the TextField is focused
                }}}}
            />
          </Box>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="profile-image-upload"
          />
          <label htmlFor="profile-image-upload">
            <Button variant="contained" component="span" >
              Upload Profile Image
            </Button>
          </label>
          <Box display="flex" justifyContent="space-between">
            <Input
              variant="outlined"
              type="text"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={{ marginRight: '8px' }}
              required='true'
            />
            <Input
              variant="outlined"
              type="text"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required='true'
            />
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            type="date"
            label="Date of Birth"
            name="dateOfBirth"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.dateOfBirth}
            onChange={handleChange}
            error={dateOfBirthError}
            helpertext={dateOfBirthError ? "Date of Birth is required" : ""}
            style={{ marginTop: '8px' }}
          />
          <Input
            fullWidth
            variant="outlined"
            type="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Box display="flex" alignItems="center" mb={1}>
            <FormControl variant="outlined" style={{ marginRight: '8px', width: '120px' }}>
              <InputLabel id="country-code-label">Code</InputLabel>
              <Select
                labelId="country-code-label"
                value={formData.countryCode}
                label="Code"
                onChange={handleChange}
                name="countryCode"
              >
                {countryCodes.map((country) => (
                  <MenuItem onChange={handleChange} key={country.code} value={country.code}>
                    {country.code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              type="tel"
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
            />
          </Box>

          <Input
            fullWidth
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            fullWidth
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox checked={formData.notifications} onChange={handleChange} name="notifications" />}
            label="Receive important notifications?"
          />

          <Box mt={2} mb={2}>
            <Button
              color="secondary"
              type="submit"
              variant="contained"
              onClick={() => createUser(false)}
            >
              Go Back
            </Button>
          </Box>

          <Button 
          onClick={(e) =>{
            const node = document.querySelector(".messages")
            handleSubmit(e)
          }} 
           type="submit" fullWidth variant="contained" color="primary" endIcon={<ChevronRightIcon />}>
            Create Account
          </Button>
        </form>
      </motion.div>
    </Container>
  );
}
