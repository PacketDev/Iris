const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
    dnd: Boolean,
    offline: Boolean,
    online: Boolean
});

module.exports = mongoose.model("status", statusSchema);