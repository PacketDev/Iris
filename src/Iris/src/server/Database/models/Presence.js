const mongoose = require("mongoose");

const presenceSchema = new mongoose.Schema({
    body: String,
    emoji: Boolean,
    clear: Date
});

module.exports = mongoose.model("presence", presenceSchema);