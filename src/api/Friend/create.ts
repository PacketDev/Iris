import User from "../../Database/models/User";
import express, { Router } from "express";
import { USER_NOTFOUND } from "../Errors/Errors";
import { API_BASE } from "../../config/config.json";

const app = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post(`${API_BASE}friend/add`, async (req, res) => {
  const { ID, username } = req.body; // test

  const user = await User.findOne({ username, ID });

  const friendRequestData = await User.find({
    fromUser: username,
    toUser: user?._id,
    tagId: ID,
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
