import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

/**
 * Custom hook for fetching data from an API
 * @param {string} url - The URL to send the request to
 * @returns {Object} An object containing the fetchData function, loading state, error state, response data, and a loading component
 */
export const USE_CUSTOM_GET_HOOK = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  /**
   * Fetches data from the API
   * @param {Object} params - The query parameters to send with the request
   * @returns {Promise<Object|null>} The response data if successful, null otherwise
   */
  const fetchData = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const startTime = Date.now();
    
    try {
        const result = await axios.get(url, { params });
      
        setResponse(result.data);
        return result.data; // Return the response data
     
      
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
  }, [url]);

  /**
   * React component for displaying a loading spinner
   * @returns {JSX.Element} A circular progress component
   */
  const LoadingComponent = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <CircularProgress />
    </div>
  );

  return { fetchData, loading, error, response, LoadingComponent };
};