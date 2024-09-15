import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Select,
  Step, StepLabel,
  Stepper,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { formQuestions } from '../../../assets/templates/formQuestions';

export const RegistrationForm = ( {onFormDataChange, closeAccordion} ) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
// console.log('Form Data:', formData);
    onFormDataChange(formData);
  }, [formData]);

  const handleSubmit = () => {
    // Handle form submission logic here
    // console.log('Form data:', formData);
    console.log('closeAccordion called');
    console.log('formData:', formData);
    onFormDataChange(formData);
    closeAccordion();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'date':
        return (
          <TextField
            key={field.name}
            fullWidth
            margin="normal"
            name={field.name}
            // label={field.label}
            helperText={field.label}
            type={field.type}
            InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
            onChange={handleInputChange}
            value={formData[field.name] || ''}
          />
        );
      case 'textarea':
        return (
          <TextField
            key={field.name}
            fullWidth
            margin="normal"
            name={field.name}
            label={field.label}
            multiline
            rows={4}
            onChange={handleInputChange}
            value={formData[field.name] || ''}
          />
        );
      case 'select':
        return (
   <FormControl key={field.name} fullWidth margin="normal">
  <Select
    name={field.name}
    multiple={field.multiple}
    onChange={handleInputChange}
    value={formData[field.name] || (field.multiple ? [] : '')}
  >
    {field.options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </Select>
  {/* Add this line for helper text */}
  <FormHelperText>{field.label}</FormHelperText>
</FormControl>
        );
      case 'checkbox':
        return (
          <Box key={field.name}>
            <Typography variant="subtitle1">{field.label}</Typography>
            {field.options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    name={`${field.name}.${option.value}`}
                    onChange={handleInputChange}
                    checked={formData[`${field.name}.${option.value}`] || false}
                  />
                }
                label={option.label}
              />
            ))}
          </Box>
        );
      default:
        return null;
    }
  };

  const renderStep = (step) => {
    const section = formQuestions[step];
    return (
      <>
        <Typography variant="h6">{section.section}</Typography>
        {section.fields.map((field) => renderField(field))}
      </>
    );
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Register Here
      </Typography>
      <Stepper activeStep={activeStep}>
        {formQuestions.map((section, index) => (
          <Step key={section.section}>
            <StepLabel>{section.section}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 2 }}>
        {renderStep(activeStep)}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={activeStep === formQuestions.length - 1 ? () => handleSubmit() : handleNext}>
            {activeStep === formQuestions.length - 1 ? 'Continue' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};