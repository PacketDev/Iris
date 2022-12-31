import User from '../../Database/models/User';
import express, { Router } from 'express';
import { ERROR } from '../../utils/Logger';
import Friend from '../../Database/models/Friend';
import { Error, USER_NOTFOUND, USER_CANNOTADDYOURSELF, USER_SENTREQUEST_PREVIOUSLY } from "../Errors/Errors";
const app = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/v0/friend/addFriend', async (req, res) => {
  const { username, tagId, id } = req.body;

  const user = await User.findOne({ username, tagId });

  if (!user) {
    res.status(404).json(Error(USER_NOTFOUND));
    throw ERROR(USER_NOTFOUND);
  }

  if (user._id.toString() === id.toString()) {
    res.status(400).json(Error(USER_CANNOTADDYOURSELF));
    ERROR(USER_CANNOTADDYOURSELF);
  }

  const sentRequestPreviously = await Friend.findOne({
    fromUser: id,
    toUser: user._id,
  });

  if (sentRequestPreviously) {
    res.status(409).json(Error(USER_SENTREQUEST_PREVIOUSLY));
    ERROR(USER_SENTREQUEST_PREVIOUSLY);
  }

  const sendFriendRequest = await Friend.create({
    from: id,
    toUser: user._id,
  });

  res.status(200).send(sendFriendRequest);
});

export = app;
