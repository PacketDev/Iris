const uuid = require("uuid").v4;
const IrisLogger = require("../utils/Logger");
const PacketReader = require("./IO/PacketReader");

class Client {
    constructor(client) {
        this.Socket = client;
        this.UUID = uuid();
        this._packet = new PacketReader(this.Socket);

        var opcode = _packet.Read();
        let displayName = this._packet.ReadMessage();

        this.Logger = new IrisLogger();

        this.Logger.Debug.DEBUG(`Client Connected: ${displayName}`);
    }
}

module.exports = Client;