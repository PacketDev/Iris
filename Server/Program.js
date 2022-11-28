const IrisLogger = require("../utils/Logger");
const Logger = new IrisLogger();
const app = require("express")();

const manifest = require("../settings/manifest.json");
const Client = require("./Client");
const WebSocket = require("ws");

const Stream = require("stream");

class Program {
    listener() {
        return app;
    }

    Start() {
        let users = new Map(client);

        let _listener = this.listener();
        _listener.listen(manifest.schema.web.config.port);

        var client = new Client(new WebSocket("ws://127.0.0.1:80"));
        users.set(client, 2);

        new Stream();
    }
}


module.exports = Program;