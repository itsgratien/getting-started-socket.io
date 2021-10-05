const express = require('express');

const http = require('http');

const { Server } = require('socket.io');

const { connectDb } = require('./config/database');

const userModel = require('./model/user');

const app = express();

const server = http.createServer(app);

const io = new Server(server, { cors: { origin: ['http://localhost:3000'] } });

const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const isAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  next();
};

const isUnAuth = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/message');
  }
  next();
};

app.post('/', isUnAuth, async (req, res) => {
  try {
    const { username } = req.body;

    const find = await userModel.findOne({ username });

    if (!find) {
      return res.render('index', { error: 'Authentication failed' });
    }

    req.session.user = find;

    return res.redirect('/message');
  } catch (error) {
    return res.render('index', { error: 'Authentication failed' });
  }
});

app.get('/message', isAuth, (req, res) =>
  res.render('message', { user: req.session.user })
);

app.get('/logout', isAuth, (req, res) => {
  req.session.destroy();

  return res.redirect('/');
});

// socket
io.on('connection', (socket) => {
  // chat message
  socket.on('send-message', (values) => {
    console.log('send', values);
  });
});

server.listen(port, async () => {
  await connectDb();

  console.log(`Server started on port ${port}`);
});
