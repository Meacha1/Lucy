const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const openai = require('./config').openai;
const main = require('./util').main;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize an array to store chat entries
const chatEntries = [];

app.get('/', (req, res) => {
  // Pass the array of chat entries to the template
  res.render('index', { chatEntries });
});

app.post('/', async (req, res) => {
  const userInput = req.body.inputField;

  // Add the user's input to the array
  chatEntries.push({ type: 'user', message: userInput });

  // Replace this with your actual AI logic to get a response
  try {
    var aiResponse = await main(userInput);
  } catch (error) {
    console.log(error);
    aiResponse = "Sorry, I encountered an error.";
  }

  // Add the AI's response to the array
  chatEntries.push({ type: 'ai', message: aiResponse });

  // Render the index.ejs file and pass the updated array to the template
  res.render('index', { chatEntries });
});

const chatMessages = [{
  role: 'system',
  content: `You are an enthusiastic movie expert who loves recommending movies to people. You will be given two pieces of information - some context about movies and a question. Your main job is to formulate a short answer to the question using the provided context. If the answer is not given in the context, find the answer in the conversation history if possible. If you are unsure and cannot find the answer, say, "Sorry, I don't know the answer." Please do not make up the answer. Always speak as if you were chatting to a friend.` 
}];

// Replace this function with your actual AI logic
// async function getAiResponse(userInput) {
//   chatMessages.push({
//     role: 'user',
//     content: userInput
//   });
  
//   const { choices } = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     messages: chatMessages,
//     temperature: 0.65,
//     frequency_penalty: 0.5
//   });
//   chatMessages.push(choices[0].message);
//   return choices[0].message.content;
// }

app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
