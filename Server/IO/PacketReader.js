const { read } = require("fs");
const stream = require("stream");
const Stream = new stream();

let _ns = Stream;
let ns;

class PacketReader {
    constructor() {
        _ns = ns;
    }

    ReadMessage() {
        // TODO(Skies)
    }
}

module.exports = PacketReader;