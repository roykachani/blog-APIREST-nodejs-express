const express = require('express');
var logger = require('morgan');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

//definicion de rutas
const blog = require('./routes/index.js');
const auth = require('./routes/auth');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//rutas
app.use('/api', blog);
app.use('/api', auth);

module.exports = app;
