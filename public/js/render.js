const socket = new WebSocket('ws://localhost:3000');
const chatEntries = document.querySelector('.chat-container');

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);

  if (data.userEntry) {
    appendMessage('user', data.userEntry.message);
  }

  if (data.aiEntry) {
    // Replace the "Loading..." message with the actual AI response
    const loadingMessage = document.querySelector('.ai-loading-message');
    if (loadingMessage) {
      loadingMessage.innerText = data.aiEntry.message;
      loadingMessage.classList.remove('ai-loading-message');
    } else {
      appendMessage('ai', data.aiEntry.message);
    }

    // Scroll to the bottom after appending a new message
    chatEntries.scrollTop = chatEntries.scrollHeight;
  }
});

document.getElementById('myForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const userInput = document.getElementById('textInput');
  const message = userInput.value.trim();

  if (!message) {
    console.error('No input provided');
    return;
  }

  appendMessage('user', message);
  appendLoadingMessage('ai');

  // Send user input to the server using WebSocket
  socket.send(JSON.stringify({ inputField: message }));

  userInput.value = ''; // Clear the input field after sending
});

function appendMessage(type, message) {
  const messageContainer = document.createElement('div');
  messageContainer.className = `${type}-message-container`;

  const messageText = document.createElement('div');
  messageText.className = `message ${type}-message`;
  messageText.innerText = message;

  const messageIcon = document.createElement('img');
  messageIcon.src = `./images/${type}.png`;
  messageIcon.className = `${type}-icon`;

  messageContainer.appendChild(messageText);
  messageContainer.appendChild(messageIcon);

  chatEntries.appendChild(messageContainer);
}

function appendLoadingMessage(type) {
  const loadingContainer = document.createElement('div');
  loadingContainer.className = `${type}-message-container`;

  const loadingText = document.createElement('div');
  loadingText.className = `message ${type}-message ai-loading-message`;
  loadingText.innerText = 'Loading...';

  const loadingIcon = document.createElement('img');
  loadingIcon.src = `./images/${type}.png`;
  loadingIcon.className = `${type}-icon`;

  loadingContainer.appendChild(loadingIcon);
  loadingContainer.appendChild(loadingText);

  chatEntries.appendChild(loadingContainer);
  // Scroll to the bottom after appending a new message
  chatEntries.scrollTop = chatEntries.scrollHeight;
}
