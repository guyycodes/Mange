export const convertJsonToFormattedString = (jsonData) => {
    let formattedString = '';
  
    formattedString += `Title: ${jsonData.title}\n\n`;
    formattedString += `Overview: ${jsonData.overview}\n\n`;
    formattedString += "7-Day Plan:\n";
  
    jsonData.steps.forEach(step => {
      formattedString += `Day ${step.day}:\n${step.description}\n\n`;
    });
  
    formattedString += `Additional Notes: ${jsonData.additionalNotes}`;
  
    return formattedString;
  };