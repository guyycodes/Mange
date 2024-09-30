export const formStructure = {
  "Primary Goal": [
    {
      "name": "primaryGoal",
      "label": "Select Your Primary Goal",
      "type": "select",
      "options": ["Health", "Fitness", "Diet", "Weight", "Intelligence", "Focus"],
      "required": true
    }
  ],
  "Specific Options": {
    "Health": [
      {
        "name": "healthOptions",
        "label": "Health Focus Areas",
        "type": "multiselect",
        "options": ["Stress Reduction", "Sleep Improvement", "Preventive Care", "Mental Health"]
      }
    ],
    "Fitness": [
      {
        "name": "fitnessOptions",
        "label": "Fitness Goals",
        "type": "multiselect",
        "options": ["Strength Training", "Cardio Improvement", "Flexibility", "Endurance"]
      }
    ],
    "Diet": [
      {
        "name": "dietOptions",
        "label": "Dietary Preferences",
        "type": "multiselect",
        "options": ["Weight Loss", "Muscle Gain", "Balanced Nutrition", "Specific Diet (e.g., Keto, Vegan)"]
      }
    ],
    "Weight": [
      {
        "name": "weightOptions",
        "label": "Weight Management Goals",
        "type": "multiselect",
        "options": ["Weight Loss", "Weight Gain", "Maintenance", "Body Recomposition"]
      }
    ],
    "Intelligence": [
      {
        "name": "intelligenceOptions",
        "label": "Cognitive Enhancement Areas",
        "type": "multiselect",
        "options": ["Memory Improvement", "Problem-Solving Skills", "Language Learning", "Critical Thinking"]
      }
    ],
    "Focus": [
      {
        "name": "focusOptions",
        "label": "Focus Improvement Techniques",
        "type": "multiselect",
        "options": ["Meditation", "Productivity Techniques", "Distraction Management", "Mindfulness Practices"]
      }
    ]
  },
  "Additional Information": [
    {
      "name": "currentRoutine&Goals",
      "label": "Briefly describe your current routine & any specific goals",
      "type": "textarea"
    },
    {
      "name": "timeCommitment",
      "label": "How much time can you commit daily?",
      "type": "select",
      "options": ["15-30 minutes", "30-60 minutes", "1-2 hours", "2+ hours"]
    }
  ]
};