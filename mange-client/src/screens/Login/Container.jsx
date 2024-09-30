import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { termsAndConditions } from '../../assets/templates/terms.js';
import { FALLBACK, INVALID_USER, JWT, VALID_USER, VERIFY_LOGIN} from '../../util/actions/actions';
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
export const SignInSection = ({ authFailure, validationSequence }) => { // the checksum is passed all the way down to the form, then passed as formData.key

    const { dispatch } = useRouteContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [createUser, setCreateUser] = useState(false);
    const [formsData, setFormsData] = useState()
    const [newUser, setNewUser] = useState(false)
    const [spinner, setSpinner] = useState()
    const [fadeOut, setFadeOut] = useState(false);
    const [fullScreenSpinner, setFullScreenSpinner] = useState(false);
    
    const [userAuthFailure, setUserAuthFailure] = useState(authFailure);

    const [conflict, setConflict] = useState(false)

      /**
   * Handles routing based on the clicked link.
   *
   * @function
   * @param {string} clickedText - The text of the clicked link
   */
      const setContext = (result, data) => {
        if (result === 'jwt') {
          dispatch({ type: JWT, payload: data });
        } else if (result === 'validUser') {
          dispatch({ type: VALID_USER, payload: 1 });
        }
      };

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
        response: postResponse,
        LoadComponent: LoadingStatusIndicator
    } = USE_CUSTOM_POST_HOOK('http://localhost:8080/api/users/create', 'POST');

    const {
      sendRequest: UseHook_LoginRequest,
      isLoading,
      error: Error,
      response: Response,
      LoadComponent: StatusIndicator
  } = USE_CUSTOM_POST_HOOK('http://localhost:8080/api/users/login', 'POST');

  /**
   * Submits user data to the server for account creation.
   * @param {Object} theFormData - User form data
   * @param {string} theFormData.role - User role (e.g., 'user')
   */
  const submitUser = async (theFormData) =>{
  /// this handles a new user
    try{
      // this is for a user who has recieve the email and comes to verify
      if(termsAccepted){

        setSpinner(true);
        setTimeout(async() => {
        const response = await UseHook_SendRequest(theFormData) //'http://localhost:3000/api/signup/create'
          
        console.log("the form data: ", theFormData)
        console.log("postResponse : ", postResponse)
       

        if(response?.status === 200){
          // if user doesnt exist
          setCreateUser(false); // sets the login form to show closing the create user form
          setNewUser(true)  // set the newUser state. causes the cancel button to hide
          setSpinner(false);
          return
        }
          setCreateUser(false); // sets the login form to show closing the create user form
          setConflict(true);
          setSpinner(false);
          
          // handleRouting('Fallback')
       
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
      setFormsData(dataFromForm);

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

  const handleClick = () => {
    setModalOpen(false);
  };

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
            { // controls which form is displayed
            createUser ? 
            <CreateAccountForm 
              setTermsAccepted={setTermsAccepted} 
              handleAcceptTerms={handleAcceptTerms}
              openModal={setModalOpen} 
              createUser={setCreateUser}  // controls which form we are seeeing, login or create user
            /> : <SignInForm 
                validationSequence={validationSequence} 
                createUser={setCreateUser} 
                UseHook_LoginRequest={UseHook_LoginRequest} // sign in form
                setContext={setContext}/>
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
               {newUser ? "Please Check your email, we've sent you a link to verify your account." 
                  : conflict ? 'Oops! Looks like you already have an account with us.'
                  : 'Terms and Conditions'}
              </Typography>
              {
                (spinner && !newUser) ? <CircularProgress /> : newUser ? null : conflict ? null : 
                  <Typography id="modal-modal-description" sx={{ mt: 2, maxHeight: 300, overflow: 'auto' }}>
                  {renderTermsAndConditions()}
                </Typography>
              }
              {
                spinner ? null : newUser ? null : conflict ? null :
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
                        newUser || conflict ? handleClick() : submitUser(formsData)
                      }}>
                      OK
                    </Button>
                    {/* hide the cancel button after they accept terms */}
                    {!newUser && !conflict ? <Button 
                      variant="outlined" 
                      color="secondary" 
                      onClick={() => {setTermsAccepted(false); setModalOpen(false);}}>
                          Cancel
                    </Button> : null}
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
