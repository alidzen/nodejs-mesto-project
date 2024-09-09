import { Response, Request, NextFunction } from 'express';
import { NotFoundError } from '../errors';

const handleUnhanledRequests = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new NotFoundError('Not Found'));
};

export default handleUnhanledRequests;
