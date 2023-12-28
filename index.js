const { openai } = require('./config.js');
const fs = require('fs');

// Upload a file with an "assistants" purpose
async function uploadfile() {
    console.log("uploading file");
    const file = await openai.files.create({
        file: fs.createReadStream('presonal-info.txt'),
        purpose: "assistants",
      });
      console.log(file)
}

uploadfile();

// // Create Movie Expert Assistant
// async function createAssistant() {
//   const myAssistant = await openai.beta.assistants.create({
//     instructions: "You are great at recommending movies. When asked a question, use the information in the provided file to form a friendly response. If you cannot find the answer in the file, do your best to infer what the answer should be.",
//     name: "Movie Expert",
//     tools: [{ type: "retrieval" }],
//     model: "gpt-3.5-1106-preview",
//   });

//   console.log(myAssistant);
// }