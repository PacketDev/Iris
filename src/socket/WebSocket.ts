import { WebSocketServer } from "ws";
import Logger from "../utils/Logger";

const wss = new WebSocketServer({
  noServer: true,
});

wss.on("connection", (connection) => {
  Logger.INFO("Client Connected.");

  connection.on("message", (msg) => {
    Logger.INFO(`[WebSocket]: ${msg.toString()}`);
  });
});


export { wss };
