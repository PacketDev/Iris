const mongoose = require("mongoose");
const Logger = require("../../utils/logging/Logger");


try {
    mongoose.connect("mongodb://localhost:27017/Iris").then(() => {
        Logger.INFO("Connected to Database!");
    });
} catch (err) {
    Logger.ERROR(err);
}