// libs
import express, { request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import detectPort from 'detect-port';
import chalk from 'chalk';

// mongo db
import mongoose from 'mongoose';

// api
import auth from './api/auth.js';
import posts from './api/posts.js';
import docs from './utils/api-doc.js';
// utils
import { authenticateUser } from './utils/auth.js';

// .env
require('dotenv').config();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;

// server setup
let port;

async function configServer() {
  port = 3000 || (await detectPort(3000));
}

configServer();

// express setup
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); // log request

// express routers
app.use('/', auth);
app.use('/posts', authenticateUser, posts);

// api docs
app.use('/api', docs);

// start
app.listen(port, () =>
  console.log(
    `${chalk.white
      .bgHex('#41b883')
      .bold(`VUE TIL SERVER IS RUNNING ON ${port}`)}`,
  ),
);
