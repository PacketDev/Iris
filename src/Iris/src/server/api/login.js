const User = require('../Database/models/User');
const bcrypt = require('bcryptjs');
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');

const app = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/auth/v1/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.json({ error: 'Invalid Email/Password.' });
  }

  if (await bcrypt.compare(password, user.password)) {
    var token = jsonwebtoken.sign(
      {
        id: user._id,
        email: user.email,
        password: user.password,
      },
      'Iris'
    );

    res.status(200);
    res.json({ message: 'Logged in!' });
  } else {
    res.status(203);
    res.json({ error: 'Invalid Email/Password' });
  }

  console.log(token);
});

module.exports = app;
