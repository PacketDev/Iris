const User = require("../Database/models/User");
const bcrypt = require("bcryptjs");
const express = require("express");
// const jsonwebtoken = require('jsonwebtoken');
const generic = "Incorrect username or password.";
const Logger = require("../utils/logging/Logger");

const app = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/v0/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  try {
    // If no user try email <--- @skies if u try doing this imma make u suffaa!! x_x
    if (!user) {
      // If no avail we throw a generic error
        return res.json({
          msg: generic,
          status: false,
        });
      
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.json({
        msg: generic,
        status: false,
      });
    }

    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    res.sendStatus(400); // Bad request
    Logger.ERROR(err);
  }
});

module.exports = app;
