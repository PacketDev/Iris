const manifest = require("./settings/manifest.json");

const { WebSocketServer } = require("ws");

const Program = require("./Server/Program");

const ws = new WebSocketServer({
    port: process.env.WS || manifest.schema.server.config.ws
});

ws.on("connection", wSocket => {
    wSocket.on("message", (message) => {
        let a;

        [...ws.clients]
            .filter(c => c !== wSocket)
            .forEach(c => c.send(a ? message.toString() : message));
    });
});

new Program().Start();