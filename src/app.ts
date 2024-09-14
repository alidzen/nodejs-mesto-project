import path from 'path';
import express, { Response, Request, NextFunction } from 'express';
import {
  celebrate, errors, Joi, Segments,
} from 'celebrate';
import mongoose from 'mongoose';
import cookerParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { requestLogger, errorLogger } from './middlewares/logger';
import handleUnhanledRequests from './middlewares/not-found';
import { createUser, login } from './controllers/users';
import auth from './middlewares/auth';

dotenv.config();

const { PORT = 3000, DB_URL = '' } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookerParser());
app.use(helmet());

mongoose.connect(DB_URL);

app.use(requestLogger);

app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string(),
    avatar: Joi.string(),
    about: Joi.string(),
  }),
}), createUser);

app.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);
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
