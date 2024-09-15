import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';
import { tagsForTheCloud } from '../../../util/dataObjects/tagCloud/TagCloudCLasses';
import { getDescriptionForHeader } from './LerMoreFilter';

export const AccordionComponent = () => {
  const theme = useTheme();
  const bgColor = theme.palette.mode === 'light' ? 'black' : theme.palette.grey[800];
  const textColor = theme.palette.mode === 'light' ? 'white' : theme.palette.grey[100];

  return (
    <div>
      {tagsForTheCloud.map((header, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: textColor }} />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              backgroundColor: bgColor,
              color: textColor,
              '&.Mui-expanded': {
                backgroundColor: theme.palette.grey[600],
              },
            }}
          >
            <Typography>{header}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: 'white', color: 'black' }}>
            <Typography>
              {getDescriptionForHeader(header)}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};