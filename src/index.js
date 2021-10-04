const express = require('express');

const path = require('path');

const http = require('http');

const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.render('index');
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
