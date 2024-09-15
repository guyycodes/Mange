// Info/Why.jsx
import React, { forwardRef } from 'react';
import {Stack, Box } from '@mui/material';

import { ExpandCard } from './Accordian/CardSections'

              
              
export const Why = forwardRef((props, ref) => {


    return(
      <>
        <Stack
          ref={ref}
          display='flex' 
          flexDirection={{ xs: 'column', sm: 'row' }}
          flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
          color='gray'
          alignItems="flex-start"
          >
            <Box   
            sx={{
                width:'100%',
                padding:'0px',
                marginBottom:'10rem',
              }}>
              <ExpandCard/>
            </Box>
        </Stack>
      </>
    )
})