import React, { useState } from 'react';
import { Box, Paper, Avatar, Typography, Grid, Card, CardContent } from '@mui/material';
import { Form } from './ContainerElements/DynamicFOrm';
import { formStructure } from '../../assets/templates/formQuestions';
import { SlideOut } from './Popout';
// import { UpgradeModal } from "./Modals";

const RecommendationCard = ({ title, content }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Typography variant="body2">{content}</Typography>
    </CardContent>
  </Card>
);

export const ProfileContainer = () => {
  const [selected, setSelected] = useState(0);
  // const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const [recommendations, setRecommendations] = useState([
    { title: 'Recommendation 1', content: 'Content for recommendation 1' },
    { title: 'Recommendation 2', content: 'Content for recommendation 2' },
    { title: 'Recommendation 3', content: 'Content for recommendation 3' },
  ]);

  const handleTabSelection = (int) => {
    setSelected(int);
  };

  const handleFormSubmit = (formData) => {
    console.log('Form data to send to Gemini:', formData);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SlideOut 
        
        handleTabSelection={handleTabSelection}
        selected={selected}
      />
      <Box sx={{ flexGrow: 1, ml: '225px', height: '100vh', overflowY: 'auto', width: 'calc(100vw - 225px)', transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out' }}>
        <Paper
          sx={{
            height: 250,
            mb: 4,
            backgroundImage: 'url(/default-banner.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'flex-end',
            padding: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(255,255,255,0.7)', padding: 2, borderRadius: 2 }}>
            <Avatar sx={{ width: 80, height: 80, mr: 2 }} src="/default-avatar.jpg" />
            <Typography variant="h4">User Name</Typography>
          </Box>
        </Paper>
        <Box sx={{ px: 2, width: '100%', boxSizing: 'border-box' }}>
          <Grid container spacing={2} sx={{ width: '100%', margin: 0 }}>
            <Grid item xs={12} md={8}>
              <Form formStructure={formStructure} handleSubmit={handleFormSubmit} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom>Recommendations</Typography>
              <Grid container spacing={2}>
                {recommendations.map((rec, index) => (
                  <Grid item xs={12} key={index}>
                    <RecommendationCard title={rec.title} content={rec.content} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <UpgradeModal open={isUpgradeModalOpen} onClose={handleCloseUpgradeModal} /> */}
    </Box>
  );
};