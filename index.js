const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const main = require('./utils/util').main;
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

const chatEntries = [];

app.get('/', (req, res) => {
  res.render('index', { chatEntries });
});
wss.on('connection', (ws) => {
    console.log('WebSocket connection opened');
    ws.on('message', async (message) => {
      try {
          if (!message) {
              throw new Error('User input is required');
          }
          const input = JSON.parse(message);
          chatEntries.push({ type: 'user', message: input });

          let aiResponse = await main(String(message)); // Convert to string
          aiResponse = aiResponse.split('【')[0]; // Remove the 【APPEND】 text
          const aiEntry = { type: 'ai', message: aiResponse };

          chatEntries.push(aiEntry);

          wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({ aiEntry }));
              }
          });
      } catch (error) {
          console.log(error);
          ws.send(JSON.stringify({ error: error.message }));
      }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
