import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { openStore } from './Container';

export const SavedRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  // IndexedDB setup
  const storeName = 'recommendations';


  useEffect(() => {
    const fetchRecommendations = async () => {
      const db = await openStore();
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const items = await store.getAll();
      setRecommendations(items);
    };

    fetchRecommendations();
  }, []);

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>Saved Recommendation</Typography>
      <List>
        {recommendations.map((rec, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={rec.title}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.primary">
                    {rec.overview}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="text.secondary">
                    Saved on: {new Date(rec.date).toLocaleString()}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};