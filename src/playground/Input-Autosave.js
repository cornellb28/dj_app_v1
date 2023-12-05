// Initialize a timer variable to track typing delay
let typingTimer;

// Function to simulate autosave (replace this with your actual autosave logic)
function autosave(inputValue) {
  console.log(`Autosaving: ${inputValue}`);
  // Replace the above line with your code to save the input value
}

// Function to handle input changes
function handleInputChange(event) {
  // Clear the previous timer
  clearTimeout(typingTimer);

  // Get the input value
  const inputValue = event.target.value;

  // Set a new timer for autosave (e.g., 1000 milliseconds or 1 second)
  typingTimer = setTimeout(() => {
    autosave(inputValue); // Call the autosave function
  }, 1000); // Adjust the delay as needed (in milliseconds)
}

// Attach the handleInputChange function to your input element's onChange event
const inputElement = document.getElementById('your-input-element-id');
inputElement.addEventListener('input', handleInputChange);




// React Component Version

import React, { useState, useEffect } from 'react';

const AutosaveInput = () => {
  const [inputValue, setInputValue] = useState('');
  let typingTimer = null;

  // Function to simulate autosave (replace this with your actual autosave logic)
  const autosave = (value) => {
    console.log(`Autosaving: ${value}`);
    // Replace the above line with your code to save the input value
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Clear the previous timer
    clearTimeout(typingTimer);

    // Set a new timer for autosave (e.g., 1000 milliseconds or 1 second)
    typingTimer = setTimeout(() => {
      autosave(value); // Call the autosave function
    }, 1000); // Adjust the delay as needed (in milliseconds)
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type and autosave..."
      />
    </div>
  );
};

export default AutosaveInput;
