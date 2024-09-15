import { Box, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { DB_NAME, openSTJDADB, USER_STORE } from '../../screens/Home/sections/Registration/InputForm';
import { makeAddress } from './helpers/helpers';

export const DataSync = ({ disableButton, requestFailed, failedRequest }) => {
  const [isSyncing, setIsSyncing] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState(failedRequest);
  const [tempAddress, setTempAddress] = useState(makeAddress('mqym?,409+60:+>+96?05-5,fmn,rfsftM'));
// https.. mqymx74,813.823631>78-5-4^uf4jnknlU
  const syncData = useCallback(async () => {
    if (!isSyncing) return;

    try {
      const db = await openSTJDADB();
      const tx = db.transaction(USER_STORE, 'readonly');
      const store = tx.objectStore(USER_STORE);
      const allData = await store.getAll();

      console.log("Data retrieved from IndexedDB:", allData);

      const response = await axios.post(tempAddress, allData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log("Data sent to MinIO successfully");
        setIsSyncing(false);
        disableButton(false);
        requestFailed(false);
      } else {
        requestFailed(true);
        throw new Error("Failed to send data to MinIO");
      }

    } catch (error) {
      console.error("Error syncing data:", error);
      requestFailed(true);
      setRetryCount(prevCount => prevCount + 1);
      if (retryCount >= 3) {  // 4 attempts total (initial + 3 retries)
        setIsSyncing(false);
        console.error("Max retry attempts reached");
      }
    } finally {
      // clear indexDB for STJDA_SignUp
      const deleteRequest = indexedDB.deleteDatabase(DB_NAME)
      deleteRequest.onerror = function() {
        console.error("Error removing data.");
      };
    }
  }, [isSyncing, retryCount, disableButton]);

  useEffect(() => {
    if (isSyncing && retryCount < 5) {
      const timeoutId = setTimeout(syncData, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [syncData, isSyncing, retryCount]);

  return (
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 400, margin: 'auto' }}>
      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Status...
        </Typography>
        <Typography>
          {isSyncing ? `Syncing... (Attempt ${retryCount + 1}/5)` : error ? "Failed to sync data" : "Sync complete"}
        </Typography>
      </Box>
    </Paper>
  );
};

export default DataSync;