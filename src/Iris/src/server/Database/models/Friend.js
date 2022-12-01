const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
    username: String,
    discriminator: String,
    nickname: String,
    bio: String,
    bannerURL: String,
    avatarURL: String
});

module.exports = mongoose.model("friend", friendSchema);