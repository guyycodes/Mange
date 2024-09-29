import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { termsAndConditions } from '../../assets/templates/terms.js';
import { FALLBACK, INVALID_USER, JWT, VALID_USER} from '../../util/actions/actions';
import { useRouteContext } from '../../util/context/routeContext.jsx';
import { isSHA256 } from '../../util/DataIntegrity/index.js';
import { USE_CUSTOM_POST_HOOK } from "../../util/reactHooks/POST_HOOK.jsx";
import { CreateAccountForm, SignInForm } from "./SignIn";


// this component manages the Login functionality and the terms and conditions
const FullScreenSpinner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

/**
 * SignInSection component handles user sign-in and account creation processes.
 * It manages the display of sign-in form, account creation form, and terms & conditions modal.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.checksum] - SHA256 checksum for account verification
 * @returns {React.Component} A component that renders sign-in and account creation forms
 */
export const SignInSection = ({ checksum }) => { // the checksum is passed all the way down to the form, then passed as formData.key

    const { dispatch } = useRouteContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [createUser, setCreateUser] = useState(false);
    const [formsData, setFormsData] = useState()
    const [askNewUser, setAskNewUser] = useState(false)
    const [spinner, setSpinner] = useState()
    const [fadeOut, setFadeOut] = useState(false);
    const [fullScreenSpinner, setFullScreenSpinner] = useState(false);
    const [userValidation, setUserValidation] = useState(false);

    /**
   * Custom hook to send the form data to the server.
   *
   * @param {string} url - The URL to send the request to
   * @param {string} method - The HTTP method to use (e.g., 'POST')
   * @returns {Object} An object containing the sendRequest function and the response, loading, and error data
   */
    const {
        sendRequest: UseHook_SendRequest,
        loading,
        error: formError,
        response,
        LoadComponent: LoadingStatusIndicator
    } = USE_CUSTOM_POST_HOOK('http://localhost:8080/api/users/create', 'POST');


  const handleRouting = (result, data) => {
      dispatch({ type: VALID_USER, payload: result === 'ValidUser' ? 1 : 0 });
      dispatch({ type: VERIFY_LOGIN, payload: result === 'VerifyLogin' ? 1 : 0 });
      dispatch({ type: INVALID_USER, payload: result === 'InvalidUser' ? 1 : 0 });
      dispatch({ type: FALLBACK, payload: result === 'Fallback' ? 1 : 0 });
      dispatch({ type: JWT, payload: result === 'ValidUser' ? data : null });
    };

  /**
   * Submits user data to the server for account creation.
   * @param {Object} theFormData - User form data
   * @param {string} theFormData.role - User role (e.g., 'user')
   */
  const submitUser = async (theFormData) =>{
  /// this handles the submission of a new user
    try{
      // call server and send the data
      if(userValidation){

        setSpinner(true);

        setTimeout(() => {
         // Get the query string which starts with '?' and remove the '?' with slice(1)
          const queryString = window.location.search.slice(1);

          // Create a URLSearchParams object from the query string
          const params = new URLSearchParams(queryString);

          // Get the value of the 'token' parameter
          const token = params.get('token');

          handleRouting('ValidUser', token)
        }, 2000);

      }else if(termsAccepted){

        setSpinner(true);
        setTimeout(async() => {
        const response = await UseHook_SendRequest(theFormData) //'http://localhost:3000/api/signup/create'
          
        console.log("the form data: ", theFormData)
        console.log("response : ", response)
        console.log("response.status : ", response.status)

        const data = await response.text();

        if(response.status == 200){
          
          setCreateUser(false);
          setAskNewUser(true) // if user doesnt exist
          setSpinner(false);
        }else{
          handleRouting('Fallback')
        }
        console.log("new user submitting: ", theFormData)
      }, 2000); 

      }else{
        alert('Oops! 😅 Doesnt look like you accepted the terms: \n To create an account you must accept the terms')
      }
    }catch(err){
      console.log(err)
    }
  }
    /**
     * Handles the acceptance of terms and conditions.
     *
     * @param {Object} dataFromForm - User form data
     */
    const handleAcceptTerms = (dataFromForm) => {
      setFormsData(dataFromForm)
    };

    /**
   * Renders the terms and conditions in both English and Spanish
   * @returns {JSX.Element} A fragment containing the terms and conditions
   */
  const renderTermsAndConditions = () => (
    <>
      {termsAndConditions.map((term, index) => (
        <React.Fragment key={index}>
          <Typography variant="h6" gutterBottom>
            English:
          </Typography>
          <Typography paragraph>
            {term.english}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Español:
          </Typography>
          <Typography paragraph>
            {term.spanish}
          </Typography>
          {index < termsAndConditions.length - 1 && <hr />}
        </React.Fragment>
      ))}
    </>
  );

    return (
        <>
        <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
      }}
    >
          <Box className='form'>
            { // this turnery will the user to accept the terms, or try to login.
            createUser ? 
            <CreateAccountForm 
              setTermsAccepted={setTermsAccepted} 
              handleAcceptTerms={handleAcceptTerms}
              openModal={setModalOpen} 
              createUser={setCreateUser} 
            /> : <SignInForm createUser={setCreateUser} UseHook_SendRequest={UseHook_SendRequest}/> // sign in form
            }
          </Box>

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
                {/* Conditionally render the buttons depending on if theyve been clicked */}
              <Typography id="modal-modal-title" variant="h6" component="h2">
               {askNewUser ? 'We didnt find and account for those credentials.\n Create an account?' : 'Terms & Conditions'}
              </Typography>
              {
                spinner ? <CircularProgress /> :
                  <Typography id="modal-modal-description" sx={{ mt: 2, maxHeight: 300, overflow: 'auto' }}>
                  {renderTermsAndConditions()}
                </Typography>
              }
              {
                spinner ? null :
                <FormControlLabel
                control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
                label="I accept the terms and conditions"
                />
              }
              {
                spinner ? null :
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => {
                        askNewUser ? sendConfirmation(formsData) : submitUser(formsData)
                      }}>
                      OK
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => {setTermsAccepted(false); setModalOpen(false);}}>
                        Cancel
                    </Button>
                </Box>
              }
            </Box>
          </Modal>

          </Box>
  
        {fullScreenSpinner && (
        <FullScreenSpinner>
          <CircularProgress size={60} />
        </FullScreenSpinner>
      )}
      </>

    );
  };
