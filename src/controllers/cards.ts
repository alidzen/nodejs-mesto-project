import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { ForbiddenError, NotFoundError } from '../errors';

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { name, link } = req.body;
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

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  try {
    const card = await Card.findById(cardId).exec();
    if (!card) {
      throw new NotFoundError('Карточка с таким id не найдена');
    }
    if (card.owner.toString() !== _id.toString()) {
      throw new ForbiddenError('Доступ запрещен');
    }

    await card.deleteOne({ _id: cardId, owner: _id });

    return res.send({ data: card });
  } catch (err) {
    return next(err);
  }
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
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
