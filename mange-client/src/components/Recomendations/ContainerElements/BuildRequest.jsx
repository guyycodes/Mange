/* 
  © 2023 Level up apps and software llc. All rights reserved.
  This file is part of Levelupco.com and is proprietary content. 
  Unauthorized copying or distribution is prohibited.
*/
import React from 'react';

export const recommendationTemplate = `
{
  "title": "",
  "overview": "",
  "steps": [
    {
      "day": 1,
      "description": ""
    },
    {
      "day": 2,
      "description": ""
    },
    {
      "day": 3,
      "description": ""
    },
        {
      "day": 4,
      "description": ""
    },
    {
      "day": 5,
      "description": ""
    },
    {
      "day": 6,
      "description": ""
    },
    {
      "day": 7,
      "description": ""
    }
  ],
  "additionalNotes": ""
}
`;

export const CreateRequest = (formData) => {
    const userInput = Object.entries(formData)
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
      .join('\n');
  
    const request = `
  Based on the following user input, generate a recommendation plan by filling out the provided JSON template. Do not deviate from the template structure or add any additional fields, only respond according to the template format.
  
  User Input:
  ${userInput}
  
  Instructions:
  1. Use the primary goal as the basis for the title.
  2. Provide an detailed plan based on the input, giving the user clear actionable steps.
  3. Fill out exactly seven days in the "days" array, each with a clear and insightful descriptions.
  4. Include any relevant additional notes or considerations in the "additionalNotes" field.
  
  Respond ONLY with the completed JSON template, without any additional text before or after. Ensure the response is always valid JSON.
  
  Template to complete:
  ${recommendationTemplate}
  `;

  return request;
};