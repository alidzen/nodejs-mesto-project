import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { BadRequestError, NotFoundError } from '../errors';

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { id, name } = req.params;
  Card.create({ id, name })
    .then((user) => res.send(user))
    .catch(next);
};

export const getCards = (_req: Request, res: Response, next: NextFunction) => {
  Card
    .find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card
    .deleteOne({ _id: cardId })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  if (!cardId) {
    next(new BadRequestError('Отсутствует параметр cardId'));
  }
  Card.findByIdAndUpdate(
    cardId,
    // @ts-ignore
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
    next(new BadRequestError('Отсутствует параметр cardId'));
  }
  Card
    .findByIdAndUpdate(
      cardId,
      // @ts-ignore
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Невозможно удалить. Карточка с таким id не найдена');
      }
      res.send({ data: card });
    }).catch(next);
};
