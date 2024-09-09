import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { BadRequestError, NotFoundError } from '../errors';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  if (!name || !about || !avatar) {
    next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
  }
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
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
