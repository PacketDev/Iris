import WebSocket, { WebSocketServer } from 'ws';
import Logger, { ERROR, WARN } from '../utils/Logger';

const wss = new WebSocketServer(
  {
    port: 443,
  },
  () => Logger('WebSocket is running.')
);

wss.on('connection', (connection) => {
  Logger('Client Connected.');

  connection.on('message', (msg) => {
    Logger(`[WebSocket]: ${msg.toString()}`);
  });
});

export { wss };
