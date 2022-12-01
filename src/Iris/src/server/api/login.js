const User = require("../Database/models/User");
const bcrypt = require("bcryptjs");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");

const app = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/auth/v1/login", (req, res) => {
    // Redo
});

module.exports = app;