const express = require("express");
const User = require("../Database/models/User");
const app = express.Router();
const Logger = require("../../utils/logging/Logger");

app.post("/create/discriminator", (req, res) => {
    const { discriminator } = req.body;

    if (!discriminator || typeof discriminator !== "number") {
        res.json({ message: "Failed to create discriminator." });
    }

    try {

        User.findOne({ "username": req.body.username }, async (err1, Data) => {
            const RandomNumber = Math.floor(Math.random() * (Math.ceil(9999) - Math.ceil(0000)) + Math.ceil(0000));
            Logger.INFO(RandomNumber)
            Logger.INFO(Data)
            if (Data) {
            } else {
                //RandomNumber
                const ratio = await User.collection.countDocuments()
                Logger.INFO(ratio.toString(1));
            }
        })

    } catch (err) {
        Logger.ERROR(err);
    }
});

module.exports = app;