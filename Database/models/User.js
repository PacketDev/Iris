const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  setAvatarImage: {
    type: Boolean,
    default: false,
  },
  avatarURL: {
    type: String,
    default: '',
  },
  isFriendRequestAccepted: {
    type: Boolean,
    default: false,
  },
  isFriendRequestPending: {
    type: Boolean,
    default: false,
  },
  Status: [
    {
      online: Boolean,
    },
    {
      offline: Boolean,
    },
    {
      idle: Boolean,
    },
    {
      dnd: Boolean,
    },
  ],
});

module.exports = mongoose.model('user', userSchema);
