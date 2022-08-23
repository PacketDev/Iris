const { loadManifest } = require("./utils/functions");
const manifest = require("./settings/manifest.json");

const express = require("express");
const app = express();
const { WebSocketServer } = require("ws");
const Logger = require("./utils/Logger");
const IrisLogger = new Logger();

app.listen(manifest.schema.server.config.port, () => {
    IrisLogger.Debug.DEBUG(`Listening on Port ${manifest.schema.server.config.port}`);
}); 

const ws = new WebSocketServer({
    port: process.env.WS || manifest.schema.server.config.ws
}, IrisLogger.Debug.DEBUG(`Listening on Port ${manifest.schema.server.config.ws}`)); 

ws.on("connection", wSocket => {
    client.on("message", (message) => {
       let a; 
        
        [...ws.clients]
            .filter(c => c !== wSocket)
            .forEach(c => c.send(a ? message.toString() : message));
    });
});

loadManifest(manifest, "manifest");
