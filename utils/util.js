const openai = require('../config').openai;

const asstID = "asst_uBJ2ny48mZGUySzhfZt3oMW8";
const threadID = "thread_ykLYyXjFnuyP1MJ63Ze0W76Y";

async function main(input) {
  if (!input) {
    throw new Error('User input is required');
  }
  // Create a message
  await createMessage(input);
  
  // Create a run
  const run = await runThread();
  
  // Retrieve the current run
  let currentRun = await retrieveRun(threadID, run.id);
  
  // Keep Run status up to date
  // Poll for updates and check if run status is completed    
  while (currentRun.status !== 'completed') {
    await new Promise(resolve => setTimeout(resolve, 1500));
    currentRun = await retrieveRun(threadID, run.id);
  } 

  // Get messages from the thread
  const { data } = await listMessages();

  // Display the last message for the current run
  return data[0].content[0].text.value;
}

/* -- Assistants API Functions -- */

// Create a message
async function createMessage(question) {
  const threadMessages = await openai.beta.threads.messages.create(
    threadID,
    { role: "user", content: question }
  );
}

// Run the thread / assistant
async function runThread() {
  const run = await openai.beta.threads.runs.create(
    threadID, 
    { 
      assistant_id: asstID,
      instructions: `Please do not provide annotations in your reply. Only reply based on information in the provided file or based on our chat history. If questions are not related to the file provided, respond with "Sorry, I don't know." Keep your answers short.` 
    }
  );
  return run;
}

// List thread Messages
async function listMessages() {
  return await openai.beta.threads.messages.list(threadID);
}

// Get the current run
async function retrieveRun(thread, run) {
  return await openai.beta.threads.runs.retrieve(thread, run);
}

module.exports = { main };