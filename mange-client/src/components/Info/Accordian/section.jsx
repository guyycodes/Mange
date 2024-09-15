/* 
  © 2023 Level up apps and software llc. All rights reserved.
  This file is part of Levelupco.com and is proprietary content. 
  Unauthorized copying or distribution is prohibited.
*/
// Info/WhyUsAccordian/section.jsx
import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";

export const Section = ({ backgroundImage, children, onClick }) => {
  const [flexValue, setFlexValue] = useState(1);

  const handleClick = () => {
    setFlexValue(2); // Set flex to 2 on click
    setTimeout(() => {
      setFlexValue(1); // Revert flex to 1 after 3 seconds
    }, 2000);
    
  };
    return (
    <Box
    onClick={handleClick}
    sx={{ // controls the background transition and placement
      borderRadius: '25px',
      marginX: 1,
      flex: flexValue,
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      overflow: "hidden",
      color: "#ffffff",
      transition: "flex 0.5s ease",
      position: "relative",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      '&:hover': {
        backgroundColor: "rgba(0, 0, 0, 0.95)",
      },
    }}
    >
        <Box
        onClick={onClick}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          fontSize: '2rem',
          transition: "background-color .8s ease",
          '&:hover': {
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            textDecoration: "underline",
          },
          width: "100%",
          height: "100%",
        }}
        >
          {children}
        </Box>
      <Box
       sx={{ // controls the visibility of the background image
          backgroundColor: {xs:"rgba(0, 0, 0, 0.5)",sm:"rgba(0, 0, 0, 0.1)"},
          width: "100%",
          height: "100%",
          position: "absolute",
          transition: "background-color .8s ease",
          '&:hover': {
            backgroundColor: "rgba(0, 0, 0, 0.95)",
          },
        }}
      />
    </Box>
  );
}