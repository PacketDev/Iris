const WebSocketServer = require("ws").Server;
const Logger = require("../utils/logging/Logger");

const wss = new WebSocketServer(
  {
    noServer: true,
  },
  () => Logger.INFO("WebSocket is Listening on port 443")
);

wss.on("connection", (connection) => {
  Logger.INFO("Client Connected.");
  connection.on("message", (message) => {
    Logger.INFO(`[WS-CLIENT]: ${message.toString()}`)
  });
});

module.exports = { wss };
