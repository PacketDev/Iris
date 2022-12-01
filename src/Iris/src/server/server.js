const express = require("express");
const Logger = require("../utils/logging/Logger");

const app = express();

require("./socket/WebSocket");
require("./Database/database");

app.listen(7070, () => {
    Logger.INFO("Now Listening on Port 7070");
});