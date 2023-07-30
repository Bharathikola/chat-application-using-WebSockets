const chatDiv = document.getElementById('chat');
const messagesTextarea = document.getElementById('messages');
const messageInput = document.getElementById('message');
let ws;

function showMessage(message) {
  messagesTextarea.value += message + '\n';
}

function sendMessage() {
  const message = messageInput.value;
  if (message.trim() === '') return;
  ws.send(message);
  messageInput.value = '';
}

window.onload = function () {
  ws = new WebSocket('ws://localhost:3000');

  ws.onopen = () => {
    showMessage('Connected to the server.');
  };

  ws.onmessage = (event) => {
    showMessage('Received: ' + event.data);
  };

  ws.onclose = () => {
    showMessage('Disconnected from the server.');
  };
};
