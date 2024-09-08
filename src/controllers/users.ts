import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs'; // импортируем bcrypt
import User from '../models/user';

export const createUser = (req: Request, res: Response) => {
  // хешируем пароль
  // bcrypt
  //   .hash(req.body.password, 10)
  //   .then((hash) => User.create({
  //     email: req.body.email,
  //     password: hash, // записываем хеш в базу
  //   }))
  //   .then((user) => res.send(user))
  //   .catch((err) => res.status(400).send(err));

  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err));
};

export const getUsers = (_req: Request, res: Response) => {
  User
    .find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      res.status(404).send({ message: err });
    });
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  User
    .findById(id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      res.status(404).send({ message: err });
    });
};
