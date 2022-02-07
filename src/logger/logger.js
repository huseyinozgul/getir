const winston = require('winston');
const { env } = require('../config');

const format = winston.format((msg) => {
  if (msg instanceof Error) {
    Object.assign(msg, { message: msg.stack });
  }
  return msg;
});

const logger = winston.createLogger({
  level: env === 'dev' ? 'debug' : 'info',
  format: winston.format.combine(
    format(),
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

module.exports = logger;
