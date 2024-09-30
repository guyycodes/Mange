
// DynamicForm.js
import React, { useState } from 'react';
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
    Typography
} from '@mui/material';

export const Form = ({ handleSubmit, formStructure }) => {
  const [formData, setFormData] = useState({});
  const [primaryGoal, setPrimaryGoal] = useState('');

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value
    }));

    if (fieldName === 'primaryGoal') {
      setPrimaryGoal(value);
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <FormControl fullWidth size="small">
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(e, field.name)}
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
              onChange={(e) => handleChange(e, field.name)}
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
            onChange={(e) => handleChange(e, field.name)}
            size="small"
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(formData);
    }}>
      <Grid container spacing={2}>
        {formStructure["Primary Goal"].map((field) => (
          <Grid item xs={12} key={field.name}>
            <Typography variant="subtitle1" gutterBottom>{field.label}</Typography>
            {renderField(field)}
          </Grid>
        ))}
        
        {primaryGoal && formStructure["Specific Options"][primaryGoal].map((field) => (
          <Grid item xs={12} key={field.name}>
            <Typography variant="subtitle1" gutterBottom>{field.label}</Typography>
            {renderField(field)}
          </Grid>
        ))}

        {formStructure["Additional Information"].map((field) => (
          <Grid item xs={12} key={field.name}>
            <Typography variant="subtitle1" gutterBottom>{field.label}</Typography>
            {renderField(field)}
          </Grid>
        ))}
      </Grid>
      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Generate Plan
        </Button>
      </Box>
    </form>
  );
};