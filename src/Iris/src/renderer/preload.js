const Logger = require("../utils/console/Logger");

window.onload = () => {
    Logger.INFO("Preload Started.");
    require("../core/updater");
}