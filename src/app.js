const express = require('express');

const morgan = require('./logger/morgan');
const routes = require('./routes');

const { errorMiddleware } = require('./middlewares');

const app = express();

app.use(morgan.successHandler);

app.use(morgan.errorHandler);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(errorMiddleware);

module.exports = app;
