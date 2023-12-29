const OpenAI = require('openai');
require('dotenv').config();

document.addEventListener('DOMContentLoaded', function() {  
    // Get the form and input element
    const form = document.getElementById('myForm');
    const inputField = document.getElementById('textInput');
    console.log(process.env.OPENAI_API_KEY)
  
    // Add a submit event listener to the form
    form.addEventListener('submit', function(event) {
      // Prevent the default form submission
      event.preventDefault();
  
      // Get the input value
      const inputValue = inputField.value;
  
      // Perform your business logic here
      if (inputValue.trim() == '') {
        alert('Input field cannot be empty');
      }
    });
  });
  