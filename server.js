const express = require("express");
const Logger = require("./utils/logging/Logger");

const register = require("./api/register");
const avatar = require("./api/avatar");
const friending = require("./api/friending");
const login = require("./api/login");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;
const { wss } = require("./socket/WebSocket");
require("./Database/database");

app.use(cors());

app.use(register);
app.use(avatar);
app.use(friending);
app.use(login);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = app.listen(port, () => {
  Logger.INFO(`Now Listening on Port ` + port);
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (websocket) => {
    wss.emit("connection", websocket, request);
  });
});
