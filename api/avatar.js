const User = require('../Database/models/User');
const express = require('express');
const Logger = require('../utils/logging/Logger');

const app = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/setAvatar/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarURL = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isSet: true,
      avatarURL,
      image: avatarURL,
    });
    return res.json({
      isSet: userData.setAvatarImage,
      image: userData.avatarURL,
    });
  } catch (err) {
    res.sendStatus(400); // Bad request
    Logger.ERROR(err);
  }
});

module.exports = app;
