import winston from 'winston';
import expressWinston from 'express-winston';

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: 'request.log',
    }),
  ],
  statusLevels: true,
  colorize: true,
  format: winston.format.json(),
});

export const errorLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: 'error.log',
    }),
  ],
  statusLevels: true,
  colorize: true,
  format: winston.format.json(),
});
