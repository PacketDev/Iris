import express from 'express';
import config from './config/config.json';
import Logger from './utils/Logger';
import createDatabase from './Database/DB';
import cors from 'cors';

// endpoints
import register from './api/Authorization/register';
import login from './api/Authorization/login';
import create from './api/Friend/create';
import pending from './api/Friend/pending';

const app = express();

app.use(cors());

app.use(register);
app.use(login);
app.use(create);
app.use(pending);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

createDatabase();

require('./socket/WebSocket');

app.listen(config.port, () => {
  Logger(`Iris:Server running on port [${config.port}]`);
});
