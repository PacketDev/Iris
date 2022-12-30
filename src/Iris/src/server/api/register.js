const User = require('../Database/models/User');
const bcrypt = require('bcryptjs');
const express = require('express');
const Logger = require('../utils/logging/Logger');

const app = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/auth/v1/register', async (req, res) => {
  const { email, username, password: text } = req.body;

  if (!username || typeof username !== 'string') {
    return res.json({
      error: 'Invalid Username, Please enter the valid username.',
      status: false,
    });
  } else if (!text || typeof text !== 'string') {
    return res.json({
      error: 'Invalid Password, Please enter the valid password.',
      status: false,
    });
  } else if (text.length < 5) {
    return res.json({
      error:
        'Password too short. your password shhould be atleast 8 characters',
      status: false,
    });
  }
  const password = await bcrypt.hash(text, 10);

  try {
    const user = await User.create({
      email,
      password,
      username,
    });

    console.log(req.body);

    user.save();
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({ error: 'Username is taken.', status: false });
    }
    throw Logger.ERROR(err);
  }

  res.json({ message: 'successful' });
});
module.exports = app;
