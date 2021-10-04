const express = require('express');

const path = require('path');

const http = require('http');

const session = require('express-session');

const { Server } = require('socket.io');

const { connectDb } = require('./config/database');

const userModel = require('./model/user');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(
  session({
    secret: 'happy',
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
  })
);

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

app.get('/', isUnAuth, (req, res) => res.render('index'));

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
  // broadcast message when new user is connected
  socket.broadcast.emit('new user', 'new user is connected');

  // chat message
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(port, async () => {
  await connectDb();

  console.log(`Server started on port ${port}`);
});
