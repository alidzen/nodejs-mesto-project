import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/no-extraneous-dependencies
import isEmail from 'validator/lib/isEmail';
import User from '../models/user';
import { BadRequestError, NotFoundError } from '../errors';

const { JWT_SECRET = '' } = process.env;

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(async (user) => {
      if (!user) {
        throw new NotFoundError('Неправильные почта или пароль');
      }

      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        throw new NotFoundError('Неправильные почта или пароль');
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, password, email,
  } = req.body;

  if (!isEmail(email)) {
    next(new BadRequestError('Переданы некорректный email.'));
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, password: hash, email,
      })
        .then((user) => {
          res.status(201).send(user);
        });
    })
    .catch(next);
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
  const { id } = req.params;
  User
    .findOne({ _id: id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      res.send({ data: user });
    })
    .catch(next);
};

export const updateProfile = (req: Request, res: Response, next: NextFunction) => {
  const id = req.user._id;
  const { name, about } = req.body;
  if (!name || !about) {
    next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
  }

  return User.findOneAndUpdate({ _id: id }, { name, about }, { new: true }).then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден.');
    }
    res.send({ data: user });
  }).catch(next);
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const id = req.user._id;
  const { avatar } = req.body;

  if (!avatar) {
    next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
  }

  return User
    .findOneAndUpdate({ _id: id }, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send({ data: user });
    });
};
