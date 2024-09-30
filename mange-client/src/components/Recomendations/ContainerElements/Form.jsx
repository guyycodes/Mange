import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
    Snackbar
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';


export const Form = ({ handleSubmit, formStructure, clearResponse, showSaveButton, handleSave }) => {
  const [formData, setFormData] = useState({});
  const [primaryGoal, setPrimaryGoal] = useState('');



  const initializeFormData = () => {
    const initialData = {};
    Object.values(formStructure).flat().forEach(field => {
      if (field.name) {
        initialData[field.name] = field.type === 'multiselect' ? [] : '';
      }
    });
    return initialData;
  };

  useEffect(() => {
    setFormData(initializeFormData());
  }, [formStructure]);

  const handleChange = (e, fieldName, fieldType) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: fieldType === 'multiselect' ? value : value
    }));

    if (fieldName === 'primaryGoal') {
      setPrimaryGoal(value);
      const specificOptions = formStructure["Specific Options"][value] || [];
      const resetSpecificOptions = specificOptions.reduce((acc, field) => {
        if (field.name) {
          acc[field.name] = field.type === 'multiselect' ? [] : '';
        }
        return acc;
      }, {});
      setFormData(prevData => ({
        ...prevData,
        ...resetSpecificOptions
      }));
    }
  };


  const clearForm = () => {
    setFormData(initializeFormData());
    setPrimaryGoal('');
    clearResponse(''); //clear the output from gemini
  };

  const renderField = (field) => {
    if (!field.name) {
      console.warn('Field is missing name property:', field);
      return null;
    }

    switch (field.type) {
      case 'select':
        return (
          <FormControl fullWidth size="small">
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(e, field.name, field.type)}
              label={field.label}
            >
              {field.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'multiselect':
        return (
          <FormControl fullWidth size="small">
            <InputLabel>{field.label}</InputLabel>
            <Select
              multiple
              value={formData[field.name] || []}
              onChange={(e) => handleChange(e, field.name, field.type)}
              input={<OutlinedInput label={field.label} />}
              renderValue={(selected) => selected.join(', ')}
            >
              {field.options.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={(formData[field.name] || []).indexOf(option) > -1} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'textarea':
        return (
          <TextField
            fullWidth
            multiline
            rows={3}
            label={field.label}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(e, field.name, field.type)}
            size="small"
          />
        );
      default:
        return null;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Form data before submission:', formData);
    const cleanedFormData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => key !== 'undefined' && value !== '')
    );
    console.log('Cleaned form data:', cleanedFormData);
    handleSubmit(cleanedFormData);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        {formStructure["Primary Goal"].map((field) => (
          <Grid item xs={12} key={field.name || `unnamed-${Math.random()}`}>
            <Typography variant="subtitle1" gutterBottom>{field.label}</Typography>
            {renderField(field)}
          </Grid>
        ))}
        
        {primaryGoal && formStructure["Specific Options"][primaryGoal]?.map((field) => (
          <Grid item xs={12} key={field.name || `unnamed-${Math.random()}`}>
            <Typography variant="subtitle1" gutterBottom>{field.label}</Typography>
            {renderField(field)}
          </Grid>
        ))}

        {formStructure["Additional Information"].map((field) => (
          <Grid item xs={12} key={field.name || `unnamed-${Math.random()}`}>
            <Typography variant="subtitle1" gutterBottom>{field.label}</Typography>
            {renderField(field)}
          </Grid>
        ))}
      </Grid>
      <Box mt={3} display="flex" justifyContent="space-between">
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          onClick={clearForm}
        >
          Clear Form & Output
        </Button>
        
        {showSaveButton && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ mt: 2 }}
          >
            Save Recommendation
          </Button>
        )}
        <Button type="submit" variant="contained" color="primary">
          Generate Plan
        </Button>
      </Box>
    </form>
  );
};