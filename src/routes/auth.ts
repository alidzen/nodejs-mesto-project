import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import { createUser, login } from '../controllers/users';

const router = Router();

router.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).max(200),
    about: Joi.string().min(2).max(200),
  }),
}), createUser);

router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

export default router;
