const User = require("../Database/models/User");
const bcrypt = require("bcryptjs");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");

const app = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/auth/v1/login", (req, res) => {
    // go fuck yourself please do
    // User.find({ $or: [{ email: req.body.email }] }).then((user) => {
    //     if (user) {
    //         bcrypt.compare(password, user.password, (err, data) => {
    //             if (err) {
    //                 res.json({ error: err });
    //             }

    //             if (data) {
    //                 let token = jsonwebtoken.sign({
    //                     username: user.email
    //                 }, "skieslol");

    //                 res.json({
    //                     message: "Successfully Logged in.",
    //                     token
    //                 });
    //             } else {
    //                 res.json({ message: "Login or Password is invalid." })
    //             }
    //         });
    //     } else {
    //         res.json({ message: "Failed to Find User." });
    //     }
    // });
});

module.exports = app;