import React, { forwardRef, useState, useEffect } from 'react';
import { About } from "./About"
import { Stack, Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

const swirl = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(5px, 5px) rotate(90deg); }
  50% { transform: translate(0, 10px) rotate(180deg); }
  75% { transform: translate(-5px, 5px) rotate(270deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
`;

export const LearnMore = forwardRef((props, ref) => {
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        setShowAnimation(true);
    }, []);

    return (
        <Stack
            direction="column"
            alignItems="flex-start"
            spacing={4}
            sx={{
                width: {
                    xs: '100%',
                    sm: '600px'
                }
            }}
        >
            <Box sx={{
                p: 2,
                boxShadow: 3,
                width: '100%',
                bgcolor: 'black',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Box
                    sx={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        bgcolor: 'gold',
                        mr: 2,
                        animation: showAnimation ? `${swirl} 4s linear infinite` : 'none',
                    }}
                />
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="grey.200"
                >
                    Empower your journey to optimal health with AI-driven insights and personalized wellness strategies, tailored just for you.
                </Typography>
            </Box>
            <Box 
                ref={ref} 
                sx={{
                    width: {
                        xs: '100%',
                        md: '30vw'
                    }
                }}
            >
                <About />
            </Box>
        </Stack>
    )
});