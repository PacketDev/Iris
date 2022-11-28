class IrisLogger {
    color = {
        "White": `\x1b[0m`,
        "Bright": `\x1b[1m`,
        "Green": `\x1b[32m`,
        "Blue": `\x1b[34m`,
        "Yellow": `\x1b[33m`,
        "Red": `\x1b[31m`,
        "Cyan": `\x1b[36m`,
        "Bright": `\x1b[1m`,
    };
    type = {
        "DBG": "DBG:0",
        "ERR": "ERR:1",
        "WRN": "WRN:2"
    };

    Debug = {
        DEBUG: msg => console.log(`${this.color.Cyan}[${this.type.DBG}]`, this.color.Bright, this.color.Yellow, msg)
    }
    WRN = {
        WRN: msg => console.log(`${this.color.Yellow}[${this.type.WRN}]`, this.color.Bright, this.color.Cyan, msg)
    }
    ERR = {
        ERR: msg => console.log(`${this.color.Red}[${this.type.ERR}]`, this.color.Bright, this.color.Yellow, msg)
    }
}

module.exports = IrisLogger;