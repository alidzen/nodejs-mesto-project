import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import isEmail from 'validator/lib/isEmail';
import User from '../models/user';
import {
  BadRequestError, ConflictError, NotFoundError, UnauthorizedError,
} from '../errors';

dotenv.config();

const MongooseError = {
  NotUniqObject: 11000,
};

const {
  JWT_SECRET = '', NODE_ENV,
} = process.env;

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User
    .findOne({ email })
    .select('+password')
    .then(async (user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }

      if (!isEmail(email)) {
        throw next(new BadRequestError('Переданы некорректный email.'));
      }

      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

      res.cookie('token', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.send({ message: 'Авторизация прошла успешно', user });
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, password, email,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, password: hash, email,
    })
      .then((user) => {
        res.status(201).send(user);
      }))
    .catch((e) => {
      if (e.code === MongooseError.NotUniqObject) {
        return next(new ConflictError('Пользователь с таким email уже существует.'));
      }
      return next(e);
    });
};

export const getUsers = (_req: Request, res: Response, next: NextFunction) => {
  User
    .find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  return User
    .findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send({ data: user });
    })
    .catch(next);
};

export const updateProfile = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  if (!name || !about) {
    next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
  }

  return User.findOneAndUpdate({ _id }, { name, about }, { new: true }).then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден.');
    }
    res.send({ data: user });
  }).catch(next);
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  return User
    .findOneAndUpdate({ _id }, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send({ data: user });
    }).catch(next);
};
