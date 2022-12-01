const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
    dnd: {
        type: Boolean
    },
    offline: {
        type: Boolean
    },
    online: {
        type: Boolean
    }
});

module.exports = mongoose.model("status", statusSchema);