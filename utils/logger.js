const winston = require('winston');

const logger = (winston.createLogger)({
  transports: [new (winston.transports.Console)({ json: true })],
});

logger.level = 'debug';

if (process.env.LEVEL) {
  logger.level = process.env.LEVEL;
}

module.exports = logger;
