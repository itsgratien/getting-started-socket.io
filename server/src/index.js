const express = require('express');

const http = require('http');

const { Server } = require('socket.io');

const cors = require('cors');

const { connectDb } = require('./config/database');

const userModel = require('./model/user');

const app = express();

const server = http.createServer(app);

const io = new Server(server, { cors: { origin: ['http://localhost:3000'] } });

const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const isAuth = async (req, res, next) => {
  if (req.headers['authorization'] && req.headers['authorization'].length > 0) {
    const d = decodeToken(req.headers['authorization']);

    if (d) {
      const f = await userModel.findById(d._id);

      req.user = f;

      next();
    } else {
      return res.status(401).json({ error: 'Unauthorized access' });
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized access' });
  }
};

const isUnAuth = (req, res, next) => {
  if (req.headers['authorization'] && req.headers['authorization'].length > 0) {
    const d = decodeToken(req.headers['authorization']);

    if (d && typeof d === 'object') {
      return res.status(401).json({ error: 'You are authenticated' });
    }
  }
  next();
};
const generateToken = (value) =>
  new Buffer(JSON.stringify(value)).toString('base64');

const decodeToken = (value) =>
  JSON.parse(new Buffer(value, 'base64').toString());

app.post('/', isUnAuth, async (req, res) => {
  try {
    const { username } = req.body;

    const find = await userModel.findOne({ username });

    if (!find) {
      const add = await userModel.create({ username });

      return res.json({
        data: add,
        token: generateToken({ _id: add._id, username: add.username }),
      });
    }

    return res.json({
      data: find,
      token: generateToken({ _id: find._id, username: find.username }),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Authentication failed ${error.message}` });
  }
});

app.get('/me', isAuth, (req, res) => {
  return res.json({ data: req.user });
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
