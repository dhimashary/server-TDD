const express = require('express');

const app = express();

const routes = require('./routes/');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes);

app.use(errorHandler);

module.exports = app;
