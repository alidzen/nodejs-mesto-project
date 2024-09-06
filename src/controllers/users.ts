// controllers/users.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'; // импортируем bcrypt
import User from '../models/user';

const createUser = (req: Request, res: Response) => {
  // хешируем пароль
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err));
};

export default createUser;
