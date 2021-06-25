const express = require('express');
var logger = require('morgan');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const blog = require('./routes/index.js');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//rutas
app.use('/api', blog);

module.exports = app;
