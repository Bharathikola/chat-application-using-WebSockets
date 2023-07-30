const express = require('express');
const app = express();
const http = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: http });

wss.on('connection', (ws) => {
  console.log('A new client connected');

  ws.on('message', (message) => {
    console.log('Received message:', message);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

http.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});
