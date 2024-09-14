import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';

const { JWT_SECRET = '' } = process.env;

export default (req: Request, _res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded as { _id: string };
    next();
  } catch (_err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
};
