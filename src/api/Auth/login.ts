import express, { Router } from 'express';
import User from '../../Database/models/User';
import Logger from '../../utils/Logger';
import bcrypt from 'bcryptjs';
import { Error, ERR_BADAUTH } from '../Errors/Errors';

const app = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/v0/auth/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }) || await User.findOne({email: username.toLowerCase()});

  try {
    if (!user) {
      return res.status(403).json(Error(ERR_BADAUTH));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(403).json(Error(ERR_BADAUTH));
    }

    // @ts-ignore
    delete user.password;
    return res.json({ status: true, loggedIn: true, id: user.UID, token: user.password });
  } catch (err) {
    res.sendStatus(400); // Bad request
    Logger.ERROR(err);
  }
});

export = app;
