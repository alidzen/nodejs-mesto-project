// middlewares/logger.ts

import winston from 'winston';
import expressWinston from 'express-winston';

// создадим логер запросов
export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: 'request.log',
    }),
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.logger({
  levels: winston.config.npm.levels,
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.json(),
});
