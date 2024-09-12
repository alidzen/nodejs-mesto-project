import path from 'path';
import express, { Response, Request, NextFunction } from 'express';
import { errors } from 'celebrate';
import mongoose from 'mongoose';
import cookerParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { requestLogger, errorLogger } from './middlewares/logger';
import handleUnhanledRequests from './middlewares/not-found';

dotenv.config();

const { PORT = 3000, DB_URL = '' } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookerParser());
app.use(helmet());

mongoose.connect(DB_URL);

app.use(requestLogger);
app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '66dd5e34acdb9b0d445f85b9',
  };

  next();
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.use(handleUnhanledRequests);

app.use(errorLogger);
app.use(errors());

app.use(
  (
    err: Error & { statusCode: number },
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
  },
);

app.listen(PORT, () => {
  console.log(`Listen: ${PORT}`);
});
