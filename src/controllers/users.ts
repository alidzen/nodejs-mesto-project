import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { BadRequestError, NotFoundError } from '../errors';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Не удалось создать пользователя');
      }
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
    .findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};

type params = {
  name?: string;
  about?: string;
}

export const updateProfile = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, about } = req.body;
  const fields: params = {};
  if (name) {
    fields.name = name;
  }

  if (about) {
    fields.about = about;
  }

  return User.findByIdAndUpdate(id, { ...fields }).then((user) => {
    res.send({ data: user });
  }).catch(next);
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { avatar } = req.body;

  if (!avatar) {
    next(new BadRequestError('Пустое или невалидное значение поля avatar'));
  }

  return User.findByIdAndUpdate(id, { avatar }).then((user) => res.send({ data: user }));
};
