const morgan = require('morgan');
const logger = require('./logger');

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const successResFormat = `$:method :url :status - :response-time ms`;
const errorResFormat = `$:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
  successHandler,
  errorHandler,
};
