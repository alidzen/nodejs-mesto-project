import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';

const { JWT_SECRET = '' } = process.env;
const authPrefix = 'Bearer ';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.header;

  if (!authorization || !authorization.startsWith(authPrefix)) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace(authPrefix, '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (_err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload as string;
  next();
};
