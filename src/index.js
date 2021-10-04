const express = require('express');

const http = require('http');

const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

const port = process.env.PORT || 8000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// socket
io.on('connection', (socket) => {
  // broadcast message when new user is connected
  socket.broadcast.emit('new user', 'new user is connected');

  // chat message
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(port, () => console.log(`Server started on port ${port}`));
