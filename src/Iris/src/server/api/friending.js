const User = require('../Database/models/User');
const express = require('express');
const Logger = require('../../utils/logging/Logger');

const app = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/friend/pending', async (req, res) => {
  try {
    const { userId } = req.body;

    const user = User.findOne(userId, {
      isFriendRequestPending: true,
      isFriendRequestAccepted: false,
      id: userId,
    });

    Logger.INFO(userId);

    return res.json({
      isFriendRequestPending: user.isFriendRequestPending,
      isFriendRequestAccepted: user.isFriendRequestAccepted,
    });
  } catch (err) {
    Logger.ERROR(err);
  }
});

module.exports = app;
