const mongoose = require('mongoose');

const User = require('../model/user');

const dbUri = 'mongodb://localhost:27017/chatsocket';

const createUser = async (obj) => {
  await User.findOneAndUpdate(
    { username: obj.username },
    { $set: { username: obj.username } },
    { upsert: true, new: true }
  );
};

exports.connectDb = async () => {
  try {
    await mongoose.connect(dbUri);

    await createUser({ username: 'jane' });

    await createUser({ username: 'john' });

    return;
  } catch (error) {
    throw error;
  }
};
