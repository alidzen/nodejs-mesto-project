import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { BadRequestError, NotFoundError } from '../errors';

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  if (!name || !link) {
    throw new BadRequestError('Переданы некорректные данные при создании карточки.');
  }
  return Card.create({ owner: _id, name, link })
    .then((user) => res.status(201).send(user))
    .catch(next);
};

export const getCards = (_req: Request, res: Response, next: NextFunction) => Card
  .find({})
  .then((cards) => {
    res.send({ data: cards });
  })
  .catch(next);

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  if (!cardId) {
    throw new BadRequestError('Карточка с указанным id не найдена.');
  }
  return Card
    .deleteOne({ _id: cardId })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  if (!cardId) {
    next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
  }
  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с таким id не найдена');
      }
      res.send({ data: card });
    })
    .catch(next);
};

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  if (!cardId) {
    next(new BadRequestError('Переданы некорректные данные для снятии лайка.'));
  }
  return Card
    .findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      res.send({ data: card });
    }).catch(next);
};
