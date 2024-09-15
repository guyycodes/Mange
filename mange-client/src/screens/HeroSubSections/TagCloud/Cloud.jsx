/* 
  © 2023 Level up apps and software llc. All rights reserved.
  This file is part of Levelupco.com and is proprietary content. 
  Unauthorized copying or distribution is prohibited.
*/
import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { TagsCloud, tagsForTheCloud } from '../../../util/dataObjects/tagCloud/TagCloudCLasses';

export const Cloud = () => {
  const cloudRef = useRef(null);


  useEffect(() => {
    // Make sure the ref is correctly pointing to the element before initiating the tags cloud
    if (cloudRef.current) {
      const cloud = new TagsCloud(cloudRef.current);
      cloud.start();
      return () => cloud.stop();// Cleanup function to stop the animation when the component unmounts
    }
  }, []);

  return (
    <Stack 
      sx={{ 
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: 'none', 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: { xs:'-20vh',sm:'-9vh' },
        zIndex: 1
      }}
    >
      <Box 
        ref={cloudRef} 
        sx={{
          position: 'absolute',
          left: {xs:'45%',sm: '55%'},
          top: {xs: '40%', sm: '50%', md: '70%'},
          transform: 'translate(-50%, -50%)',
          width: { xs: '45vmin', sm: '50vmin' },
          height: { xs: '43vmin', sm: '60vmin' },
        }}
        className="tags-cloud"
      >
        {tagsForTheCloud.map((tag, index) => (
          <Box key={index} sx={{ position: 'absolute' }} className="tag">
            <Typography sx={{ color: 'var(--gold)', fontSize: {xs: '5vmin',sm:'4vmin'} }}>
              {tag}
            </Typography>
          </Box>
        ))}
      </Box>
    </Stack>
  );
};