const socket = io();

const form = document.getElementById('form');

const input = document.getElementById('input');

const messages = document.getElementById('messages');

const alertEl = document.querySelector('.append');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.querySelector('.username');

  if (input.value && username) {
    socket.emit('send-message', { message: input.value, username });
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');

  item.textContent = msg;

  messages.appendChild(item);
});

socket.on('new user', (msg) => {
  const div = document.createElement('div');

  const span = document.createElement('span');

  const body = document.querySelector('body');

  div.setAttribute('class', 'alertMessage');

  span.textContent = msg;

  div.appendChild(span);

  alertEl.appendChild(div);
});

setInterval(() => {
  alertEl.remove();
}, 5000);
