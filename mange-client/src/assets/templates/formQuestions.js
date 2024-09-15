// questions.js
export const formQuestions = [
    {
      section: "Campers Information",
      fields: [
        { name: "submissionDate", label: "Date", type: "date" },
        { name: "firstName", label: "First Name // Nombre", type: "text" },
        { name: "middleName", label: "Middle Name // Segundo nombre", type: "text" },
        { name: "lastName", label: "Last Name // Apellido", type: "text" },
        { 
          name: "sessions", 
          label: "Choose the sessions in which your camper will participate // Elija las sesiones en las que participará su campista", 
          type: "select",
          multiple: true,
          options: [
            { value: "session1", label: "Session 1" },
            { value: "session2", label: "Session 2" },
            { value: "session3", label: "Session 3" }
          ]
        },
        { 
          name: "tShirtSize", 
          label: "What is your camper's t-shirt size? // ¿Cuál es la talla de la camiseta de su campista?", 
          type: "select",
          options: [
            { value: "XS", label: "XS" },
            { value: "S", label: "S" },
            { value: "M", label: "M" },
            { value: "L", label: "L" },
            { value: "XL", label: "XL" }
          ]
        },
        { name: "birthDate", label: "Camper Birth Date // Fecha de nacimiento del campista", type: "date" },
        { 
          name: "gender", 
          label: "Gender // Género", 
          type: "select",
          options: [
            { value: "male", label: "Male // Masculino" },
            { value: "female", label: "Female // Femenino" },
            { value: "other", label: "Other // Otro" }
          ]
        },
      ]
    },
    {
      section: "Medical Information",
      fields: [
        { name: "diagnosisDate", label: "Camper's Date of Diagnosis", type: "date" },
        { name: "allergies", label: "Does your camper have allergies? // ¿Su campista tiene alergias?", type: "textarea" },
        { name: "primaryCarePhysician", label: "Primary Care Physician // Médico de atención primaria", type: "text" },
        { name: "officePhoneNumber", label: "Office Phone Number // Número de teléfono de la oficina", type: "tel" },
        { name: "diabetesPhysician", label: "Physician who manages your child's diabetes // Médico que maneja la diabetes de su hijo", type: "text" },
        { name: "insulinType", label: "Please list your insulin type(s) // por favor liste su tipo(s) de insulina", type: "text" },
      ]
    },
    {
      section: "Emergency Contact",
      fields: [
        { name: "parent1FirstName", label: "Parent/Guardian 1 First Name // Nombre", type: "text" },
        { name: "parent1LastName", label: "Parent/Guardian 1 Last Name // Apellido", type: "text" },
        { name: "parent1Email", label: "Parent/Guardian 1 Email // Correo electrónico", type: "email" },
        { name: "parent1Mobile", label: "Parent/Guardian 1 Mobile Number // Número de celular", type: "tel" },
        { name: "parent2FirstName", label: "Parent/Guardian 2 First Name // Nombre", type: "text" },
        { name: "parent2LastName", label: "Parent/Guardian 2 Last Name // Apellido", type: "text" },
        { name: "parent2Mobile", label: "Parent/Guardian 2 Mobile Number // Número de celular", type: "tel" },
      ]
    },
    {
      section: "Additional Information",
      fields: [
        { 
          name: "specialInstructions", 
          label: "Is there anything special you can tell us about your child? // ¿Hay algo especial que pueda decirnos sobre su hijo?", 
          type: "textarea" 
        },
        { 
          name: "preferredRoommate", 
          label: "Preferred roommate (name and age) // Compañero de cuarto preferido (nombre y edad)", 
          type: "text" 
        },
        { 
          name: "preferredLanguage", 
          label: "Prefered Language // Idioma preferido",
          type: "text"
        },
        { 
          name: "medications", 
          label: "May we give your child the following? // ¿Podemos darle a su hijo lo siguiente?", 
          type: "checkbox",
          options: [
            { value: "tylenol", label: "Tylenol" },
            { value: "ibuprofen", label: "Ibuprofen" },
            { value: "benadryl", label: "Benadryl" },
          ]
        },
      ]
    }
  ];