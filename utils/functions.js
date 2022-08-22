const Logger = require("./Logger");
const IrisLogger = new Logger();

function addArgs(args = []) {
    let arguments = [];

    args.forEach(x => x.add);
    arguments.includes(args);
    return IrisLogger.Debug.DEBUG("Added Arguments.");
};

function removeArgs(args = []) {
    let arguments = [];

    delete args.forEach(x => x.add);
    delete arguments.includes(args);
    return IrisLogger.Debug.DEBUG("Deleted Arguments.");
}

module.exports = {
    addArgs,
    removeArgs
}