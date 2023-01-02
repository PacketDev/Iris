import { WebSocketServer } from "ws";
import User from "../Database/models/User";
import Logger from "../utils/Logger";
// @ts-ignore
let clients = [];
const wss = new WebSocketServer({
  noServer: true,
});

// For every connection attempt
wss.on("request", function (request) {
  let connection = request.accept(null, request.origin);
  clients.push(connection) - 1;
  // @ts-ignore
  console.log(clients);
});
wss.on("connection", (WebsocketConnection) => {
  Logger.INFO("Client Connected.");
  let LoggedIn = false;

  // For every message
  WebsocketConnection.on("message", async (msg) => {
    // @ts-ignore
    let data;
    try {
      // @ts-ignore
      data = JSON.parse(msg);
    } catch (error) {
      WebsocketConnection.send(JSON.stringify(serverMsg(-1)));
      Logger.WARN("[WEBSOCKET] Spec Violation: Unsupported Format!");
    }
    // Extract Data
    const username: string = data.IAM;
    const auth: string = data.auth;
    const type: Number = data.type;
    const user =
      (await User.findOne({ UID: username })) ||
      (await User.findOne({ email: username }));
    // console.log(data, user); // Debug
    if (!LoggedIn) {
      if (
        auth === undefined ||
        !auth ||
        auth != user?.password ||
        type != 0 ||
        !user
      ) {
        Logger.WARN("Client login failed");
        return WebsocketConnection.send(JSON.stringify(serverMsg(-1)));
      } else if (!LoggedIn) {
        WebsocketConnection.send(JSON.stringify(serverMsg(1)));
        Logger.INFO("Client logged in");
        return (LoggedIn = true);
      } else {
        WebsocketConnection.send(JSON.stringify(serverMsg(-1)));
      }
    }

    switch (type) {
      case 1:
        broadcastToPeer(data, WebsocketConnection);
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        WebsocketConnection.send(JSON.stringify(serverMsg(-1)));
    }
    // console.log(data);
    Logger.INFO("Logged IN: " + LoggedIn);
  });
});

function serverMsg(status: Number) {
  return {
    // @ts-ignore
    type: 0,
    status: status,
  };
}

// @ts-ignore
function broadcastToPeer(data: object, WebsocketConnection) {
  WebsocketConnection.send(JSON.stringify(data));
}

export { wss };
