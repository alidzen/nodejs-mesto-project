import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import {
  createCard, getCards, likeCard, dislikeCard, deleteCard,
} from '../controllers/cards';

const router = Router();

router.get('/', getCards);

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
}), dislikeCard);

export default router;
