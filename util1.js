const openai = require('./config').openai;
const fs = require('fs');

const asstID = "asst_uBJ2ny48mZGUySzhfZt3oMW8";
const threadID = "thread_ykLYyXjFnuyP1MJ63Ze0W76Y";

async function createFile() {
const file = await openai.files.create({
  file: fs.createReadStream("personal-info.txt"),
  purpose: "assistants",
});
console.log(file);
}
// createFile()   
// id = file-Bg1c4H8velqeQEN1s9D6vZRb

// Create Movie Expert Assistant
async function createAssistant() {
  const myAssistant = await openai.beta.assistants.create({
    instructions: "You serve as my dedicated assistant for crafting tailored cover letters for job applications. When presented with a job description, utilize the details from the provided file—including work experience, skills, portfolio projects, and relevant information—to compose a friendly and well-formatted cover letter. Only incorporate details that align with the job description; refrain from making assumptions if there's a mismatch between my skills/education and the job requirements. If I provide information beyond the job description, respond based on the contents of the files and our conversation history. In instances where the answer isn't explicitly in the file, make an informed inference. Avoid including annotations in your response."
    ,
    name: "Lucy",
    tools: [{ type: "retrieval" }],
    model: "gpt-3.5-turbo-1106",
    file_ids: ["file-Bg1c4H8velqeQEN1s9D6vZRb"]
  });

  console.log(myAssistant);
}
// createAssistant()

// ass_id = asst_uBJ2ny48mZGUySzhfZt3oMW8

// Create a thread

async function createThread() {
const thread = await openai.beta.threads.create();
console.log(thread)
}
createThread()

// thread_id = thread_nrkIOOyG89M9V4ywMxe9MlC7

// Create a message for the thread
async function createMessage() {
  const threadMessages = await openai.beta.threads.messages.create(
    threadID,
    { role: "user", content: "What is my name?" }
  );
  console.log(threadMessages);
}``
// createMessage()

// List thread messages
async function listMessages() {
  const threadMessages = await openai.beta.threads.messages.list(threadID);

  console.log(threadMessages.data[0].content[0].text.value);
}
// listMessages()

// Run the assistant's thread
async function runThread() {
  const run = await openai.beta.threads.runs.create(
    threadID,
    { assistant_id: asstID }
  );
  console.log(run);
}
// runThread()

// to get the status of the run
// async function getRunStatus() {
// const currentRun = await openai.beta.threads.runs.retrieve(
//   threadID,
//   "run_pUEfYHq3df7iiqoNKgrlrbB6"
// );
// console.log("Run status: " + currentRun.status);
// }
// getRunStatus()