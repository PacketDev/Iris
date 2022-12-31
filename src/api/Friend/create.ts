import User from "../../Database/models/User";
import express, { Router } from "express";
import { USER_NOTFOUND } from "../Errors/Errors";

const app = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/v0/friend/addFriend", async (req, res) => {
  const { username, tagId } = req.body; // test

  const user = await User.findOne({ username, tagId });

  const friendRequestData = await User.find({
    fromUser: username,
    toUser: user?._id,
    tagId,
    status: "ADD",
  });

  // if (user?.username === username && user?.tagId === tagId) {
  //   res.json({ status: false, error: USER_CANNOTADDYOURSELF });
  // } else {
  //   res.json({ status: true, friendRequestData });
  // }

  if (!friendRequestData || !user?.username || !tagId) {
    res.json(Error(USER_NOTFOUND));
  } else {
    res.json({ status: true, friendRequestData });
  }
});

export = app;
