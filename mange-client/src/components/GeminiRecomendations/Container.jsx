import { Box, CircularProgress, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { convertJsonToFormattedString } from '../../util/dataObjects/transformData';
import { USE_CUSTOM_POST_HOOK } from '../../util/reactHooks/POST_HOOK';
import { CreateRequest } from './BuildRequest';
import { Form } from './Form';
import { FancyOutputDisplay } from './FancyOutput';
import { openDB } from 'idb';

// IndexedDB setup
const dbName = 'RecommendationsDB';
const storeName = 'recommendations';
const dbVersion = 1;

export const openStore = async () => {
    return openDB(dbName, dbVersion, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: '_id', autoIncrement: true });
        }
      },
    });
  };
  
export const FormWithOutput = ({ formStructure }) => {
  const [output, setOutput] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const {
    sendRequest: UsePostHook_Gemini,
    isLoading,
    error: Error,
    response: Response,
    LoadComponent: StatusIndicator
  } = USE_CUSTOM_POST_HOOK('http://localhost:8080/api/gemini/chat', 'POST');

  // handles the save logic
  const handleSave = async () => {
    try {
      const db = await openStore();
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add({ recommendation: output, date: new Date() });
      
      request.onsuccess = () => {
        setSnackbarMessage('Recommendation saved successfully!');
        setSnackbarOpen(true);
      };
      
      request.onerror = () => {
        setSnackbarMessage('Error saving recommendation. Please try again.');
        setSnackbarOpen(true);
      };
    } catch (error) {
      console.error('Error saving to IndexedDB:', error);
      setSnackbarMessage('Error saving recommendation. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = async (formData) => {
    const geminiRequest = CreateRequest(formData);
    console.log('Request to Gemini:', geminiRequest);

    setLocalLoading(true);
    setOutput(''); 

    try {
      const requestBody = {
        message: geminiRequest
      };

      const result = await UsePostHook_Gemini(requestBody);
      if (result && result.data.response) {
        try {

          const parsedResponse = JSON.parse(result.data.response);
          const formattedString = convertJsonToFormattedString(parsedResponse);
          setOutput(formattedString);

        } catch (parseError) {
          setOutput(JSON.stringify({ error: 'Failed to parse Gemini response' }));
        }
      } else {
        setOutput(JSON.stringify({ error: 'Invalid response from Gemini' }));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setOutput(JSON.stringify({ error: 'Failed to get response from Gemini' }));
    }finally {
      setLocalLoading(false);
    }
  };

  return (
    <Box>
      <Form 
        handleSubmit={handleSubmit} 
        formStructure={formStructure} 
        clearResponse={setOutput} 
        showSaveButton={showSaveButton} 
        output={output} 
        handleSave={handleSave}
        />
      
      {(isLoading || localLoading) ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : Error ? (
        <Box mt={4}>Error: {Error.message || 'An error occurred'}</Box>
      ) : output ? (
        <FancyOutputDisplay output={output} setShowSaveButton={setShowSaveButton} />
      ) : null}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};
