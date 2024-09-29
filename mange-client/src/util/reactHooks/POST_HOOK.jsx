import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

/**
 * Custom hook for sending data to an API
 * @param {string} url - The URL to send the request to
 * @param {string} [method='POST'] - The HTTP method to use for the request
 * @returns {Object} An object containing the sendRequest function, loading state, error state, response data, and a loading component
 */
export const USE_CUSTOM_POST_HOOK = (url, method = 'POST') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

    /**
   * Sends a request to the API
   * @param {Object} data - The data to send to the API
   * @returns {Promise<Object|null>} The response data if successful, null otherwise
   */
  const sendRequest = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const startTime = Date.now();
    const body = JSON.stringify(data)
    
    try {
      const result = await axios({
        method: method,
        url: url,
        data: data,  // Pass object directly
        headers: { 'Content-Type': 'application/json' }  // Optional: Axios sets it automatically for objects
      });
      if (result.status >= 200 && result.status < 300) {
        setResponse(result);
        return result; // Return the response data
      } else {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
    } catch (err) {
      // Capture the error message from the server response
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      setError(err.response.data.error || err.response.data.message || 'An error occurred');
    } else if (err.request) {
      // The request was made but no response was received
      setError('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      setError(err.message || 'An error occurred');
    }
    } finally {
      const endTime = Date.now();
      const elapsed = endTime - startTime;
      const remainingTime = Math.max(1750 - elapsed, 0);
      
      setTimeout(() => {
        setLoading(false);
      }, remainingTime);
    }
  }, [url, method]);

  /**
   * React component for displaying a loading spinner
   * @returns {JSX.Element} A circular progress component
   */
  const LoadingComponent = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <CircularProgress />
    </div>
  );

  return { sendRequest, loading, error, response, LoadingComponent };
};