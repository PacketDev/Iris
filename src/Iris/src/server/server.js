const express = require('express');
const Logger = require('../utils/logging/Logger');

const register = require('./api/register');
const login = require('./api/login');
const discriminator = require('./api/discriminator');
const cors = require('cors');

const app = express();

require('./socket/WebSocket');
require('./Database/database');

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(register);
app.use(login);
app.use(discriminator);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(7070, () => {
  Logger.INFO('Now Listening on Port 7070');
});
