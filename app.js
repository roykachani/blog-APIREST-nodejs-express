const express = require('express');
var logger = require('morgan');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

//definicion de rutas
const blog = require('./routes/index.js');
const auth = require('./routes/auth');
const users = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//rutas
app.use('/api', blog);
app.use('/api', auth);
app.use('/api', users);

module.exports = app;
