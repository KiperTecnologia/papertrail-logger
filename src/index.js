const winston = require('winston');
require('winston-syslog');


const DEFAULT_OPTIONS = {
  host: 'logs.papertrailapp.com',
  localhost: 'serverless',
};

const formatter = winston.format.printf(({ level, message }) => `[${level.toUpperCase()}]: ${message}`);

module.exports = (options = DEFAULT_OPTIONS) => {
  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.simple(),
      formatter,
    ),
  });

  logger.add(new winston.transports.Syslog({ ...DEFAULT_OPTIONS, ...options }));

  return logger;
};
