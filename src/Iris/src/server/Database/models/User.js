const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    discriminator: String,
    nickname: String,
    bio: String,
    bannerURL: String,
    avatarURL: String
});

module.exports = mongoose.model("user", userSchema);