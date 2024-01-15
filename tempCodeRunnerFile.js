const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const main = require('./utils/util').main;


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded to req.body object

// Initialize an array to store chat entries
const chatEntries = [];

app.get('/', (req, res) => {
  // Pass the array of chat entries to the template
  res.render('index', { chatEntries });
});

app.post('/', async (req, res) => {
  const userInput = req.body.inputField;

  try {
      var aiResponse = await main(userInput);
      res.json({ aiResponse }); // Send the AI response as JSON
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Sorry, I encountered an error.' });
  }
});



app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
