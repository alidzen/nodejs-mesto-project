import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import {
  getUser, getUsers, updateAvatar, updateProfile,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);

router.get('/me', getUser);

router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),

}), updateProfile);

router.patch('/me/avatar', celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatar);

export default router;
