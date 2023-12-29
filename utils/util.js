const openai = require('./config').openai;
const fs = require('fs');

const asstID = "asst_6hPzFlVooppqDv534M4vMjMa";
const threadID = "thread_vLzM8eP0s2ULH4BvcbQuR9kw";

// async function createFile() {
// const file = await openai.files.create({
//   file: fs.createReadStream("personal-info.txt"),
//   purpose: "assistants",
// });
// console.log(file);
// }
// createFile()   
// id = file-5pLubyMdEvYkEamolVgnzPYa

// Create Movie Expert Assistant
async function createAssistant() {
  const myAssistant = await openai.beta.assistants.create({
    instructions: "You are my flirtatious presonal assistant. When asked a question, use the information in the provided file to form a friendly and flirtatious response. If you cannot find the answer in the file, do your best to infer what the answer should be.",
    name: "Lucy",
    tools: [{ type: "retrieval" }],
    model: "gpt-3.5-turbo-1106",
    file_ids: ["file-5pLubyMdEvYkEamolVgnzPYa"]
  });

  console.log(myAssistant);
}
// createAssistant()

// ass_id = asst_6hPzFlVooppqDv534M4vMjMa

// Create a thread

// async function createThread() {
// const thread = await openai.beta.threads.create();
// console.log(thread)
// }
// createThread()

// thread_id = thread_vLzM8eP0s2ULH4BvcbQuR9kw

// Create a message for the thread
async function createMessage() {
  const threadMessages = await openai.beta.threads.messages.create(
    threadID,
    { role: "user", content: "When did i have a docter appointment?" }
  );
  console.log(threadMessages);
}

// List thread messages
async function listMessages() {
  const threadMessages = await openai.beta.threads.messages.list(threadID);

  console.log(threadMessages.data[0].content[0].text.value);
}
listMessages()

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
async function getRunStatus() {
const currentRun = await openai.beta.threads.runs.retrieve(
  threadID,
  "run_93rRSRYfcqEihkvqdXLOvRLZ"
);
console.log("Run status: " + currentRun.status);
}
// getRunStatus()