import { Avatar, Box, Button, Grid, Input, Paper, Typography } from '@mui/material';
import Pica from 'pica';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formStructure } from '../assets/templates/formQuestions';
import { JWT } from "../util/actions/actions";
import { useRouteContext } from '../util/context/routeContext';
import { SlideOut } from './Popout';
import { FormWithOutput } from './GeminiRecomendations/Container';
import { SavedRecommendations } from './GeminiRecomendations/RecomendationCard';
import { ArticlesView } from './Articles/ArticleFeed';
import { MobileAppView } from './MobileApp/MobileAppView';
import { ContactContainer} from './Contact/ContactFormContainer';

export const ProfileContainer = () => {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const { dispatch } = useRouteContext();
  const routeContext = useRouteContext();
  const [recommendations, setRecommendations] = useState([
    { title: 'Recommendation 1', content: 'Content for recommendation 1' },
    { title: 'Recommendation 2', content: 'Content for recommendation 2' },
    { title: 'Recommendation 3', content: 'Content for recommendation 3' },
  ]);
  const [bannerImage, setBannerImage] = useState('/default-banner.jpg');
  const [hasChanges, setHasChanges] = useState(false);

  const handleTabSelection = (int) => {
    setSelected(int);
    // if tab selected is 3...conditionally render a contact for 
  };

  const renderSelectedView = () => {
    switch (selected) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <FormWithOutput formStructure={formStructure}/>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom>Recommendations</Typography>
              <Grid container spacing={2}>
                {recommendations.map((rec, index) => (
                  <Grid item xs={12} key={index}>
                    <SavedRecommendations/>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        );
      case 1:
        return <ArticlesView />;
      case 2:
        return <MobileAppView />;
      case 3:
        return <ContactContainer />;
      default:
        return null;
    }
  };

// convert banner image into base64 string
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  let MAX_WIDTH;
  let MAX_HEIGHT;
  if (file) {
    const img = new Image();
    img.onload = () => {
      const pica = new Pica();
      const canvas = document.createElement('canvas');
      
      MAX_WIDTH = 200;
      MAX_HEIGHT = 300;
  
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
        const base64 = result.toDataURL('image/jpeg', 0.8); // 0.8 is the quality
        const img = base64
        ? (base64 instanceof File ? URL.createObjectURL(base64) : base64)
        : "/default-profile-picture.jpg";
        setBannerImage(img) // set the image locally
        
        setHasChanges(true)
      })
      .catch(err => {
        console.error('Pica error:', err);
        alert('Error processing image. Please try again.');
      });
    };
    img.src = URL.createObjectURL(file);
  }
};

  const handleOpenModal = () => {
    // Implement the logic to open the edit profile modal
    console.log('Open edit profile modal');
  };

  const handleSave = () => {
    // Implement the logic to save changes
    console.log('Save changes');
    setHasChanges(false);
  };

  const handleLogout = () => {

    
    // logout logic
    try {
      const { jwt } = routeContext;
      if (jwt) {
        dispatch({ type: JWT, payload: '' });
      }
      // Check if the token exists
      const token = localStorage.getItem('gemini_jwt');
      if (token) {
        // If token exists, remove it
        localStorage.removeItem('gemini_jwt');
      } 
    
    navigate('/logout')
    } catch (error) {
      console.error('Error during token deletion or navigation:', error);
      navigate('/');
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, ml: '225px', height: '100vh', overflowY: 'auto', width: 'calc(100vw - 225px)', transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out' }}>
        <Paper
          sx={{
            height: { xs: 200, sm: 250, md: 300 },
            mb: { xs: 4, sm: 6, md: 8 },
            p: { xs: 2, sm: 3, md: 4 },
            backgroundImage: `url(${bannerImage})`,
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: { xs: 2, sm: 0 }, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', p: 2, borderRadius: '10px' }}>
            <Avatar
              sx={{ width: { xs: 80, sm: 120, md: 150 }, height: { xs: 80, sm: 120, md: 150 }, border: '3px solid gray', mr: 3 }}
              src="/default-avatar.jpg"
              alt="User Name"
            />
            <Typography variant="h4" component="h1" sx={{ color: 'white', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
              User Name
            </Typography>
          </Box>
          <label htmlFor="banner-image-upload">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="banner-image-upload"
            />
            <Button variant="contained" color="primary" component="span" sx={{ mt: { xs: 2, sm: 0 } }}>
              Edit Cover Photo
            </Button>
          </label>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, px: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="secondary" onClick={handleOpenModal}>
              Edit Profile
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!hasChanges}
              sx={{ opacity: hasChanges ? 1 : 0.5 }}
            >
              Save
            </Button>
          </Box>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        {/* <Box sx={{ px: 2, width: '100%', boxSizing: 'border-box' }}>
          <Grid container spacing={2} sx={{ width: '100%', margin: 0 }}>
            <Grid item xs={12} md={8}>

              <FormWithOutput formStructure={formStructure}/>

            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom>Recommendations</Typography>
              <Grid container spacing={2}>
                {recommendations.map((rec, index) => (
                  <Grid item xs={12} key={index}>
                    <SavedRecommendations/>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box> */}

      <Box sx={{ px: 2, width: '100%', boxSizing: 'border-box' }}>
          {renderSelectedView()}
      </Box>
      </Box>
      
      <Box sx={{ position: 'fixed', top: 0, left: 0, width: 'auto', height: '100vh', zIndex: 1000 }}>
        <SlideOut handleTabSelection={handleTabSelection} selected={selected}/>
      </Box>
    </>
  );
};