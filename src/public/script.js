const socket = io();

var form = document.getElementById('form');

var input = document.getElementById('input');

var messages = document.getElementById('messages');

const alertEl = document.querySelector('.append');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
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
