import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import confetti from 'canvas-confetti';
import { CheckCircle, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { FooterSection } from '../../components/FooterSection';
import { Navigation } from '../HeroSubSections/Navigation';
import { TitleTextsButton } from '../HeroSubSections/VideoSection';

import { openDB } from 'idb';
import { Card } from '../../../../components/Card';
import { CampRegistrationAccordion } from '../../components/SignUpForm/index';
import { DataSync } from '../../util/MinIO/ObjectStorage';

import { types } from '../../assets/templates/recomendationType';
import { termsAndConditions } from '../../assets/templates/terms';
import { HOME } from '../../util/actions/actions';
import { useRouteContext } from '../../util/context/routeContext';


export const DB_NAME = 'STJDA_SignUp';
export const USER_STORE = 'userSignUps';

export const openSTJDADB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(USER_STORE)) {
        db.createObjectStore(USER_STORE, { keyPath: '_id', autoIncrement: true });
      }
    },
  });
};

const steps = ['Personal Information', 'Camp Selection', 'Review & Submit'];

export const UserForm = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [selectedCamps, setSelectedCamps] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestFailed, setRequestFailed] = useState(null);
  const [disableCloseModaleButton, setDisableCloseModaleButton] = useState(true);
  const [syncTime, setSyncTime]=useState('')

  // Accessing the context's dispatch function to update global state its essential to use dispatch from the context or it will only update locally
  const { dispatch } = useRouteContext();

  const [allFormData, setAllFormData] = useState({
    selectedCamps: {},
    email: '',
    guardianName: '',
    consent: false,
    registrationFormData: {}
  });

  useEffect(() => {
    console.log('allFormData:', allFormData);
  }, [allFormData]);

  const handleRouting = (clickedText) => {
    // Dispatch actions for each possible navigation item - setting the state in the global context
    // Each dispatch checks if the clicked item matches a specific route, and updates the global state accordingly
    dispatch({ type: HOME, payload: clickedText === 'Home' ? 1 : 0 });
};

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setAllFormData({
      selectedCamps: {},
      email: '',
      guardianName: '',
      consent: false,
      registrationFormData: {}
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const db = await openSTJDADB();
      const tx = db.transaction(USER_STORE, 'readwrite');
      const store = tx.objectStore(USER_STORE);
      
      // Check if there's existing data
      const existingData = await store.getAll();
      if (existingData.length > 0) {
        // If data exists, update the first entry
        await store.put({ ...allFormData, _id: existingData[0]._id });
      } else {
        // If no data exists, add new entry
        await store.add(allFormData);
      }
      await tx.done;

      console.log("Successfully saved data to IndexedDB");
      setSnackbarMessage("Registration saved successfully!");
      setSnackbarOpen(true);

      // Open the modal
      // when the modal opens the data from index DB is sent to the database
      setIsModalOpen(true);

      // Throw confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Wait for 2.75 seconds
      await new Promise(resolve => setTimeout(resolve, 2750));
      setDisableCloseModaleButton(false)
      
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setSnackbarMessage("An error occurred while saving the registration. Please try again.");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Redirect to home page after closing the modal
    handleRouting("Home")
  };

  const handleCampChange = (event) => {
    const { name, checked } = event.target;
    setAllFormData(prevData => ({
      ...prevData,
      selectedCamps: {
        ...prevData.selectedCamps,
        [name]: checked,
      }
    }));
  };

  const getTime =() =>{
    const currentTime = new Date().toLocaleString();
    return currentTime;
  }

  const getSelectedCampNames = () => {
    return Object.entries(allFormData.selectedCamps)
    .filter(([_, isSelected]) => isSelected)
    .map(([campName, _]) => campName);
  };

  const updateAllFormData = (newData) => {
    setAllFormData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  return (
    <>
        <Box sx={{  
          alignItems: "flex-start",
          alignSelf: "stretch",
          display: "flex",
          flex: '0 0 auto',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: "0px 10px",
          position: "relative",
          width: "100%"  
      }}>
      <Navigation />
      <TitleTextsButton />
    </Box>
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Summer Camp Registration
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Learn More About Our Camps
          </Typography>
    <StyledItemsWrapper className="items-wrapper">
      <Card
        className="card"
        hasAmountReached={false}
        hasProgressBar={false}
        photoClassName="photo science-camp"
        property1="ver-1"
        text="Empowerment Through Education at Camp"
        text1="Through interactive, supportive, and fun learning experiences, we help each camper to understand their condition, and achieve their goals."
        textClassName="text-content"
      />
      <Card
        className="card"
        hasAmountReached={false}
        hasProgressBar={false}
        photoClassName="photo nature-camp"
        property1="ver-1"
        text="Be Part of Something Bigger"
        text1="We ensure that no child is left behind because of Join us in this crucial mission—because every child deserves the right to a healthy future."
        textClassName="text-content"
      />

    <Card

        className="card"
        hasAmountReached={false}
        hasProgressBar={false}
        photoClassName="photo residential-camp"
        property1="ver-1"
        text="A Summer Experience Where Every Child Thrives"
        text1="Our mission is focused on breaking down barriers to diabetes management education for children, empowering youth with knowledge is the key."
        textClassName="text-content"
      />
      <Card
        className="card"
        hasAmountReached={false}
        hasProgressBar={false}
        photoClassName="photo robotics-camp"
        property1="ver-1"
        text="Empowering Youth through Education for All"
        text1="By equipping children and their families with essential skills and knowledge, we're not just managing diabetes—we're transforming lives."
        textClassName="text-content"
      />
    </StyledItemsWrapper>
        </Box>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <Box>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Box>
        ) : (
          <Box>
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Please fill out your personal information.
                </Typography>
                <CampRegistrationAccordion onFormDataChange={(data) => setAllFormData(prev => ({ ...prev, registrationFormData: data }))}/>
              </Box>
            )}
            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Select your desired camps:
                </Typography>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Available Camps (Select all that apply)</FormLabel>
                  <FormGroup>
                    {types.map((camp) => (
                      <FormControlLabel
                        key={camp.name}
                        control={
                          <Checkbox
                            checked={allFormData.selectedCamps[camp.name] || false}
                            onChange={handleCampChange}
                            name={camp.name}
                          />
                        }
                        disabled={camp.toggle}
                        label={`${camp.name} ${camp.toggle ? ": full" : ''}`}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Box>
            )}
            {activeStep === 2 && (
              <Box className="p-4">
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Please review your information and submit
                  </Typography>
                  
                  <Accordion >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                        Your Information ({Object.keys(allFormData.registrationFormData).length})
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List sx={{ bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
                        {Object.entries(allFormData.registrationFormData).map(([key, value]) => (
                          <ListItem key={key} divider>
                            <ListItemText 
                              primary={key}
                              secondary={String(value)}
                              primaryTypographyProps={{ fontWeight: 'medium' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                  
                  {selectedCamps.length === 0 && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      Please select at least one camp before proceeding.
                    </Alert>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={allFormData.email}
                    onChange={(e) => setAllFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mb-4"
                  />
                  <TextField
                    fullWidth
                    label="Legal Guardian Name"
                    variant="outlined"
                    value={allFormData.guardianName}
                    onChange={(e) => setAllFormData(prev => ({ ...prev, guardianName: e.target.value }))}
                    className="mb-4"
                  />
                  <Box 
             
                    sx={{
                      height: '200px',
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f1f1f1',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                        borderRadius: '4px',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#555',
                      },
                    }}
                  >
                    {termsAndConditions.map((term, index) => (
                      <Box key={index} className="mb-4">
                        <Typography variant="body2" className="mb-2">
                          {term.english}
                        </Typography>
                        <Typography variant="body2" className="mb-2 italic">
                          {term.spanish}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                      checked={allFormData.consent}
                      onChange={(e) => setAllFormData(prev => ({ ...prev, consent: e.target.checked }))}
                      />
                    }
                    label="I agree to the terms and conditions"
                  />
                </Grid>
              </Grid>
              <Button 
              sx={{ mt: 2}}
                variant="contained" 
                color="primary" 
                className="mt-4"
                disabled={!allFormData.email || !allFormData.guardianName || !allFormData.consent || getSelectedCampNames().length === 0}
                onClick={handleSubmit} // serialize the data and send to MinIO
              >
                Submit
              </Button>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                  {snackbarMessage}
                </MuiAlert>
              </Snackbar>
            </Box>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button 
                onClick={handleNext}
                disabled={(activeStep === 1 || activeStep === steps.length - 1) && getSelectedCampNames().length === 0}
              >
                {/* this is the outer next button */}
                {activeStep === steps.length - 1 ? '' : 'Next'}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
    <FooterSection/>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}>
        {requestFailed !== null && (requestFailed ? (
          <Typography id="modal-title" variant="h5" component="h2" sx={{ mb: 2, display: 'flex', alignItems: 'center', color: 'red' }}>
            <XCircle size={24} style={{ marginRight: '8px' }} />
            Registration Failure
          </Typography>
        ) : (
          <Typography id="modal-title" variant="h5" component="h2" sx={{ mb: 2, display: 'flex', alignItems: 'center', color: 'success.main' }}>
            <CheckCircle size={24} style={{ marginRight: '8px' }} />
            Registration Submitted
          </Typography>
        ))}
        <DataSync disableButton={setDisableCloseModaleButton} requestFailed={setRequestFailed} failedRequest={requestFailed}/>
        <Box sx={{ mt: 2, mb: 3 }}>
          {disableCloseModaleButton ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CircularProgress size={20} sx={{ mr: 2 }} />
              <Typography variant="body1">Syncing data... <CircularProgress/> </Typography>
            </Box>
          ) : requestFailed ? (
            <Typography variant="body1" color="error">
              Registration failed. Please try again.
            </Typography>
          ) : (
            <>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Last successful sync: {getTime()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                STJDA will reach out to you soon to finalize your registration process.
              </Typography>
            </>
          )}
        </Box>
        <Button 
          onClick={handleCloseModal} 
          variant="contained" 
          color="primary" 
          fullWidth
          disabled={disableCloseModaleButton}
        >
          Close
        </Button>
      </Box>
    </Modal>
    </>
  );
};

const StyledItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  .card {
    flex: 1 1 calc(50% - 10px);
    min-width: 300px;
    box-shadow: 0px 4px 4px #00000040;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  .photo {
    background-position: 50% 50%;
    background-size: cover;
    height: 60%;
    width: 100%;
  }

  .science-camp {
    background-image: url(https://c.animaapp.com/I4tqUSkw/img/photo-6@2x.png);
  }

  .nature-camp {
    background-image: url(https://c.animaapp.com/I4tqUSkw/img/photo-7@2x.png);
  }

    .residential-camp {
    background-image: url(https://c.animaapp.com/I4tqUSkw/img/photo-4@2x.png) !important;
  }

  .robotics-camp {
    background-image: url(https://c.animaapp.com/I4tqUSkw/img/photo-5@2x.png) !important;
  }

  .button {
    background-color: var(--blue);
    padding: 8px 24px;
    margin-top: auto;
    align-self: flex-start;
    margin-left: 10px
  }

  @media (max-width:1000px) {
    .card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  @media (max-width: 780px) {
    flex-direction: column;
    .card {
      flex: 1 1 100%;
    }
  }
`;