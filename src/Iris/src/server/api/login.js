const User = require('../Database/models/User');
const bcrypt = require('bcryptjs');
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const Logger = require('../utils/logging/Logger');

const app = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/auth/v1/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  try {
    if (!user) {
      return res.json({
        msg: 'Incorrect username or password.',
        status: false,
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.json({
        msg: 'Incorrect username or password.',
        status: false,
      });
    }

    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    throw Logger.ERROR(err);
  }
});

module.exports = app;
