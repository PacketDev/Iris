const Logger = require("./Logger");
const IrisLogger = new Logger();

function addArgs(args) {
    let arguments = [];

    for (a in args) {
        return a;
    }

    arguments.includes(args);
    IrisLogger.Debug.DEBUG("Added Arguments.");
};

function removeArgs(args) {
    let arguments = [];

     for (a in args) {
        return delete a;
    }

    delete arguments.includes(args);
    IrisLogger.Debug.DEBUG("Deleted Arguments.");
}

// will add fs to this soon.
function reWriteManifest(manifest, id, hash) {
    if (manifest) {
        for (id in manifest) {
            let manifestHashToken = hash;

            if (id in manifestHashToken) {
                return IrisLogger.Debug.DEBUG("Successfully Rewrote Manifest.");
            }
        }
    } else {
        return IrisLogger.ERR.ERR("Failed to Rewrite Manifest.");
    }
}

function Parse(name, type, id, manifest) {
    for (i in name) {
        let manifestName = name;
        if (manifestName) {
            const parse = {
                type,
                id,
                manifest,
                name,
            }

            return parse;
        } else {
            delete [name, manifest, type];
            return IrisLogger.ERR.ERR("Failed to Parse Manifest...");
        }
    } 
}

// will be revamped very nooby code :shy-1:
function loadManifest(manifest, id) {
    let token;

    for (id in manifest) {
        if (id = addArgs(arguments)) {
            let manifestName = "manifest"
            const parseManifest = Parse(manifestName, ".json", id, manifest);

            addArgs(token);
            delete removeArgs(token)
            parseManifest;
            return IrisLogger.Debug.DEBUG("Successfully Loaded Manifest...");
        } 
    }
}

function deleteManifest(manifest, type) {
    delete [manifest, type, loadManifest(delete manifest, delete type), "settings/manifest.json"];
    return;
};

function createManifest() {
    IrisLogger.Debug.DEBUG("Created Manifest.");
    return;
}

module.exports = {
    addArgs,
    removeArgs,
    reWriteManifest,
    Parse,
    loadManifest,
    deleteManifest,
    createManifest
}