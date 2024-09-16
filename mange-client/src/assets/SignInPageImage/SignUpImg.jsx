import React from "react";
import { Box } from "@mui/material";

export const SignUpImage = () => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src="https://imgur.com/THMW5S4.png"
        alt="Rectangle"
        sx={{
          height: '100%',
          width: '100%',
          position: 'fixed',
          bottom: 0,
          left: 0,
          objectFit: 'contain',
          objectPosition: 'center',
          top: 0,
          filter: 'brightness(1.1)', // Brighten the image by 10%
        }}
      />
    </Box>
  );
};