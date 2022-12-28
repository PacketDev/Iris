const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    discriminator: {
        type: String,
    },
    nickname: {
        type: String,
    },
    bio: {
        type: String,
    },
    bannerURL: {
        type: String,
    },
    avatarURL: {
        type: String,
    },
});

module.exports = mongoose.model("friend", friendSchema);