const colors = {
    "White": `\x1b[0m`,
    "Bright": `\x1b[1m`,
    "Green": `\x1b[32m`,
    "Blue": `\x1b[34m`,
    "Yellow": `\x1b[33m`,
    "Red": `\x1b[31m`,
    "Cyan": `\x1b[36m`,
}

function INFO(msg) {
    console.log(`${colors.White}[${colors.Bright}${colors.Blue}INFO${colors.White}]: ${colors.White}${msg}`);
}

function WARN(msg) {
    console.log(`${colors.White}[${colors.Bright}${colors.Yellow}WARN${colors.White}]: ${colors.White}${msg}`);
}

function ERROR(msg) {
    console.log(`${colors.White}[${colors.Bright}${colors.Red}ERROR${colors.White}]: ${colors.White}${msg}`);
}

module.exports = {
    INFO,
    WARN,
    ERROR
}