const mongoose = require("mongoose");

const presenceSchema = new mongoose.Schema({
    body: {
        type: String
    },
    emoji: {
        type: Boolean
    },
    clear: {
        type: Date
    }
});

module.exports = mongoose.model("presence", presenceSchema);