import User from '../../Database/models/User';
import express, { Router } from 'express';
import Logger, { ERROR } from '../../utils/Logger';
import Friend from '../../Database/models/Friend';

const app = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*************** ERROR MESSAGES */

const USER_NOTFOUND =
  "Failed to find user, please make sure you didn't make any spelling errors!";

const USER_CANNOTADDYOURSELF = 'You cannot add yourself';

const USER_SENT_REQUEST_PREVIOUSLY =
  'You already sent a friend request to this user!';

/*************** */

app.post('/api/v0/friend/addFriend', async (req, res) => {
  const { username, tagId, id } = req.body;

  const user = await User.findOne({ username, tagId });

  if (!user) {
    res.json({ status: false, message: USER_NOTFOUND });
    throw ERROR(USER_NOTFOUND);
  }

  if (user._id.toString() === id.toString()) {
    res.json({ status: false, message: USER_CANNOTADDYOURSELF });
    ERROR(USER_CANNOTADDYOURSELF);
  }

  const sentRequestPreviously = await Friend.findOne({
    fromUser: id,
    toUser: user._id,
  });

  if (sentRequestPreviously) {
    res.json({ status: false, message: USER_SENT_REQUEST_PREVIOUSLY });
    ERROR(USER_SENT_REQUEST_PREVIOUSLY);
  }

  const sendFriendRequest = await Friend.create({
    from: id,
    toUser: user._id,
  });

  res.status(200).send(sendFriendRequest);
});

export = app;
