/* 
© 2023 Level up apps and software llc. All rights reserved.
This file is part of Levelupco.com and is proprietary content. 
Unauthorized copying or distribution is prohibited.
*/
// Info/WhyUsAccordian/CardSections.jsx
import { Box, Typography } from "@mui/material";
import React, { useState } from 'react';
import logo from '../../../../public/images/logo.png';
import { sections } from '../../../util/dataObjects/JSONStructures/ExpandCardData';
import { Section } from './section';


export const ExpandCard = () => {

    const [isToggled, setIsToggled] = useState(false);
    const [slideIndex, setSlideIndex] = useState(null);

  
    const textShadowStyle = {
      textShadow: `
        1px 1px 1px rgba(255, 255, 255, 0.1),
        -1px -1px 1px rgba(255, 255, 255, 0.0),
        4px 4px 5px rgba(255, 255, 255, 0.2),
        1px 1px 2px rgba(255, 255, 255, 0.1)
      `
    };
      // Function to handle mouse enter
  const handleMouseEnter = (index) => {
    setIsToggled(true); // Set the toggle state to true when mouse enters
    setSlideIndex(index)
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setIsToggled(false); // Set the toggle state to false when mouse leaves
    setSlideIndex(null);
  };

  const renderText = (text, size) => {
    // Calculate dynamic sizes based on the provided 'size' parameter
    const baseSize = `${size}rem`; // Default size for small screens
    const mdSize = `${size * 1.05}rem`; // Slightly larger on medium screens
    const lgSize = `${size * 1.25}rem`; // Largest size for large screens


    return (
        <Typography
          fontFamily="EB Garamond"
          paddingX={2}
          lineHeight="1.5"
          fontWeight="bold"
          fontSize={{ base: baseSize, md: mdSize, lg: lgSize }} // Dynamic font size based on 'size'
          sx={textShadowStyle}
          color={"var(--black-100-e5e5e5)"}
        >
          {/* Render the text with the dynamic font size and break space */}
          {size ==.95?
            <>
            {text.description}
              <br />
              <br />
              <br />
              <br />
            </>
          :
            <>
            {text.description}
              <br />
              <br />
            </>
          }
          {text.name}
        </Typography>

    );
  }
  
  return (
    <Box 
      sx={{
        width:'100%',
        flexWrap:'wrap',
        // Centers the cards
        boxSizing:"border-box",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        textAlign:'center',
      }}
    >
      <Box 
        sx={{
          // control card size, and direction of opening
          display: 'flex',
          height: '50vh',
          width: {xs: '90%',sm:'70%',}
        }}
      >
        {sections.map((section, index) => {
          return (
            <Section key={section.name} backgroundImage={section.backgroundImage}>
              {index >= 0 && (
              <Box
                  position="absolute"
                  flexDirection="column"
                  top={0}
                  right={0}
                  bottom={0}
                  left={0}
                  display="flex"
                  alignItems="center"
                  zIndex={3}
                  sx={{
                    backgroundColor: `${slideIndex === index ? "rgba(0, 0, 0, 0.95)" : "transparent"}`,
                    objectFit:'contain',
                    transition: 'background-color .8s ease',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    },
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
              <Box
                component="img"
                src={logo}
                alt='Your Logo'
                sx={{
                  width: { xs: '75%', md: '55%' },
                  transform: { xs: 'translateY(1rem)', sm: 'translateY(.1rem)' },
                  zIndex: -1,
                  objectFit: 'contain',
                  borderRadius: '50%',
                  marginBottom:'1rem'
                }}
              />
              {slideIndex === index ? renderText(section, .95) : renderText(section, .8)}
              {/* {renderText(section.description)} */}
              </Box>
              )}
            </Section>
          );
        })}
      </Box>
    </Box>
  );
};